import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Styles/Promo.css"; 
import image1 from '../Assets/image1.jpg';
import image2 from '../Assets/image2.jpeg';
import image3 from '../Assets/image3.png';


const Slide = () => {
  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">

      {/* Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active">
          <img src={image1} className="d-block w-100" alt="slide 1" />
          <div className="carousel-caption middle-left">
            <h2>T-MAX</h2>
            <p>The ultimate Sport Scooter with Y-Connect smartphone connectivity and a liquid‑cooled engine that is both fuel efficient and performance proven.</p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img src={image2} className="d-block w-100" alt="slide 2" />
          <div className="carousel-caption middle-left">
            <h2>MT-10</h2>
            <p>Prices Starting At $14,999</p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img src={image3} className="d-block w-100" alt="slide 3" />
          <div className="carousel-caption middle-left">
            <h2>YXZ1000R SS XT-R</h2>
            <p>Prices Start at $23,699</p>
          </div>
        </div>

      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
      
    </div>
  );
};

export default Slide;
