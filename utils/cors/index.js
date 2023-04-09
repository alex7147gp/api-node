const cors = require("cors");

const whitelist = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:8080",
  "http://localhost:3000",
  "https://free-market-lucianocavallo.netlify.app",
];

const options = {
  origin: (
    origin,
    callback = (param1, param2) 
  ) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("notallowed access"));
    }
  },
};
  
function corsApi() {
  return cors(options);
}

module.exports = corsApi;
