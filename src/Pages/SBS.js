import React, { useState } from "react";
import wbanner from '../Assets/wbanner.jpg';
import YXZ from '../Assets/yxz.png';
import viking from '../Assets/viking.png';
import griz from '../Assets/griz.png';
import wolverin from '../Assets/woolverin.png';
import raptor from '../Assets/raptor.png';
import Transport from '../Assets/transport.png';
import srx from '../Assets/srx120.png';

import "../Styles/style.css"; 

const Sbs = () => {
  const [visibleCount, setVisibleCount] = useState(4);

 
  const bannerImg = wbanner;
  const VehImg = YXZ;
  const VikImg = viking;
  

 
  const products = [
    {
      name: "GRIZZLY EPS XT-R",
      category: "Utility ATV",
      price: "$11,399",
      image: griz,
      description:"This XT‑R Edition is ready for extreme adventure with a factory‑installed WARN® Winch, Special Edition paint, color‑matched wheels and aggressive tread Maxxis® 'Zilla tires." ,
    },
    {
      name: "WOLVERINE RMAX2 1000 SPORT",
      category: "Reaction",
      price: "$21,999",
      image: wolverin,
      description: "The sportiest RMAX ever with race-team-inspired styling, highly adjustable sport-tuned suspension, and Yamaha-exclusive off-road ready wheels and tires." ,
      },
    {
      name: "RAPTOR 700",
      category: "ATV",
      price: "$9,999",
      image: raptor,
      description: "Based on the legendary R model, the Raptor 700 offers big‑bore performance for budget‑minded enthusiasts.",
    },
    {
      name: "TRANSPORTER 800",
      category: "SnowMobile",
      price: "$15,699",
      image: Transport,
      description: "Yamaha has a deep understanding of what it takes to get the job done in the extremes of winter. The simple design and dependability of the technically advanced Transporter 800 articulated long track fill these needs. At its heart is a two-stroke, 794cc engine with back-up recoil starting. Purposeful attributes like a rugged storage rack, sturdy tow hitch, long-range fuel capacity and functional protection from the elements are all provided to fit those unique needs.",
    },
    {
      name: "SSRX120R",
      category: "SnowMobile",
      price: "$4,099",
      image: srx,
      description: "Yamaha’s SRX120R is the introduction to snowmobiles for many kids. A number of safety controls ensure the SRX120R leaves a positive first impression for young riders and parents alike. The easy-to-start and dependable Yamaha engine will have many a winter day spent on snow.",
    },
  ];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <main className="container">
        
        <header className="page-header">
          <h1>Side-By-Side's Collection</h1>
          <p>Enjoy Driving together</p>
        </header>

        <div className="featured-banner">
          <img src={bannerImg} alt="SBS's Banner" />
          <div className="featured-banner-content">
            <h2>Pure Sport</h2>
            <p>Engineered for all-day comfort .</p>
            <a href="#" className="cta-button">Shop New Arrivals</a>
          </div>
        </div>

        <section className="trending-section">
          <h2 className="section-heading">VIKING Family</h2>
          <div className="trending-grid">
            <div className="trending-item">
              <img src={VehImg} alt="" />
              <div className="trending-item-content">
                <h3>VIKING VI EPS</h3>
                <p>HARD‑WORKING GOOD LOOKS</p>
                <a href="#" className="shop-button">Explore VIKING VI EPS</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={VikImg} alt="" />
              <div className="trending-item-content">
                <h3>VIKING EPS</h3>
                <p>Comfortable, Capable, Confident.</p>
                <a href="#" className="shop-button">Explore VIKING EPS</a>
              </div>
            </div>

        
          </div>
        </section>

        <section>
          <h2 className="section-heading">Shop The Latest Model</h2>
          <div className="product-grid">
            {products.slice(0, visibleCount).map((product, i) => (
              <div className="product-card" key={i}>
                <img src={product.image} alt="" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">{product.price}</p>
                  <p className="description">{product.description}</p>
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

export default Sbs ;
