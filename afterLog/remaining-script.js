document.addEventListener('DOMContentLoaded', function () {
    // Retrieve incomes and expenses from sessionStorage
    let incomes = JSON.parse(sessionStorage.getItem('incomes')) || [];
    let expenses = JSON.parse(sessionStorage.getItem('expenses')) || [];

    // Calculate totals for incomes and expenses
    let totalIncome = calculateTotal(incomes);
    let totalExpense = calculateTotal(expenses);
    let remainingBalance = totalIncome - totalExpense;

    // Calculate percentages, handle division by zero
    let expensePercentage = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
    let balancePercentage = totalIncome > 0 ? (remainingBalance / totalIncome) * 100 : 0;

    // Update the UI with the calculated values
    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);
    document.getElementById('remain').textContent = remainingBalance.toFixed(2);
    document.getElementById('expensePercentage').textContent = expensePercentage.toFixed(2) + "%";
    document.getElementById('balancePercentage').textContent = balancePercentage.toFixed(2) + "%";
});

// Function to calculate the total amount from an array of items
function calculateTotal(items) {
    return items.reduce((total, item) => total + parseFloat(item.amount), 0);
}
