import React from "react";
import { useQuery } from "@tanstack/react-query";
import products from "../../../products.json";
import ProductCard from "../../components/cards/ProductCard";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { api } from "../../services/axios";
const Feature = () => {
  const { data: featureList = [], isLoading } = useQuery({
    queryKey: ["feature-list"],
    queryFn: async () => {
      const { data } = await api.get("/products/top-6");
      return data;
    },
  });

  return (
    <section className="my-10">
      <div className="wrapper">
        <h1 className="text-center tex-2xl md:text-3xl lg:text-4xl font-bold">
          Explore Proucts
        </h1>
        <p className="text-center mb-6 mt-3">
          See the versatile list of products for your need
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <Loader />
          ) : (
            featureList.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))
          )}
        </div>
      </div>
      <div className="py-5 flex justify-center">
        <Link to={"/all-products"}>
          <Button variant="outlined">See All</Button>
        </Link>
      </div>
    </section>
  );
};

export default Feature;
