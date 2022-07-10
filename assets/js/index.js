const API_URL = "https://sdvhbzk7tl.execute-api.us-west-2.amazonaws.com";

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
};

window.onload = init();
