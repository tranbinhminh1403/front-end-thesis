// formatCPU.jsx

const formatCPU = (cpuDetail) => {
    // Remove ® and ™ symbols, replace '-' with ' ', and convert to lowercase
    cpuDetail = cpuDetail.replace(/®|™/g, '').replace(/-/g, ' ').toLowerCase();

    // Check if the CPU detail contains 'core' or 'intel'
    if (cpuDetail.includes('core') || cpuDetail.includes('intel')) {
        // Find the word starting with 'i' after 'core' or 'intel'
        const match = cpuDetail.match(/(core|int[ea]l)\s+i([0-9])/);
        if (match) {
            return `core i${match[2]}`;
        } else {
            return 'core'; // Default to 'core' if no specific match found
        }
    }
    
    // Check if the CPU detail contains 'ryzen' or 'amd'
    if (cpuDetail.includes('ryzen') || cpuDetail.includes('amd')) {
        // Find the character after 'ryzen' or 'amd'
        const match = cpuDetail.match(/(ryzen|amd)\s+(\w)/);
        if (match) {
            return `${match[1]} ${match[2]}`;
        } else {
            return 'ryzen'; // Default to 'ryzen' if no specific match found
        }
    }

    // Default return the original CPU detail if no specific match found
    return cpuDetail;
};

export default formatCPU;
