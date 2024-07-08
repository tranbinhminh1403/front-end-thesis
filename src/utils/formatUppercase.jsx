/**
 * Formats a given string by removing all content between the first opening bracket '(' 
 * and the last closing bracket ')' including those brackets.
 * @param {string} string - The string to format.
 * @return {string} - The formatted string.
 */

const formatUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default formatUppercase;