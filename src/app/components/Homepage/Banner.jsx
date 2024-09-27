import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="carousel container mx-auto">
        {banners && banners.length > 0 ? (
          banners.map((banner, idx) => (
            <div
              key={idx}
              style={{
                backgroundImage: `linear-gradient(45deg, rgba(7, 25, 2, 0.7), rgba(0, 0, 0, 0.3)), url(/assets/images/banner/${
                  idx + 1
                }.jpg)`,
              }}
              id={`slide${idx + 1}`}
              className="carousel-item relative w-full h-[90vh] bg-cover bg-center"
            >
              <div className="flex items-center h-full">
                <div className="text-white ml-16 px-8">
                  <h1 className="text-4xl font-bold mb-4">{banner.title}</h1>
                  <p className="text-lg">{banner.description}</p>
                  <div className="flex gap-4 mt-6">
                    <button className="btn border-none bg-red-600 text-white hover:bg-red-700">
                      Explore more
                    </button>
                    <button className="btn border-red-600 bg-transparent hover:bg-transparent text-red-600">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              {/* Buttons positioned at the bottom and centered */}
              <div className="absolute bottom-5 right-0 transform -translate-x-1/2 flex gap-4">
                <a href={`#${banner.prev}`} className="btn btn-circle hover:bg-red-600">
                  ❮
                </a>
                <a href={`#${banner.next}`} className="btn btn-circle hover:bg-red-600">
                  ❯
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-white text-xl">No banners available</p>
          </div>
        )}
      </div>
    </div>
  );
};

const banners = [
  {
    title: "Affordable Price for car servicing",
    description: "Get the best prices for top-quality car services.",
    next: "slide2",
    prev: "slide4",
  },
  {
    title: "Best Deals for Car Repairs",
    description: "Unbeatable offers on all car repairs and maintenance.",
    next: "slide3",
    prev: "slide1",
  },
  {
    title: "Premium Car Maintenance",
    description: "Ensure your car stays in top shape with premium services.",
    next: "slide4",
    prev: "slide2",
  },
  {
    title: "Expert Mechanics at Your Service",
    description: "Our expert mechanics provide reliable and efficient service.",
    next: "slide1",
    prev: "slide3",
  },
];

export default Banner;
