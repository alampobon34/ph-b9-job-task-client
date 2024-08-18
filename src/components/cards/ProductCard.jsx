import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { productName, description, imageUrl, price, ratings, brand } = product;
  return (
    <Card className="max-w-[24rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none relative"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        />
        <span className="absolute top-3 right-3 bg-white py-0.5 px-2 rounded">
          {ratings}
        </span>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" color="blue-gray">
          {productName}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-2 text-[12px] line-clamp"
        >
          {description}
        </Typography>
        <div className="flex items-center gap-2 justify-center mt-2">
          <Typography variant="small" color="blue-gray">
            BDT-{price}
          </Typography>
          <Typography variant="small" color="blue-gray">
            Brand-{brand}
          </Typography>
        </div>
      </CardBody>
      {/* <CardFooter className="flex items-center justify-between"></CardFooter> */}
    </Card>
  );
}
