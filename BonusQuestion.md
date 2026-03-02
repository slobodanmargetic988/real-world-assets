🏆 Bonus Question (Senior Signal)

            How would you improve this system to support 10,000+ properties?

For `10,000+` properties, I’d evolve this in stages:

1. Move filtering/sorting to the backend
- Send query params (`q`, `minPrice`, `maxPrice`, `page`, `sort`) to API.
- Return paginated results + total count.
- Add DB indexes (`title` text/trigram, `price` btree, compound indexes for common filters).

2. Add list virtualization on frontend
- Render only visible rows/cards (windowing) instead of all items.
- Keep smooth scrolling and stable FPS even with very large result sets.

3. Debounce and cancel requests
- Debounce input (e.g. 200–300ms).
- Cancel in-flight requests when user types again to avoid stale responses and wasted work.

4. Cache query results
- Client cache keyed by filter params (memory + SWR strategy).
- Optional server/cache layer (Redis) for popular filter combinations.

5. Reduce payload size
- Return only card fields needed for listing (id, title, thumbnail, price, short meta).
- Use responsive images and lazy loading.

6. Optimize UX flow
- Add explicit sort options and server-driven facets/counts.
- Keep filter state in URL for shareability/back-forward behavior.
- Show loading skeletons and preserve previous results while fetching.

7. Scale architecture
- Cursor-based pagination for better large-dataset performance.
- Precompute searchable fields / denormalized listing view if needed.
- Add observability (P95 query latency, cache hit rate, dropped request ratio).

Net effect: the current client-side filter is great for small datasets; at 10k+, the winning pattern is server-side query + paginated API + virtualized rendering + caching.
