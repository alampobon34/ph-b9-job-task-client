import React, { useEffect } from "react";
import CarouselSection from "./Carousel";
import Feature from "./Feature";

const Home = () => {
  useEffect(() => {
    // fetch("https://dummyjson.com/products/category-list")
    //   .then((res) => res.json())
    //   .then(console.log);
    // fetch("https://dummyjson.com/products")
    //   .then((res) => res.json())
    //   .then(console.log);
  }, []);
  return (
    <div className="">
      <CarouselSection />
      <Feature />
    </div>
  );
};

export default Home;
