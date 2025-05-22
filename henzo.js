const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');

let editIndex = null;

window.addEventListener('load', () => {
  carregarCategorias();
  carregarProdutos();
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value).toFixed(2);
  const quantity = document.getElementById('quantity').value;
  const category = document.getElementById('productType').value;

  if (!name || !price || !quantity || !category) return;

  const product = { name, price, quantity, category };

  if (editIndex !== null) {
    updateProduct(editIndex, product);
    editIndex = null;
  } else {
    addProduct(product);
  }

  form.reset();
  salvarProdutos();
});

function addProduct(product) {
  const row = criarLinhaProduto(product);
  tableBody.appendChild(row);
}

function criarLinhaProduto(product) {
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
    loadProductToForm(row);
  });

  row.querySelector('.delete-btn').addEventListener('click', () => {
    const index = Array.from(tableBody.children).indexOf(row);
    tableBody.removeChild(row);
    removerProduto(index);
  });

  return row;
}

function loadProductToForm(row) {
  const cells = row.querySelectorAll('td');
  document.getElementById('name').value = cells[0].textContent;
  document.getElementById('price').value = cells[1].textContent.replace('R$ ', '').replace(',', '.');
  document.getElementById('quantity').value = cells[2].textContent;
  document.getElementById('productType').value = cells[3].textContent;

  editIndex = Array.from(tableBody.children).indexOf(row);
}

function updateProduct(index, updated) {
  const row = tableBody.children[index];

  row.innerHTML = `
    <td>${updated.name}</td>
    <td>R$ ${updated.price}</td>
    <td>${updated.quantity}</td>
    <td>${updated.category}</td>
    <td>
      <button class="edit-btn">Editar</button>
      <button class="delete-btn">Remover</button>
    </td>
  `;

  row.querySelector('.edit-btn').addEventListener('click', () => {
    loadProductToForm(row);
  });

  row.querySelector('.delete-btn').addEventListener('click', () => {
    const idx = Array.from(tableBody.children).indexOf(row);
    tableBody.removeChild(row);
    removerProduto(idx);
  });

  const produtos = obterProdutos();
  produtos[index] = updated;
  localStorage.setItem('products', JSON.stringify(produtos));
}

function obterProdutos() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

function salvarProdutos() {
  const produtos = Array.from(tableBody.children).map(row => {
    const cells = row.querySelectorAll('td');
    return {
      name: cells[0].textContent,
      price: cells[1].textContent.replace('R$ ', ''),
      quantity: cells[2].textContent,
      category: cells[3].textContent
    };
  });
  localStorage.setItem('products', JSON.stringify(produtos));
}

function removerProduto(index) {
  const produtos = obterProdutos();
  produtos.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(produtos));
}

function carregarProdutos() {
  const produtos = obterProdutos();
  produtos.forEach(prod => {
    const row = criarLinhaProduto(prod);
    tableBody.appendChild(row);
  });
}

function carregarCategorias() {
  const categorias = JSON.parse(localStorage.getItem('productCategories')) || [];
  const tipoSelect = document.getElementById('productType');

  tipoSelect.innerHTML = "<option value='' disabled selected>Selecione um tipo</option>";
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    tipoSelect.appendChild(option);
    option.style.color = "#000"
  });
}

