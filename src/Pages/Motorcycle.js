import React, { useState } from "react";
import "../Styles/style.css";

import Poster from "../Assets/Poster.jpg";
import tmax from "../Assets/tmax.png";
import xmax from "../Assets/xmax.jpg";
import nmax from "../Assets/nmax.jpg";
import r1 from '../Assets/r1.png';
import tracer from '../Assets/tracer.png';
import xt from '../Assets/xt.png';
import zuma from '../Assets/zuma.png';
import yz250f from '../Assets/yz250f.jpg';
import bolt950 from '../Assets/bolt950rspec1.jpg';


const staticProducts = [
  {
    name: "YZF-R1M",
    category: "SuperSport",
    price: "$27,899",
    image: r1,
    description:"Yamaha's highest specification Supersport, the 2026 YZF-R1M comes adorned in striking carbon fiber bodywork including MotoGP®-inspired winglets, distinctive R1M styling and an engraved serial number badge to further highlight its exclusivity.", 
       
  },
  {
    name: "TRACER 9",
    category: "Touring",
    price: "$12,599",
    image: tracer, 
    description:"Simple, attainable, and ready to customize. The new 2025 TRACER 9 combines thrilling CP3 power and sportbike agility with the capability to cover long distances with ease."
  },
  {
    name: "XT250",
    category: "Dual Sport",
    price: "$5,499",
    image: xt,
    description:"With electric start and a low seat height, the light, nimble and reliable XT250 is built to go wherever you go. On‑ or off‑road."
  },
  {
    name: "ZUMA 125",
    category: "Scooter",
    price: "$3,799",
    image: zuma,
    description:"The reimagined, ultra‑modern, Zuma 125 is a rugged and fuel efficient scooter with big features in a compact package."
  },
  {
    name: "YZ250F",
    category: "MotorCross",
    price: "$9,099",
    image: yz250f,
    description: "The performance of a multi‑time Supercross & Motocross champ wrapped in 70th Anniversary Edition style. Your iconic moto weapon of choice awaits.",   
  },
  {
    name: "BOLT R-SPEC",
    category: "Sport Heritage",
    price: "$8,999",
    image: bolt950,   
    description: "Featuring a torquey V‑Twin engine, this performance bobber combines old‑school soul and modern form.",
  }
];

const Motorcycle = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <>
      <main className="container">

        
        <header className="page-header">
          <h1>Motorcycle's Collection</h1>
          <p>Explore all Motorcycle</p>
        </header>

       
        <div className="featured-banner">
          <img src={Poster} alt="Featured collection banner" />
          <div className="featured-banner-content">
            <h2>MAXIMUM SPORT</h2>
            <p>New models for all tastes: from bikes to scooters, discover the 2025 Yamaha lineup.</p>
            <a href="#" className="cta-button">Shop New Arrivals</a>
          </div>
        </div>

       
        <section className="trending-section">
          <h2 className="section-heading">MAX Family</h2>

          <div className="trending-grid">
            <div className="trending-item">
              <img src={tmax} alt="Trending Shoe 1" />
              <div className="trending-item-content">
                <h3>T-MAX</h3>
                <p>The next generation of Air technology.</p>
                <a href="#" className="shop-button">Explore T-MAX</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={xmax} alt="Trending Clothing" />
              <div className="trending-item-content">
                <h3>X-MAX</h3>
                <p>Lightweight warmth, premium look.</p>
                <a href="#" className="shop-button">Explore X-MAX</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={nmax} alt="Trending Running Gear" />
              <div className="trending-item-content">
                <h3>N-MAX</h3>
                <p>Gear up for your best run yet.</p>
                <a href="#" className="shop-button">Explore N-MAX</a>
              </div>
            </div>
          </div>
        </section>

     
        <section>
          <h2 className="section-heading">Shop The Latest Model</h2>

          <div className="product-grid">
            {staticProducts.slice(0, visibleCount).map((product, index) => (
              <div className="product-card" key={index}>
              
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">{product.price}</p>
                  <p className="description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < staticProducts.length && (
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

export default Motorcycle;
