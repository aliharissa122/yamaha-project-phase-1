import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api";
import "../Styles/style.css";

// Fallback images (same idea as Motorcycle page)
import r1 from "../Assets/r1.png";
import tracer from "../Assets/tracer.png";
import xt from "../Assets/xt.png";
import zuma from "../Assets/zuma.png";
import yz250f from "../Assets/yz250f.jpg";
import bolt950 from "../Assets/bolt950rspec1.jpg";
import fallbackImg from "../Assets/logo1.png"; // final fallback

const API_BASE = "http://localhost:5000";

const fallbackImagesByName = {
  "YZF-R1M": r1,
  "TRACER 9": tracer,
  XT250: xt,
  "ZUMA 125": zuma,
  YZ250F: yz250f,
  "BOLT R-SPEC": bolt950,
};

function resolveImage(product) {
  const url = (product.image_url || "").trim();

  // Uploaded image from backend
  if (url.startsWith("/uploads/")) return API_BASE + url;

  // Full URL already (http/https)
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  // If you store something like "/images/xxx.png" in React public folder
  if (url.startsWith("/")) return url;

  // If DB has no image_url, use fallback-by-name or final fallback
  return fallbackImagesByName[product.name] || fallbackImg;
}

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts({ search: query });

        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (query) load();
    else {
      setProducts([]);
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <main className="container">
      <header className="page-header">
        <h1>Search Results</h1>
        <p>
          Showing results for: <strong>{query}</strong>
        </p>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && products.length === 0 && <p>No results found.</p>}

      <div className="product-grid">
        {products.map((p) => {
          const imgSrc = resolveImage(p);

          return (
            <div className="product-card" key={p.id}>
              <img src={imgSrc} alt={p.name} />
              <div className="product-info">
                <h3>{p.name}</h3>
                <p className="category">{p.category}</p>
                <p className="price">${Number(p.price).toFixed(2)}</p>
                <p className="description">{p.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
