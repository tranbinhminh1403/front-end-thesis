import React, { useState, useEffect } from 'react';
import axios from 'axios';
import formatUrl from '../../utils/formatUrl';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem('token');

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  };

  const userId = getUserIdFromToken(token);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/wishlist/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWishlist(response.data.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId, token]);

  const navigate = useNavigate();

  const removeProductFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/wishlist/user/${userId}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Update the state to remove the product from the wishlist
      setWishlist((prevWishlist) => prevWishlist.filter(product => product.productId !== productId));
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Danh sách theo dõi</h2>
      {wishlist.length > 0 ? (
        wishlist.map((product) => (
          <div key={product.productId} className="similar-product">
            <div
              className="leftside"
              style={{}}
              onClick={() => navigate(`/detail/${product.productId}`)}
            >
              <img
                src={product.img}
                alt={product.productName}
                style={{ height: 100, paddingLeft: 10 }}
              />
            </div>
            <div className="rightside">
              <h3 style={{
                maxHeight: 25,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}>{product.productName}</h3>
              <p>
                Giá hiện tại:{" "}
                {product.history[0].price.toLocaleString()} đ
              </p>
              <p>
                Giá gốc:{" "}
                {product.history[0].oldPrice.toLocaleString()} đ
              </p>
              <a
                href={formatUrl(product.url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Đến cửa hàng
              </a>
              <Button style={{color: '#e84421'}} onClick={() => removeProductFromWishlist(product.productId)}>Bỏ theo dõi</Button>
            </div>
          </div>
        ))
      ) : (
        <p>Không có sản phẩm</p>
      )}
    </div>
  );
};

export default Wishlist;
