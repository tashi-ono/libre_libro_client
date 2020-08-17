let apiUrl = "";

const apiUrls = {
  production: "https://libre-libro-app.herokuapp.com",
  development: "http://localhost:3000",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
