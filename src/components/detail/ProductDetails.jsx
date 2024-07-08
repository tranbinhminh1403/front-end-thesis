import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import HistoryChart from "../line_chart/HistoryChart";
import formatUrl from "../../utils/formatUrl";
import formatSpecs from "../../utils/formatSpecs";
import formatUppercase from "../../utils/formatUppercase";
import HistoryChartCompare from "../line_chart/HistoryChartCompare";
import Select from "react-select";
import { Button } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import formatCPU from "../../utils/formatCPU";
import formatVGA from "../../utils/formatVGA";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();

  const [productsList, setProductsList] = useState([]);
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const token = localStorage.getItem("token");

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "/products/list"
        );
        setProductsList(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `/products/detail/${id}`
        );
        if (response.data.success) {
          setProduct(response.data.data.product);
          setSimilarProducts(response.data.data.similarProducts);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) return;
      const userId = getUserIdFromToken(token);

      try {
        const response = await axios.get(
          `/wishlist/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWishlist(response.data.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [token]);

  useEffect(() => {
    if (wishlist.length > 0 && product) {
      const productInWishlist = wishlist.some(
        (wishlistItem) => wishlistItem.productId === product._id
      );
      setIsInWishlist(productInWishlist);
    }
  }, [wishlist, product]);

  const handleSelectProduct1 = (selectedOption) => {
    setProduct1(selectedOption);
  };

  const handleSelectProduct2 = (selectedOption) => {
    setProduct2(selectedOption);
  };

  const selectedHistories = [];
  if (product && product.history) selectedHistories.push(product.history);
  if (product2 && product2.history) selectedHistories.push(product2.history);

  // Create options array for react-select
  const productOptions = productsList.map((product) => ({
    value: product._id,
    label: product.product_name,
    status: product.history[0].status,
    url: product.url,
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

  if (!product) {
    return <div>Loading...</div>;
  }

  const filteredSimilarProducts = similarProducts.filter((similarProduct) => {
    const productCPU = formatCPU(formatSpecs(product.specs)["CPU"]);
    const similarProductCPU = formatCPU(formatSpecs(similarProduct.specs)["CPU"]);
  
    const productGPU = formatVGA(formatSpecs(product.specs)["GPU"]);
    const similarProductGPU = formatVGA(formatSpecs(similarProduct.specs)["GPU"]);
  
    return productCPU === similarProductCPU && productGPU === similarProductGPU;
  });
  

  const handleCompareButtonClick = (similarProduct) => {
    const selectedProduct2 = {
      value: similarProduct._id,
      label: similarProduct.product_name,
      status: similarProduct.history[0].status,
      url: similarProduct.url,
      img: similarProduct.img,
      specs: similarProduct.specs,
      history: similarProduct.history,
    };
    setProduct2(selectedProduct2);
  };

  const addToWishlist = async (productId) => {
    console.log("Retrieved token:", token);
    if (!token) {
      console.error("No token found");
      return;
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      console.error("Invalid user ID");
      return;
    }

    try {
      const response = await axios.post(
        "/wishlist/add",
        {
          userId,
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product added to wishlist:", response.data);
      setIsInWishlist(true); // Update the state to reflect the change
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      console.error("Invalid user ID");
      return;
    }

    try {
      const response = await axios.delete(
        `/wishlist/user/${userId}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsInWishlist(false); // Update the state to reflect the change
      console.log("Product removed from wishlist:", response.data);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  return (
    <div
      className="details-page"
      style={{ maxWidth: "80%", marginLeft: "10%" }}
    >
      <div className="comparison-page">
        <div className="select-products">
          <div className="select-select">
            <Select
              placeholder=" Chọn sản phẩm so sánh"
              value={product2}
              onChange={handleSelectProduct2}
              options={productOptions}
              styles={customStyles}
              menuPlacement="auto"
            />
          </div>
        </div>

        <div className="comparison-container">
          {product && product.history && (
            <div className="product-card">
              <h3 style={{ height: 70 }}>{product.product_name}</h3>
              <img src={product.img} alt={product.product_name} />
              <div style={{ marginBottom: 15 }}>
                {["có hàng", "Có hàng", "còn hàng"].includes(
                  product.history[0].status?.toLowerCase() || ""
                ) ? (
                  <div style={{ color: "green" }}>
                    {formatUppercase(product.history[0].status)}
                  </div>
                ) : (
                  <div style={{ color: "red" }}>
                    {product.history[0].status}
                  </div>
                )}
              </div>
              <p>Giá hiện tại: {product.history[0].price.toLocaleString()} đ</p>
              <p>Giá gốc: {product.history[0].old_price.toLocaleString()} đ</p>
              <div style={{ marginTop: 15, marginBottom: 15, height: 230 }}>
                <div style={{ color: "blue", fontWeight: "bold" }}>
                  Thông số kỹ thuật:{" "}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>CPU: </span>{" "}
                  {formatSpecs(product.specs)["CPU"]}
                </div>

                <div>
                  <span style={{ fontWeight: "bold" }}>Card đồ hoạ: </span>{" "}
                  {formatSpecs(product.specs)["GPU"]}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>RAM: </span>{" "}
                  {formatSpecs(product.specs)["RAM"]}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Ổ cứng: </span>{" "}
                  {formatSpecs(product.specs)["Storage"]}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Màn hình: </span>{" "}
                  {formatSpecs(product.specs)["Screen"]}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}>Trọng lượng: </span>{" "}
                  {formatSpecs(product.specs)["Weight"]}
                </div>
              </div>
              <a
                href={formatUrl(product.url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Đến cửa hàng
              </a>
              {
                token ? (
                  <Button
                    onClick={() =>
                      isInWishlist
                        ? removeFromWishlist(product._id)
                        : addToWishlist(product._id)
                    }
                    style={{
                      color: isInWishlist ? "#e84421" : "",
                    }}
                  >
                    {isInWishlist ? "Bỏ theo dõi" : "Theo dõi"}
                  </Button>
                ) : null // or you can omit this part since null renders nothing
              }
            </div>
          )}
          {product2 && product2.history && (
            <div className="product-card">
              <h3 style={{ height: 70 }}>{product2.label}</h3>
              <img src={product2.img} alt={product2.label} />

              <div style={{ marginBottom: 15 }}>
                {["có hàng", "Có hàng", "còn hàng"].includes(
                  product2.status?.toLowerCase() || ""
                ) ? (
                  <div style={{ color: "green" }}>
                    {formatUppercase(product2.status)}
                  </div>
                ) : (
                  <div style={{ color: "red" }}>{product2.status}</div>
                )}
              </div>
              <p>
                Giá hiện tại: {product2.history[0].price.toLocaleString()} đ
              </p>
              <p>Giá gốc: {product2.history[0].old_price.toLocaleString()} đ</p>
              <div style={{ marginTop: 15, marginBottom: 15, height: 230 }}>
                <div style={{ color: "blue", fontWeight: "bold" }}>
                  Thông số kỹ thuật:
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
              <a
                href={formatUrl(product2.url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Đến cửa hàng
              </a>

            </div>
          )}
        </div>
        {selectedHistories.length > 0 && (
          <div className="chart-history">
            <HistoryChartCompare histories={selectedHistories} />
          </div>
        )}
      </div>

      <div className="similar-products" style={{ padding: 20 }}>
        <h2 style={{ paddingBottom: 10 }}>Giá tốt từ cửa hàng khác</h2>
        {filteredSimilarProducts.length > 0 && (
          <div className="similar-products-list">
            {filteredSimilarProducts.map((similarProduct) => (
              <div key={similarProduct._id} className="similar-product">
                <div
                  className="leftside"
                  style={{}}
                  onClick={() => navigate(`/detail/${similarProduct._id}`)}
                >
                  <img
                    src={similarProduct.img}
                    alt={similarProduct.product_name}
                    style={{ height: 100, paddingLeft: 10 }}
                  />
                </div>
                <div className="rightside">
                  <h3
                    style={{
                      maxHeight: 25,
                      overflow: "hidden",
                      whiteSpace: "no-wrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {similarProduct.product_name}
                  </h3>
                  <p>
                    Giá hiện tại:{" "}
                    {similarProduct.history[0].price.toLocaleString()} đ
                  </p>
                  <p>
                    Giá gốc:{" "}
                    {similarProduct.history[0].old_price.toLocaleString()} đ
                  </p>
                  <p
                    style={{
                      maxHeight: 20,
                      overflow: "hidden",
                      whiteSpace: "no-wrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Thông số kỹ thuật: {similarProduct.specs}
                  </p>
                  <a
                    href={formatUrl(similarProduct.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đến cửa hàng
                  </a>
                  <Button
                    style={{ marginLeft: 5, color: "#e84421" }}
                    onClick={() => handleCompareButtonClick(similarProduct)}
                  >
                    <CompareArrowsIcon /> So sánh
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {filteredSimilarProducts.length === 0 && (
          <p style={{ color: "grey" }}>
            Không có sản phẩm tương tự để hiển thị
          </p>
        )}
      </div>

      <div className="similar-products" style={{ padding: 20 }}>
        <h2 style={{ paddingBottom: 10 }}>Các sản phẩm cùng series</h2>
        {similarProducts.length > 0 && (
          <div className="similar-products-list">
            {similarProducts.map((similarProduct) => (
              <div key={similarProduct._id} className="similar-product">
                <div
                  className="leftside"
                  style={{}}
                  onClick={() => navigate(`/detail/${similarProduct._id}`)}
                >
                  <img
                    src={similarProduct.img}
                    alt={similarProduct.product_name}
                    style={{ height: 100, paddingLeft: 10 }}
                  />
                </div>
                <div className="rightside">
                  <h3
                    style={{
                      maxHeight: 25,
                      overflow: "hidden",
                      whiteSpace: "no-wrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {similarProduct.product_name}
                  </h3>
                  <p>
                    Giá hiện tại:{" "}
                    {similarProduct.history[0].price.toLocaleString()} đ
                  </p>
                  <p>
                    Giá gốc:{" "}
                    {similarProduct.history[0].old_price.toLocaleString()} đ
                  </p>
                  <p
                    style={{
                      maxHeight: 20,
                      overflow: "hidden",
                      whiteSpace: "no-wrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Thông số kỹ thuật: {similarProduct.specs}
                  </p>
                  <a
                    href={formatUrl(similarProduct.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đến cửa hàng
                  </a>
                  <Button
                    style={{ marginLeft: 5, color: "#e84421" }}
                    onClick={() => handleCompareButtonClick(similarProduct)}
                  >
                    <CompareArrowsIcon /> So sánh
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {similarProducts.length === 0 && (
          <p style={{ color: "grey" }}>
            Không có sản phẩm cùng series để hiển thị
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
