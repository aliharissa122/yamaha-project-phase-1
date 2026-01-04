import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Abanner from "../Assets/Accessoires.jpg";
import "../Styles/style.css";

import { getProducts } from "../api";

// fallback image (used if no image at all)
import fallbackImg from "../Assets/logo1.png";

const API_BASE = "http://localhost:5000";

const Accessoires = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  // Backend products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Read ?search= from URL
  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").trim();
  const isSearching = search.length > 0;

  // placeholders (can be replaced later)
  const AccImg = "";
  const Acc1Img = "";

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts({ category: "accessory", search });

        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
          setVisibleCount(4);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || "Failed to load accessories");
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
          <h1>Parts & Accessoires Collection</h1>
          <p>Accessories designed for your Yamaha vehicle.</p>
        </header>

        {/* Hide banner while searching */}
        {!isSearching && (
          <div className="featured-banner">
            <img src={Abanner} alt="Accessoires Banner" />
            <div className="featured-banner-content">
              <h2>Upgrade Your Ride</h2>
              <p>Precision Parts for Peak Performance</p>
              <a href="#" className="cta-button">
                Shop the Latest Gear Today
              </a>
            </div>
          </div>
        )}

        {/* Hide trending section while searching */}
        {!isSearching && (
          <section className="trending-section">
            <div className="trending-grid">
              <div className="trending-item">
                <img src={AccImg} alt="" />
                <div className="trending-item-content">
                  <h3>Accessoires</h3>
                  <p>description</p>
                  <a href="#" className="shop-button">
                    Shop Accessoires
                  </a>
                </div>
              </div>

              <div className="trending-item">
                <img src={Acc1Img} alt="" />
                <div className="trending-item-content">
                  <h3>Parts</h3>
                  <p>description</p>
                  <a href="#" className="shop-button">
                    Explore Parts
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="section-heading">Shop The Essentials</h2>

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

              // 🔑 THIS IS THE IMPORTANT PART FOR UPLOADED IMAGES
              const imgSrc =
                product.image_url?.startsWith("/uploads/")
                  ? API_BASE + product.image_url
                  : product.image_url || fallbackImg;

              return (
                <div className="product-card" key={product.id}>
                  <img src={imgSrc} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="category">{uiCategory}</p>
                    <p className="price">
                      ${Number(product.price).toFixed(2)}
                    </p>
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

export default Accessoires;
