document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables for total income, total expense, and remaining balance
    let incomes = JSON.parse(sessionStorage.getItem('incomes')) || [];
    let expenses = JSON.parse(sessionStorage.getItem('expenses')) || [];
    let totalIncome = calculateTotal(incomes);
    let totalExpense = calculateTotal(expenses);
    let remainingBalance = totalIncome - totalExpense;

    // Calculate the expense percentage and balance percentage
    let expensePercentage = (totalExpense / totalIncome) * 100;
    let balancePercentage = (remainingBalance / totalIncome) * 100;

    // Update HTML elements with initial values
    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);
    document.getElementById('remaining').textContent = remainingBalance.toFixed(2);
    document.getElementById('expensePercentage').textContent = expensePercentage.toFixed(2) + "%";
    document.getElementById('balancePercentage').textContent = balancePercentage.toFixed(2) + "%";
});

// Function to calculate the total of an array of items
function calculateTotal(items) {
    return items.reduce((total, item) => total + item.amount, 0);
}
