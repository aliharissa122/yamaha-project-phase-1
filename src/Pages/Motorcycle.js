import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api";

import "../Styles/style.css";

import Poster from "../Assets/Poster.jpg";
import tmax from "../Assets/tmax.png";
import xmax from "../Assets/xmax.jpg";
import nmax from "../Assets/nmax.jpg";

// Fallback images (optional if some products in DB don't have image_url yet)
import r1 from "../Assets/r1.png";
import tracer from "../Assets/tracer.png";
import xt from "../Assets/xt.png";
import zuma from "../Assets/zuma.png";
import yz250f from "../Assets/yz250f.jpg";
import bolt950 from "../Assets/bolt950rspec1.jpg";


const API_BASE = "http://localhost:5000";


// Simple fallback map (by product name) to keep images working even before you store image_url in DB
const fallbackImagesByName = {
  "YZF-R1M": r1,
  "TRACER 9": tracer,
  XT250: xt,
  "ZUMA 125": zuma,
  YZ250F: yz250f,
  "BOLT R-SPEC": bolt950,
};

const Motorcycle = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  // Backend products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Read ?search= from URL
  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").trim();
  const isSearching = search.length > 0;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        // Fetch bikes from backend + optional search
        const data = await getProducts({ category: "bike", search });

        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
          setVisibleCount(4); // reset load-more when search changes
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || "Failed to load products");
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <>
      <main className="container">
        <header className="page-header">
          <h1>Motorcycle's Collection</h1>
          <p>Explore all Motorcycle</p>
        </header>

        {/* Hide banner while searching */}
        {!isSearching && (
          <div className="featured-banner">
            <img src={Poster} alt="Featured collection banner" />
            <div className="featured-banner-content">
              <h2>MAXIMUM SPORT</h2>
              <p>
                New models for all tastes: from bikes to scooters, discover the
                2025 Yamaha lineup.
              </p>
              <a href="#" className="cta-button">
                Shop New Arrivals
              </a>
            </div>
          </div>
        )}

        {/* Hide MAX Family section while searching */}
        {!isSearching && (
          <section className="trending-section">
            <h2 className="section-heading">MAX Family</h2>

            <div className="trending-grid">
              <div className="trending-item">
                <img src={tmax} alt="T-MAX" />
                <div className="trending-item-content">
                  <h3>T-MAX</h3>
                  <p>The next generation of Air technology.</p>
                  <a href="#" className="shop-button">
                    Explore T-MAX
                  </a>
                </div>
              </div>

              <div className="trending-item">
                <img src={xmax} alt="X-MAX" />
                <div className="trending-item-content">
                  <h3>X-MAX</h3>
                  <p>Lightweight warmth, premium look.</p>
                  <a href="#" className="shop-button">
                    Explore X-MAX
                  </a>
                </div>
              </div>

              <div className="trending-item">
                <img src={nmax} alt="N-MAX" />
                <div className="trending-item-content">
                  <h3>N-MAX</h3>
                  <p>Gear up for your best run yet.</p>
                  <a href="#" className="shop-button">
                    Explore N-MAX
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="section-heading">Shop The Latest Model</h2>

          {isSearching && (
            <p style={{ marginBottom: "10px" }}>
              Showing results for: <strong>{search}</strong>{" "}
              <button
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => (window.location.href = window.location.pathname)}
              >
                Clear
              </button>
            </p>
          )}

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && products.length === 0 && (
            <p>No products found.</p>
          )}

          <div className="product-grid">
            {products.slice(0, visibleCount).map((product) => {
              const uiCategory =
                product.type || product.subcategory || product.category;

           const imgSrc =
  product.image_url?.startsWith("/uploads/")
    ? API_BASE + product.image_url
    : product.image_url || fallbackImagesByName[product.name] || r1; // fallback


              return (
                <div className="product-card" key={product.id}>
                  <img src={imgSrc} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="category">{uiCategory}</p>
                    <p className="price">${Number(product.price).toFixed(2)}</p>
                    <p className="description">{product.description}</p>
                  </div>
                </div>
              );
            })}
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

export default Motorcycle;
