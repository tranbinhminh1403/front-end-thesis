// src/utils/formatPrice.js

/**
 * Formats a given integer price to a string with thousands separators and a currency symbol.
 * @param {number} price - The price to format.
 * @return {string} - The formatted price string.
 */
const formatPrice = (price) => {
    if (price == 0)
      return "Ngừng sản xuất"
    else if (price == -1)
      return "Liên hệ"
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  };
  
  export default formatPrice;
  