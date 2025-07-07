let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let editIndex = -1;

const form = document.getElementById("inventory-form");
const tableBody = document.querySelector("#inventory-table tbody");
const totalItems = document.getElementById("total-items");
const totalValue = document.getElementById("total-value");

function updateTable() {
  tableBody.innerHTML = "";
  let totalQty = 0, totalVal = 0;

  inventory.forEach((item, index) => {
    const row = tableBody.insertRow();

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price}</td>
      <td>${item.category}</td>
      <td>
        <button class="edit" onclick="editItem(${index})">Edit</button>
        <button class="delete" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;

    totalQty += Number(item.quantity);
    totalVal += item.quantity * item.price;
  });

  totalItems.textContent = totalQty;
  totalValue.textContent = totalVal.toFixed(2);

  localStorage.setItem("inventory", JSON.stringify(inventory));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const quantity = Number(document.getElementById("quantity").value);
  const price = Number(document.getElementById("price").value);
  const category = document.getElementById("category").value.trim();

  if (editIndex === -1) {
    inventory.push({ name, quantity, price, category });
  } else {
    inventory[editIndex] = { name, quantity, price, category };
    editIndex = -1;
    form.querySelector("button").textContent = "Add Item";
  }

  form.reset();
  updateTable();
});

function editItem(index) {
  const item = inventory[index];
  document.getElementById("name").value = item.name;
  document.getElementById("quantity").value = item.quantity;
  document.getElementById("price").value = item.price;
  document.getElementById("category").value = item.category;

  editIndex = index;
  form.querySelector("button").textContent = "Update Item";
}

function deleteItem(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    inventory.splice(index, 1);
    updateTable();
  }
}

// Initial load
updateTable();
