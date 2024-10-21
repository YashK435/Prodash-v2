let transactions = [];
let balance = 0;
let income = 0;
let expenses = 0;
let savings = 0;
const balanceElement = document.getElementById("balance");
const transactionsTable = document
  .getElementById("transactionsTable")
  .getElementsByTagName("tbody")[0];
const transactionForm = document.getElementById("transactionForm");
const submitBtn = document.getElementById("submitBtn");
const ctx = document.getElementById("transactionChart").getContext("2d");
let chart;

function loadTransactions() {
  const storedTransactions = localStorage.getItem("transactions");
  if (storedTransactions) {
    transactions = JSON.parse(storedTransactions);
    calculateTotals();
    updateAll();
  }
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function calculateTotals() {
  income = expenses = savings = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "income") income += transaction.amount;
    else if (transaction.type === "expense") expenses += transaction.amount;
    else if (transaction.type === "savings") savings += transaction.amount;
  });
  balance = income - expenses - savings;
}

function updateBalance() {
  balanceElement.textContent = balance.toFixed(2);
}

function updateTable() {
  transactionsTable.innerHTML = "";
  transactions.forEach((transaction, index) => {
    const row = transactionsTable.insertRow();
    row.insertCell(0).textContent = transaction.date;
    row.insertCell(1).textContent = transaction.description;
    row.insertCell(2).textContent = transaction.type;
    row.insertCell(3).textContent = `₹ ${transaction.amount.toFixed(2)}`;

    const actionsCell = row.insertCell(4);
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editTransaction(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTransaction(index);

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);
  });
}

function updateChart() {
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expenses", "Savings"],
      datasets: [
        {
          data: [income, expenses, savings],
          backgroundColor: ["#4CAF50", "#f44336", "#2196F3"],
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Income vs Expenses vs Savings",
      },
    },
  });
}

function updateAll() {
  updateBalance();
  updateTable();
  updateChart();
}

function addTransaction(transaction) {
  transactions.push(transaction);
  calculateTotals();
  updateAll();
  saveTransactions();
}

function editTransaction(index) {
  const transaction = transactions[index];
  document.getElementById("date").value = transaction.date;
  document.getElementById("type").value = transaction.type;
  document.getElementById("description").value = transaction.description;
  document.getElementById("amount").value = transaction.amount;
  document.getElementById("editIndex").value = index;
  submitBtn.textContent = "Update";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  calculateTotals();
  updateAll();
  saveTransactions();
}

document.getElementById("amount").addEventListener("input", function () {
  const type = document.getElementById("type").value;
  const amount = parseFloat(this.value) || 0;
  const editIndex = document.getElementById("editIndex").value;

  let tempIncome = income;
  let tempExpenses = expenses;
  let tempSavings = savings;

  if (editIndex !== "") {
    const oldTransaction = transactions[editIndex];
    if (oldTransaction.type === "income") tempIncome -= oldTransaction.amount;
    else if (oldTransaction.type === "expense")
      tempExpenses -= oldTransaction.amount;
    else if (oldTransaction.type === "savings")
      tempSavings -= oldTransaction.amount;
  }

  if (type === "income") tempIncome += amount;
  else if (type === "expense") tempExpenses += amount;
  else if (type === "savings") tempSavings += amount;

  const tempBalance = tempIncome - tempExpenses - tempSavings;

  balanceElement.textContent = tempBalance.toFixed(2);

  if (chart) {
    chart.data.datasets[0].data = [tempIncome, tempExpenses, tempSavings];
    chart.update();
  }
});

transactionForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const editIndex = document.getElementById("editIndex").value;
  const transaction = {
    date: document.getElementById("date").value,
    type: document.getElementById("type").value,
    description: document.getElementById("description").value,
    amount: parseFloat(document.getElementById("amount").value),
  };

  if (editIndex !== "") {
    // Update existing transaction
    transactions[editIndex] = transaction;
    document.getElementById("editIndex").value = "";
    submitBtn.textContent = "Add";
  } else {
    // Add new transaction
    addTransaction(transaction);
  }

  calculateTotals();
  updateAll();
  saveTransactions();
  transactionForm.reset();
});

// Load transactions when the page loads
loadTransactions();
function visit_home() {
  window.open("./home.html", "_self");
}
function visit_git() {
  window.open("https://github.com/YashK435/Prodash-v2.git", "_self");
}
function visit_drawing() {
  window.open("./drawing-board.html", "_self");
}
function visit_notes() {
  window.open("./Notes.html", "_self");
}
function visit_weather() {
  window.open("./weather.html", "_self");
}
function visit_todo() {
  window.open("./todo.html", "_self");
}
function visit_subs() {
  window.open("./Subscription.html", "_self");
}
function visit_finance(){
  window.open("./finance.html", "_self");
}
function visit_habit(){
  window.open("./habit.html", "_self");
}