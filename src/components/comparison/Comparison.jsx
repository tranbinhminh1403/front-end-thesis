import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Comparison.css";
import HistoryChartCompare from "../line_chart/HistoryChartCompare";
import Select from "react-select"; // Import react-select
import { useNavigate } from "react-router-dom";
import formatSpecs from "../../utils/formatSpecs";
import { api } from "../../config/api";

const Comparison = () => {
  const [products, setProducts] = useState([]);
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(
          "/products/list"
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectProduct1 = (selectedOption) => {
    setProduct1(selectedOption);
  };

  const handleSelectProduct2 = (selectedOption) => {
    setProduct2(selectedOption);
  };

  const selectedHistories = [];
  if (product1 && product1.history) selectedHistories.push(product1.history);
  if (product2 && product2.history) selectedHistories.push(product2.history);

  // Create options array for react-select
  const productOptions = products.map((product) => ({
    value: product._id,
    label: product.product_name,
    img: product.img, // Add img for display in product card
    specs: product.specs, // Add specs for display in product card
    history: product.history, // Add history for display in product card
  }));

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0, // Align menu to the left
      marginRight: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: "left", // Align text inside options to the left
    }),
    control: (provided) => ({
      ...provided,
      textAlign: "left", // Align text inside control to the left
    }),
  };

  return (
    <div className="comparison-page">
      <div className="select-products">
        <div className="select-select">
          <Select
            placeholder=" Chọn sản phẩm"
            value={product1}
            onChange={handleSelectProduct1}
            options={productOptions}
            styles={customStyles}
            menuPlacement="auto"
          />
        </div>
        <div className="select-select">
          <Select
            placeholder=" Chọn sản phẩm"
            value={product2}
            onChange={handleSelectProduct2}
            options={productOptions}
            styles={customStyles}
            menuPlacement="auto"
          />
        </div>
      </div>
      {!product1 && !product2 && (
        <div className="no-selection-box">
          <span className="no-selection-text">Chọn sản phẩm để so sánh</span>
        </div>
      )}
      <div className="comparison-container">
        {product1 && product1.history && (
          <div className="product-card">
            <h3>{product1.label}</h3>
            <img src={product1.img} alt={product1.label} />
            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <div style={{ color: "blue", fontWeight: "bold" }}>
                Thông số kỹ thuật:{" "}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>CPU: </span>{" "}
                {formatSpecs(product1.specs)["CPU"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Card đồ hoạ: </span>{" "}
                {formatSpecs(product1.specs)["GPU"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>RAM: </span>{" "}
                {formatSpecs(product1.specs)["RAM"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Ổ cứng: </span>{" "}
                {formatSpecs(product1.specs)["Storage"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Màn hình: </span>{" "}
                {formatSpecs(product1.specs)["Screen"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Trọng lượng: </span>{" "}
                {formatSpecs(product1.specs)["Weight"]}
              </div>
            </div>
            <p>Giá hiện tại: {product1.history[0].price.toLocaleString()} đ</p>
          </div>
        )}
        {product2 && product2.history && (
          <div className="product-card">
            <h3>{product2.label}</h3>
            <img src={product2.img} alt={product2.label} />
            <div style={{ marginTop: 15, marginBottom: 15 }}>
              <div style={{ color: "blue", fontWeight: "bold" }}>
                Thông số kỹ thuật:{" "}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>CPU: </span>{" "}
                {formatSpecs(product2.specs)["CPU"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Card đồ hoạ: </span>{" "}
                {formatSpecs(product2.specs)["GPU"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>RAM: </span>{" "}
                {formatSpecs(product2.specs)["RAM"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Ổ cứng: </span>{" "}
                {formatSpecs(product2.specs)["Storage"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Màn hình: </span>{" "}
                {formatSpecs(product2.specs)["Screen"]}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Trọng lượng: </span>{" "}
                {formatSpecs(product2.specs)["Weight"]}
              </div>
            </div>

            <p>Giá hiện tại: {product2.history[0].price.toLocaleString()} đ</p>
          </div>
        )}
      </div>
      {selectedHistories.length > 0 && (
        <div className="chart-history">
          <HistoryChartCompare histories={selectedHistories} />
        </div>
      )}
    </div>
  );
};

export default Comparison