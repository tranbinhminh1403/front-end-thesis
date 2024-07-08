import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import formatName from "../../utils/formatName";
import formatUppercase from "../../utils/formatUppercase";

const Compare = () => {
  const location = useLocation();
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId1 = searchParams.get("product1");
    const productId2 = searchParams.get("product2");

    if (productId1) {
      fetchProduct(productId1, setProduct1);
    }
    if (productId2) {
      fetchProduct(productId2, setProduct2);
    }
  }, [location.search]);

  const fetchProduct = async (productId, setProduct) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

  return (
    <div className="compare-page">
      <h1>So sánh sản phẩm</h1>
      <div className="compare-products">
        {product1 && (
          <div className="compare-product">
            <h2>{formatName(product1.product_name)}</h2>
            <img
              src={product1.img}
              alt="Product 1"
              style={{ height: 200, paddingBottom: 10 }}
            />
            <p>
              <strong>Giá:</strong> {formatPrice(product1.price)}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <span style={{ color: "green" }}>
                {formatUppercase(product1.status)}
              </span>
            </p>
            {/* Display other details as needed */}
            <a href={product1.url} target="_blank" rel="noopener noreferrer">
              Xem chi tiết
            </a>
          </div>
        )}
        {product2 && (
          <div className="compare-product">
            <h2>{formatName(product2.product_name)}</h2>
            <img
              src={product2.img}
              alt="Product 2"
              style={{ height: 200, paddingBottom: 10 }}
            />
            <p>
              <strong>Giá:</strong> {formatPrice(product2.price)}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <span style={{ color: "green" }}>
                {formatUppercase(product2.status)}
              </span>
            </p>
            {/* Display other details as needed */}
            <a href={product2.url} target="_blank" rel="noopener noreferrer">
              Xem chi tiết
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
