requireRole("admin");

document.getElementById("welcomeUser").textContent = `Olá, ${getUserName()} (admin)`;

const form = document.getElementById('categoryForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  addCategory();
});

function addCategory() {
  const input = document.getElementById("newCategory");
  const newCategory = input.value.trim();

  if (!newCategory) return;

  let categories = JSON.parse(localStorage.getItem("productCategories")) || [];

  if (categories.includes(newCategory)) {
    alert("Esse tipo já existe.");
    return;
  }

  categories.push(newCategory);
  localStorage.setItem("productCategories", JSON.stringify(categories));
  input.value = "";
  renderCategories();
}

function renderCategories() {
  const categoryList = document.getElementById("categoryList");
  const categories = JSON.parse(localStorage.getItem("productCategories")) || [];

  categoryList.innerHTML = "";

  categories.forEach((cat, index) => {
    const row = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = cat;

    const tdActions = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remover";
    removeBtn.onclick = () => {
      categories.splice(index, 1);
      localStorage.setItem("productCategories", JSON.stringify(categories));
      renderCategories();
    };

    tdActions.appendChild(removeBtn);
    row.appendChild(tdName);
    row.appendChild(tdActions);

    categoryList.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", renderCategories);
