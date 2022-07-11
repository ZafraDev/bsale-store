const API_URL = "https://sdvhbzk7tl.execute-api.us-west-2.amazonaws.com";

const getProducts = async (category = 0, page = 1, limit = 12, search = "") => {
  const products = await fetchGetData(
    `/products/categories/${category}?search=${search}&limit=${limit}&page=${page}`
  );
  return products;
};

const renderProducts = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const products = await getProducts(
    params.category,
    params.page,
    params.limit,
    params.search
  );
  const productList = document.getElementById("products");
  products.items.forEach((product) => {
    const previousPrice = product.discount
      ? product.price / (1 - (product.discount / 100))
      : 0;
    console.log(product.discount , product.price, previousPrice)
    const productItem = document.createElement("article");
    productItem.innerHTML = `<a class="product-container">
      <div class="product-image">
        <img
          draggable="false"
          src="${product.url_image || './assets/images/default-product.jpg'}"
          alt="${product.name}"
        />
      </div>
      <div class="product-info">
        <h2>${product.name}</h2>
        <div class="product-price">
          ${
            previousPrice
              ? '<span class="previous-price">$ ' + previousPrice.toFixed() + "</span>"
              : ""
          }
          <span class="price">$ ${product.price}</span>
        </div>
      </div>
      <div class="product-actions">
        <button class="add-cart-button">Agregar al carrito</button>
      </div>
    </a>`;
    productList.appendChild(productItem);
  });
};

const getCategories = async () => {
  const data = await fetchGetData("/categories");
  return data;
};

const renderCategories = async () => {
  const categories = await getCategories();
  categories.items.unshift({
    id: 0,
    name: "Todas",
  });
  categories.totalItems = categories.items.length;
  const categoryList = document.getElementById("category-list");
  categories.items.forEach((category) => {
    const categoryItem = document.createElement("li");
    categoryItem.className = "category-item";
    categoryItem.innerHTML = `<a href="/?category=${category.id}">${category.name}</a>`;
    categoryList.appendChild(categoryItem);
  });
};

const fetchGetData = async (path) => {
  const URI = `${API_URL}${path}`;
  const response = await fetch(URI);
  const data = await response.json();
  return data;
};

const init = () => {
  renderCategories();
  renderProducts();
};

window.onload = init();
