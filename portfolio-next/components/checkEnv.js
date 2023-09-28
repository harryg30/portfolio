export default function checkEnvironment() {
    let base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.hgordenstein.com"; 
  
    return base_url;
  };
  