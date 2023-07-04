import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";
import Carousel from "../Components/Carousel";

function Home() {
  const [searchtext, setSearchtext] = useState("");
  const [foodItems, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const searchedFoodItem = (FoodName) => {
    setSearchtext(FoodName);
  };

  const loadData = async () => {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setFoodItem(data[0]);
    setFoodCat(data[1]);
    // console.log(data[0], data[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel searchedFoodItem={searchedFoodItem} />
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((category) => {
            return (
              <div className="row mb-3">
                <div key={category._id} className="fs-3 m-3">
                  {category.CategoryName}
                </div>
                <hr />
                {foodItems !== [] ? (
                  foodItems
                    .filter(
                      (foodItem) =>
                        foodItem.CategoryName === category.CategoryName &&
                        foodItem.name
                          .toLowerCase()
                          .includes(searchtext.toLocaleLowerCase())
                    )
                    .map((filteredItem) => {
                      return (
                        <div
                          key={filteredItem._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <ProductCard
                            // foodName={filteredItem.name}
                            // foodImage={filteredItem.img}
                            // foodDescription={filteredItem.description}
                            foodItem={filteredItem}
                            options={filteredItem.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div> No Such Data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>------------</div>
        )}
        {/* <ProductCard /> */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
