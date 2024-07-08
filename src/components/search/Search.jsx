import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import formatName from "../../utils/formatName";
import formatUppercase from "../../utils/formatUppercase";
import Pagination from "@mui/material/Pagination";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    shop: [],
    specs: [],
    minPrice: "",
    maxPrice: "",
  });

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products with filters:", filters);
      const response = await axios.get("/products/search", {
        params: filters,
      });
      // console.log("API response:", response.data);
      setProducts(response.data.data);
      setCurrentPage(1); // Reset to first page whenever filters change
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => {
      if (type === "checkbox") {
        if (checked) {
          if (name === "shop") {
            return { ...prevFilters, shop: [...prevFilters.shop, value] };
          } else {
            return { ...prevFilters, specs: [...prevFilters.specs, value] };
          }
        } else {
          if (name === "shop") {
            return {
              ...prevFilters,
              shop: prevFilters.shop.filter((shop) => shop !== value),
            };
          } else {
            return {
              ...prevFilters,
              specs: prevFilters.specs.filter((spec) => spec !== value),
            };
          }
        }
      }
      return { ...prevFilters, [name]: value };
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="search-page">
      <div className="filter-sidebar">
        <h3>Bộ lọc</h3>
        <h4>Tên</h4>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <h4>Nhãn hiệu</h4>
        <input
          type="text"
          name="brand"
          placeholder="Nhãn hiệu"
          value={filters.brand}
          onChange={handleFilterChange}
        />
        <h4>Cửa hàng</h4>
        <div className="checkbox-group">
          <label>
            <input
              type="radio"
              name="shop"
              value=""
              onChange={handleFilterChange}
            />{" "}
            Tất cả
          </label>
          <label>
            <input
              type="radio"
              name="shop"
              value="fpt"
              onChange={handleFilterChange}
            />{" "}
            FPT
          </label>
          <label>
            <input
              type="radio"
              name="shop"
              value="gearvn"
              onChange={handleFilterChange}
            />{" "}
            GearVN
          </label>
          <label>
            <input
              type="radio"
              name="shop"
              value="phucanh"
              onChange={handleFilterChange}
            />{" "}
            Phúc Anh
          </label>
        </div>

        <h4>CPU</h4>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="specs"
              value="core"
              onChange={handleFilterChange}
            />{" "}
            Intel
          </label>
          <label>
            <input
              type="checkbox"
              name="specs"
              value="ryzen"
              onChange={handleFilterChange}
            />{" "}
            AMD
          </label>

        </div>

        <h4>RAM</h4>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="specs"
              value="8 GB"
              onChange={handleFilterChange}
            />{" "}
            8 GB
          </label>
          <label>
            <input
              type="checkbox"
              name="specs"
              value="16 GB"
              onChange={handleFilterChange}
            />{" "}
            16 GB
          </label>
        </div>

        <h4>Đồ hoạ</h4>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="specs"
              value="geforce"
              onChange={handleFilterChange}
            />{" "}
            NVIDIA GeForce
          </label>
          <label>
            <input
              type="checkbox"
              name="specs"
              value="radeon"
              onChange={handleFilterChange}
            />{" "}
            AMD Radeon
          </label>
          <label>
            <input
              type="checkbox"
              name="specs"
              value="iris"
              onChange={handleFilterChange}
            />{" "}
            Intel Iris
          </label>
        </div>

        <h4>Ổ cứng</h4>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="specs"
              value="TB"
              onChange={handleFilterChange}
            />{" "}
            1+ TB
          </label>
          <label>
            <input
              type="checkbox"
              name="specs"
              value="512"
              onChange={handleFilterChange}
            />{" "}
            512 GB
          </label>
          <label>
            <input
              type="checkbox"
              name="specs"
              value="256"
              onChange={handleFilterChange}
            />{" "}
            256 GB
          </label>
          <label>
            <input
              type="checkbox"
              name="specs"
              value="128"
              onChange={handleFilterChange}
            />{" "}
            128 GB
          </label>
        </div>

        <h4>Giá sản phẩm</h4>
        <div className="range-price">
          <input
            type="number"
            name="minPrice"
            placeholder="giá từ"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="đến giá"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="product-container">
        <div className="product-list">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="product-item"
              onClick={() => navigate(`/detail/${product._id}`)}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={product.img}
                  alt="laptop img"
                  style={{ height: 200, paddingBottom: 5 }}
                />
              </div>
              <h3 style={{ height: 90 }}>{formatName(product.product_name)}</h3>
              <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                <h4 className="inline">Cửa hàng: </h4>
                <p className="inline status">{formatUppercase(product.shop_name)}</p>
              </div>

              {["có hàng", "Có hàng", "còn hàng"].includes(
                product.status?.toLowerCase() || ""
              ) ? (
                <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <h4 className="inline">Trạng thái: </h4>
                  <p className="inline status" style={{ color: "green" }}>
                    {formatUppercase(product.status)}
                  </p>
                </div>
              ) : (
                <div style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <h4 className="inline">Trạng thái: </h4>
                  <p className="inline status" style={{ color: "red" }}>
                    {formatUppercase(product.status)}
                  </p>
                </div>
              )}

              <p style={{ color: "green", fontSize: 25, paddingBottom: 20 }}>
                {formatPrice(product.price)}
              </p>
            </div>
          ))}
        </div>
        <div className="pagination">
          <Pagination
            count={Math.ceil(products.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
