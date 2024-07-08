// src/utils/formatName.jsx

/**
 * Formats a given string by removing all content between the first opening bracket '(' 
 * and the last closing bracket ')' including those brackets.
 * @param {string} name - The string to format.
 * @return {string} - The formatted string.
 */
const formatName = (name) => {
    return name.replace(/\(.*\)/, '').trim();
  };
  
  export default formatName;
  