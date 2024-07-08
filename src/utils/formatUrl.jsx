/**
 * @param {string} string - The string to format.
 * @return {string} - The formatted string.
 */
const formatUrl = (string) => {
    const baseUrl = 'https://www.phucanh.vn';
    if (string.startsWith('/')) {
        return baseUrl + string;
    }
    return string;
};

export default formatUrl;
