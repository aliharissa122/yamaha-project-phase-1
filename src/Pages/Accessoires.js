


import React, { useState } from "react";
import Abanner from "../Assets/Accessoires.jpg"; 
import '../Styles/style.css';

const Accessoires = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  
  const AccImg = "";
  const Acc1Img = "";
  const Acc2Img = "";

  const products = [
    {
      name: "Yamaha Mirror",
      category: "Motorcyle Accessoires",
      price: "$90",
      image: "",
    },
    {
      name: "Nmax Screen",
      category: "Motorcyle Accessoires",
      price: "$65",
      image: "",
    },
    {
      name: "Tmax Exhasut",
      category: "Motorcyle Parts",
      price: "$300",
      image: "",
    },
    {
      name: "Yamaha Helmet",
      category: "Motorcyle Accessoires",
      price: "$85",
      image: "",
    },
  ];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <main className="container">

        <header className="page-header">
          <h1>Parts & Accessoires Collection</h1>
          <p>Accessories designed for your Yamaha vehicle.</p>
        </header>

        
        <div className="featured-banner">
          <img src={Abanner} alt="Accessoires Banner" />
          <div className="featured-banner-content">
            <h2>Upgrade Your Ride</h2>
            <p>Precision Parts for Peak Performance</p>
            <a href="#" className="cta-button">Shop the Latest Gear Today</a>
          </div>
        </div>

      
        <section className="trending-section">
          <div className="trending-grid">
            <div className="trending-item">
              <img src={AccImg} alt="" />
              <div className="trending-item-content">
                <h3>Accessoires</h3>
                <p>description</p>
                <a href="#" className="shop-button">Shop Accessoires</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={Acc1Img} alt="" />
              <div className="trending-item-content">
                <h3>Parts</h3>
                <p>description</p>
                <a href="#" className="shop-button">Explore Parts</a>
              </div>
            </div>

        
          </div>
        </section>

     
        <section>
          <h2 className="section-heading">Shop The Essentials</h2>
          <div className="product-grid">
            {products.slice(0, visibleCount).map((product, i) => (
              <div className="product-card" key={i}>
                <img src={product.image} alt="" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < products.length && (
            <div className="load-more-container">
              <button className="load-more-button" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </section>
      </main>

      
    </>
  );
};

export default Accessoires;
