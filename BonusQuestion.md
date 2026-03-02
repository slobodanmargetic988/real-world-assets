🏆 Bonus Question (Senior Signal)

            How would you improve this system to support 10,000+ properties?

For `10,000+` properties, I would move from a purely client-side model to a **server-driven search architecture** with explicit performance goals, phased rollout, and observability.

## 1) Define Performance Targets First
- Search/filter API p95 latency: `< 250ms` under expected peak load.
- First filtered render on client: `< 1s` on mid-range devices.
- UI responsiveness while typing: no dropped frames; input remains smooth.
- Error rate budget for search endpoints: `< 0.5%`.

## 2) Move Querying to Backend (Source of Truth)
- API contract:
  - `GET /api/properties?q=&minPrice=&maxPrice=&sort=&cursor=&limit=`
  - Response: `{ items, nextCursor, totalApprox, facets }`
- Keep client-side filtering only as a small-data fallback, not primary path.
- Enforce server-side validation and bounds:
  - `limit` max (e.g. 50)
  - numeric ranges sanitized
  - safe defaults for sort and pagination

## 3) Data Layer and Index Strategy
- Use keyset/cursor pagination instead of offset for large datasets.
- Add targeted indexes:
  - B-tree on `price`
  - Compound indexes for common predicates (for example `status + price`)
  - Trigram/full-text index on normalized title (`lower(title)`)
- Monitor query plans regularly to prevent index drift as data grows.

## 4) Frontend Changes for Scale
- Debounce filter input (`200-300ms`) and cancel stale requests (`AbortController`).
- Keep filter state in URL so navigation/share/back-forward is deterministic.
- Render with list/grid virtualization so DOM size is bounded.
- Use skeletons and "keep previous data while fetching" to avoid visual jitter.

## 5) Caching and Freshness
- Cache hot query combinations in Redis using normalized query keys.
- Use short TTL + stale-while-revalidate behavior.
- Invalidate cache on property updates via event-driven hooks.
- Return `ETag`/`Last-Modified` where useful for client/proxy cache efficiency.

## 6) Reliability and Observability
- Instrument:
  - API p50/p95/p99 latency
  - cache hit ratio
  - DB query duration and rows scanned
  - request cancellation rate
  - frontend interaction timings
- Add alerts on p95 regression, error-rate spikes, and cache miss surges.
- Include trace IDs from client to backend for incident debugging.

## 7) Rollout Plan 
- Phase 1: ship new API behind feature flag; keep old behavior as fallback.
- Phase 2: enable for internal users and 10-20% traffic; compare SLOs.
- Phase 3: ramp to 100% after stability window and performance sign-off.
- Rollback: one-click flag disable to restore previous flow if regressions appear.

## 8) Tradeoffs I’d Explicitly Call Out
- Cursor pagination improves performance but removes direct "jump to page N".
- Aggressive caching improves latency but increases staleness risk.
- Rich text search improves relevance but increases operational complexity.

**Bottom line:** for 10k+ properties, the professional path is server-side filtering + cursor pagination + indexed search + virtualized rendering + measurable SLOs + safe phased rollout.
