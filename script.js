const user = localStorage.getItem('currentUser');
const userDisplay = document.getElementById('user-name');
const form = document.getElementById('product-form');
const table = document.querySelector('#product-table tbody');

if (!user) {
  window.location.href = 'login.html';
}

if (userDisplay) userDisplay.innerText = user;

let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let editIndex = -1;

function renderInventory() {
  table.innerHTML = '';
  inventory.forEach((item, index) => {
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
        <td>${item.category}</td>
        <td>
          <select onchange="updateStatus(${index}, this.value)">
            <option ${item.status === 'Ordered' ? 'selected' : ''}>Ordered</option>
            <option ${item.status === 'Packed' ? 'selected' : ''}>Packed</option>
            <option ${item.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option ${item.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          </select>
        </td>
        <td>
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function saveInventory() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value.trim();
  const status = document.getElementById('status').value;

  const product = { name, quantity, price, category, status };

  if (editIndex === -1) {
    inventory.push(product);
  } else {
    inventory[editIndex] = product;
    editIndex = -1;
  }

  saveInventory();
  renderInventory();
  form.reset();
});

window.deleteProduct = (index) => {
  if (confirm('Are you sure to delete?')) {
    inventory.splice(index, 1);
    saveInventory();
    renderInventory();
  }
};

window.editProduct = (index) => {
  const item = inventory[index];
  document.getElementById('name').value = item.name;
  document.getElementById('quantity').value = item.quantity;
  document.getElementById('price').value = item.price;
  document.getElementById('category').value = item.category;
  document.getElementById('status').value = item.status;
  editIndex = index;
};

window.updateStatus = (index, status) => {
  inventory[index].status = status;
  saveInventory();
};

window.logout = () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
};

renderInventory();
