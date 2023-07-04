import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

function ProductCard(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let priceOption = Object.keys(options);

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      img: props.foodItem.img,
      qty: qty,
      size: size,
    });

    console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          className="card-img-top"
          src={props.foodItem.img}
          alt="Card image cap"
          style={{ height: "150px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">{props.foodDescription}</p> */}
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return <option key={i + 1}>{i + 1}</option>;
              })}
            </select>

            <select
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => {
                setSize(e.target.value);
              }}
              ref={priceRef}
            >
              {priceOption.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5 " style={{ marginLeft: "3%" }}>
              {finalPrice}Rs/-
            </div>
            <hr />
            <button
              className="btn btn-success justify-cemter ms-2"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
          {/* <button className="btn btn-success">Go somewhere</button> */}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
