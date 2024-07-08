// formatVGA.jsx

const formatVGA = (vgaDetail) => {
    // Replace "-", ®, and ™ with " "
    vgaDetail = vgaDetail.replace(/-|®|™/g, ' ');

    // Replace consecutive spaces with a single space
    vgaDetail = vgaDetail.replace(/\s+/g, ' ').trim();

    // Check if the VGA detail contains 'amd'
    if (vgaDetail.toLowerCase().includes('amd')) {
        return 'amd';
    }

    // Check if the VGA detail contains 'nvidia' or 'geforce'
    if (vgaDetail.toLowerCase().includes('nvidia') || vgaDetail.toLowerCase().includes('geforce')) {
        // Find the word after 'rtx'
        const match = vgaDetail.match(/rtx\s+(\w+)/i);
        if (match) {
            return `nvidia ${match[1]}`;
        } else {
            return 'nvidia'; // Default to 'nvidia' if no specific match found
        }
    }

    // Default return the original VGA detail if no specific match found
    return vgaDetail;
};

export default formatVGA;
