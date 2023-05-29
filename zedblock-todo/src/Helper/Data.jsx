export const live = {
  url: "https://www.worldwebtrade.com",
  imgUrl: "https://www.worldwebtrade.com/public/image/",
  productImg: "https://www.worldwebtrade.com/public/image/products/",
  companyUrl: "https://www.worldwebtrade.com/public/image/company/",
  planUrl: "https://www.worldwebtrade.com/public/image/membership/",
  gallery: "https://www.worldwebtrade.com/public/image/gallery/",
  trendProduct: "https://www.worldwebtrade.com/public/image/trendingproduct/",
  categorycard: "https://www.worldwebtrade.com/public/image/categorycard/",
  bannerUrl: "https://www.worldwebtrade.com/public/image/banners/",
  logosUrl: "https://www.worldwebtrade.com/public/image/logos/",
  blogImg: "https://www.worldwebtrade.com/public/image/blogs/",
}

export const local = {
  url: "http://localhost:5000",
  imgUrl: "http://localhost:5000/public/image/",
  productImg: "http://localhost:5000/public/image/products/",
  trendProduct: "http://localhost:5000/public/image/trendingproduct/",
  gallery: "http://localhost:5000/public/image/gallery/",
  blogImg: "http://localhost:5000/public/image/blogs/",
  categorycard: "http://localhost:5000/public/image/categorycard/",
  companyUrl: "http://localhost:5000/public/image/company/",
  planUrl: "http://localhost:5000/public/image/membership/",
  bannerUrl: "http://localhost:5000/public/image/banners/",
  logosUrl: "http://localhost:5000/public/image/logos/",
}

export const api =  process.env.NODE_ENV === "development" ? local : live