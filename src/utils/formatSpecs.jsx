const formatSpecs = (specString) => {
    // Replace ": :" with ": "
    specString = specString.replace(/: :/g, ": ");
    
    // Split the string by "||" to get each spec
    const specsArray = specString.split("||");
    
    // Initialize an object to store the formatted specs with default values
    const formattedSpecs = {
      CPU: "không có thông tin",
      RAM: "không có thông tin",
      GPU: "không có thông tin",
      Screen: "không có thông tin",
      Storage: "không có thông tin",
      Weight: "không có thông tin",
      Ports: "không có thông tin",
      OS: "không có thông tin",
      Dimensions: "không có thông tin",
      Color: "không có thông tin"
    };
    
    // Iterate over each spec in the array
    specsArray.forEach(spec => {
      // Split each spec into key and value by the first ": "
      const [key, value] = spec.split(":").map(item => item.trim());
    
      // Standardize keys based on the presence of specific keywords
      let standardizedKey;
      if (key.toLowerCase().includes("cpu") || key.toLowerCase().includes("vxl")) {
        standardizedKey = "CPU";
      } else if (key.toLowerCase().includes("ram")) {
        standardizedKey = "RAM";
      } else if (key.toLowerCase().includes("đồ họa") || key.toLowerCase().includes("card màn hình") || key.toLowerCase().includes("vga")) {
        standardizedKey = "GPU";
      } else if (key.toLowerCase().includes("màn hình") || key.toLowerCase().includes("kích thước màn hình")) {
        standardizedKey = "Screen";
      } else if (key.toLowerCase().includes("ổ cứng")) {
        standardizedKey = "Storage";
      } else if (key.toLowerCase().includes("trọng lượng")) {
        standardizedKey = "Weight";
      } else if (key.toLowerCase().includes("cổng giao tiếp")) {
        standardizedKey = "Ports";
      } else if (key.toLowerCase().includes("hệ điều hành")) {
        standardizedKey = "OS";
      } else if (key.toLowerCase().includes("kích thước")) {
        standardizedKey = "Dimensions";
      } else if (key.toLowerCase().includes("màu sắc")) {
        standardizedKey = "Color";
      } else {
        standardizedKey = key; // Use the original key if no specific keyword matches
      }
    
      // Add the standardized key and value to the formattedSpecs object
      if (value) {
        formattedSpecs[standardizedKey] = value;
      }
    });
    
    return formattedSpecs;
  };
  
  export default formatSpecs;
  