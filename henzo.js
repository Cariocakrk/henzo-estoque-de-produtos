const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');

let editIndex = null;

// Carrega categorias em select #category
function carregarCategorias() {
  const categorias = JSON.parse(localStorage.getItem("productCategories")) || [];
  const select = document.getElementById("category");
  if (!select) return;

  select.innerHTML = "<option value='' disabled selected>Selecione um tipo</option>";

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// Carrega produtos do localStorage e exibe na tabela
function carregarProdutos() {
  const produtos = JSON.parse(localStorage.getItem("products")) || [];
  tableBody.innerHTML = "";

  produtos.forEach((product, index) => {
    const row = criarLinhaProduto(product, index);
    tableBody.appendChild(row);
  });
}

function criarLinhaProduto(product, index) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${product.name}</td>
    <td>R$ ${product.price}</td>
    <td>${product.quantity}</td>
    <td>${product.category}</td>
    <td>
      <button class="edit-btn">Editar</button>
      <button class="delete-btn">Remover</button>
    </td>
  `;

  row.querySelector('.edit-btn').addEventListener('click', () => {
    loadProductToForm(index);
  });

  row.querySelector('.delete-btn').addEventListener('click', () => {
    removerProduto(index);
  });

  return row;
}

function loadProductToForm(index) {
  const produtos = JSON.parse(localStorage.getItem("products")) || [];
  const product = produtos[index];

  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('quantity').value = product.quantity;
  document.getElementById('category').value = product.category;

  editIndex = index;
}

function removerProduto(index) {
  let produtos = JSON.parse(localStorage.getItem("products")) || [];
  produtos.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(produtos));
  carregarProdutos();
  if(editIndex === index) {
    form.reset();
    editIndex = null;
  }
}

function salvarProdutos(produtos) {
  localStorage.setItem("products", JSON.stringify(produtos));
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value).toFixed(2);
  const quantity = document.getElementById('quantity').value;
  const category = document.getElementById('category').value;

  if (!name || !price || !quantity || !category) return;

  let produtos = JSON.parse(localStorage.getItem("products")) || [];

  if (editIndex !== null) {
    produtos[editIndex] = { name, price, quantity, category };
    editIndex = null;
  } else {
    produtos.push({ name, price, quantity, category });
  }

  salvarProdutos(produtos);
  form.reset();
  carregarProdutos();
});

window.addEventListener('load', () => {
  carregarCategorias();
  carregarProdutos();
});
