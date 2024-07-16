let expenses = JSON.parse(sessionStorage.getItem('expenses')) || [];
let totalAmount = sessionStorage.getItem('totalAmount') ? parseFloat(sessionStorage.getItem('totalAmount')) : 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

function saveExpensesToSessionStorage() {
    sessionStorage.setItem('expenses', JSON.stringify(expenses));
    sessionStorage.setItem('totalAmount', totalAmount.toString());
}

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    saveExpensesToSessionStorage();

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    saveExpensesToSessionStorage();
    
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);

        saveExpensesToSessionStorage();
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
});

// Load expenses from sessionStorage on page load
for (const expense of expenses) {
    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expenses.splice(expenses.indexOf(expense), 1);
        expensesTableBody.removeChild(newRow);

        saveExpensesToSessionStorage();
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}

// Update the total amount after loading all expenses
totalAmountCell.textContent = totalAmount;
