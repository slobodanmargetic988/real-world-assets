import { useMemo, useState } from "react";
// Import bootstrap react components
import { Button, Card, Container } from "react-bootstrap";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import CountDown from "../components/functions/CountDown";
// import framer motion
import { motion } from "framer-motion";
import AnimationTitles from "../components/functions/AnimationTitles";

const BASE_PROPERTIES = [
  {
    title: "Cottage «Forrest 1»",
    agency: "@Red Oak Realty",
    priceEth: 29.71,
    countdown: { h: 9, m: 45, s: 8 },
    imageSrc: require("../images/properties/picture-of-a-wooden-building-in-the-forest.webp"),
    likedDefault: false,
  },
  {
    title: "Freshness",
    agency: "@ERA Ukraine Real Estate",
    priceEth: 14.81,
    countdown: { h: 29, m: 15, s: 10 },
    imageSrc: require("../images/properties/pexels-stan-krotov-12737424 1.webp"),
    likedDefault: true,
  },
  {
    title: "Wish house",
    agency: "@UA real estate agency",
    priceEth: 16.62,
    countdown: { h: 23, m: 6, s: 1 },
    imageSrc: require("../images/properties/pexels-rachel-claire-8112843 1.webp"),
    likedDefault: false,
  },
  {
    title: "Spruce",
    agency: "@Dream House",
    priceEth: 17.01,
    countdown: { h: 10, m: 30, s: 58 },
    imageSrc: require("../images/properties/david-kovalenko-9-qFzV9a2Zc-unsplash.webp"),
    likedDefault: false,
  },
  {
    title: "Residence Rybna",
    agency: "@UA real estate agency",
    priceEth: 29.71,
    countdown: { h: 18, m: 21, s: 8 },
    imageSrc: require("../images/properties/house_big-1.webp"),
    likedDefault: false,
  },
  {
    title: "Blue Sky",
    agency: "@ERA Ukraine Real Estate",
    priceEth: 17.31,
    countdown: { h: 23, m: 16, s: 11 },
    imageSrc: require("../images/properties/house_big.webp"),
    likedDefault: false,
  },
];

const PROPERTY_ITEMS = [
  ...BASE_PROPERTIES.map((property, index) => ({
    ...property,
    id: `property-${index + 1}`,
  })),
  ...BASE_PROPERTIES.map((property, index) => ({
    ...property,
    id: `property-${index + 7}`,
  })),
];

function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Active on select a tab
  function active(e) {
    const activeTab = document.querySelector(".properties .tabs button.active");
    if (activeTab) {
      activeTab.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  }

  // Like button of properties
  function like(e) {
    return e.target.classList.value === "fa-regular fa-heart like"
      ? (e.target.classList.value = "fa-solid fa-heart like text-danger")
      : (e.target.classList.value = "fa-regular fa-heart like");
  }

  const filteredProperties = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const minValue = minPrice === "" ? null : Number(minPrice);
    const maxValue = maxPrice === "" ? null : Number(maxPrice);
    const min = Number.isNaN(minValue) ? null : minValue;
    const max = Number.isNaN(maxValue) ? null : maxValue;

    return PROPERTY_ITEMS.filter((property) => {
      const matchesTitle = property.title.toLowerCase().includes(q);
      const matchesMinPrice = min === null || property.priceEth >= min;
      const matchesMaxPrice = max === null || property.priceEth <= max;
      return matchesTitle && matchesMinPrice && matchesMaxPrice;
    });
  }, [searchTerm, minPrice, maxPrice]);

  const hasActiveFilters = searchTerm !== "" || minPrice !== "" || maxPrice !== "";

  function resetFilters() {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    // Start properties
    <div className="properties" id="marketplace">
      <Container>
        <AnimationTitles
          className="title mx-auto"
          title="Discover more properties"
        />
        {/* Start tabs */}
        <div className="tabs d-flex justify-content-start justify-content-sm-center align-items-center flex-nowrap w-lg-50">
          <Swiper
            className="mySwiper overflow-none"
            grabCursor={true}
            spaceBetween={15}
            slidesPerView={6}
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 6,
              },
            }}
          >
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                All
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button
                className="ms-0 bg-black-100 border-0 active"
                onClick={active}
              >
                Cottage
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Chalet
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Manor
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Penthouse
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Farmhouse
              </Button>
            </SwiperSlide>
            <SwiperSlide>
              <Button className="ms-0 bg-black-100 border-0" onClick={active}>
                Duplex
              </Button>
            </SwiperSlide>
          </Swiper>
        </div>
        {/* End tabs */}

        {/* Start filters */}
        <div className="properties-filters d-flex flex-column flex-md-row gap-2 mt-3">
          <input
            type="text"
            placeholder="Search by title"
            className="properties-filter-input form-control bg-transparent text-white border-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Min price (ETH)"
            className="properties-filter-input properties-filter-number form-control bg-transparent text-white border-secondary"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Max price (ETH)"
            className="properties-filter-input properties-filter-number form-control bg-transparent text-white border-secondary"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <Button
            className="properties-filter-reset m-0 bg-black-100 border-secondary text-white"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
          >
            Reset
          </Button>
        </div>
        {/* End filters */}

        {/* Start cards */}
        <motion.div
          initial={{ x: -80 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {filteredProperties.length === 0 ? (
            <p className="gray-90 mt-4 mb-0">No properties match your filters.</p>
          ) : (
            <Swiper
              slidesPerView={4}
              spaceBetween={15}
              grabCursor={true}
              loop={filteredProperties.length > 5}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                520: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                992: {
                  slidesPerView: 4,
                },
                1198: {
                  slidesPerView: 5,
                },
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper mt-4"
            >
              {filteredProperties.map((property) => (
                <SwiperSlide key={property.id}>
                  <Card className="bg-black-100 rounded">
                    <Card.Body className="p-2">
                      <div className="rounded overflow-hidden position-relative">
                        <Card.Img
                          variant="top"
                          alt={property.title}
                          src={property.imageSrc}
                        />
                        <i
                          className={
                            property.likedDefault
                              ? "fa-solid fa-heart like text-danger"
                              : "fa-regular fa-heart like"
                          }
                          onClick={like}
                        ></i>
                      </div>
                      <h5 className="mt-2 text-white fw-normal">{property.title}</h5>
                      <p className="gray-90">{property.agency}</p>
                      <div className="d-flex">
                        <div className="me-3">
                          <CountDown
                            h={property.countdown.h}
                            m={property.countdown.m}
                            s={property.countdown.s}
                          />
                          <span className="gray-90">Remaining Time</span>
                        </div>
                        <div>
                          <h6 className="text-white">
                            {property.priceEth.toFixed(2)} ETH
                          </h6>
                          <span className="gray-90">Current Bid</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
        {/* End cards */}
      </Container>
    </div>
    // End properties
  );
}

export default Properties;
