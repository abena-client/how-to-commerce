import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/products/cartSlice";
import { currencyFormatter } from "../utlities/currencyFormatter";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCardHandler = (product) => {
    dispatch(addToCart(product))
    navigate("/cart");
  };

  return (
    <div className="product flex flex-col gap-2 bg-gray-900 border border-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-2xl hover:border-orange-500 duration-300 transition-all">
      <div className="img h-72 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"  />
      </div>
      <div className="texts flex flex-col gap-2 px-5 pb-5">
        <span className="catagory-tag text-sm uppercase font-semibold tracking-widest text-orange-500">
          {product.category}
        </span>
        <h3 className="title text-xl font-medium h-[5.25rem] text-white">
          {product.name}
        </h3>
        <p className="details text-gray-400 h-[4.8rem] overflow-hidden"> {product.description}</p>
        <div className="flex justify-between items-center font-medium">
          <span className="price text-xl text-orange-500">
            {currencyFormatter(product.price)}
          </span>
          <button
            onClick={() => addToCardHandler(product)}
            className="cursor-pointer uppercase bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg duration-300 shadow-lg"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
