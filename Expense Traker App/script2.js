let incomes = JSON.parse(sessionStorage.getItem('incomes')) || [];
let totalIncome = sessionStorage.getItem('totalIncome') ? parseFloat(sessionStorage.getItem('totalIncome')) : 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const incomeTableBody = document.getElementById('income-table-body');
const totalAmountCell = document.getElementById('total-amount');

function saveIncomesToSessionStorage() {
    sessionStorage.setItem('incomes', JSON.stringify(incomes));
    sessionStorage.setItem('totalIncome', totalIncome.toString());
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

    const income = { category, amount, date };
    incomes.push(income);
    saveIncomesToSessionStorage();

    totalIncome += amount;
    totalAmountCell.textContent = totalIncome;

    saveIncomesToSessionStorage();

    const newRow = incomeTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        incomes.splice(incomes.indexOf(income), 1);

        totalIncome -= income.amount;
        totalAmountCell.textContent = totalIncome;

        incomeTableBody.removeChild(newRow);

        saveIncomesToSessionStorage();
    });

    categoryCell.textContent = income.category;
    amountCell.textContent = income.amount;
    dateCell.textContent = income.date;
    deleteCell.appendChild(deleteBtn);
});

// Load incomes from sessionStorage on page load
for (const income of incomes) {
    const newRow = incomeTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        totalIncome -= income.amount;
        totalAmountCell.textContent = totalIncome;

        incomes.splice(incomes.indexOf(income), 1);
        incomeTableBody.removeChild(newRow);

        saveIncomesToSessionStorage();
    });

    categoryCell.textContent = income.category;
    amountCell.textContent = income.amount;
    dateCell.textContent = income.date;
    deleteCell.appendChild(deleteBtn);
}

// Update the total amount after loading all incomes
totalAmountCell.textContent = totalIncome;
