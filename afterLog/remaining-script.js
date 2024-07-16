document.addEventListener('DOMContentLoaded', function () {
    
    let incomes = JSON.parse(sessionStorage.getItem('incomes')) || [];
    let expenses = JSON.parse(sessionStorage.getItem('expenses')) || [];
    let totalIncome = calculateTotal(incomes);
    let totalExpense = calculateTotal(expenses);
    let remainingBalance = totalIncome - totalExpense;

    
    let expensePercentage = (totalExpense / totalIncome) * 100;
    let balancePercentage = (remainingBalance / totalIncome) * 100;

    
    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);
    document.getElementById('remaining').textContent = remainingBalance.toFixed(2);
    document.getElementById('expensePercentage').textContent = expensePercentage.toFixed(2) + "%";
    document.getElementById('balancePercentage').textContent = balancePercentage.toFixed(2) + "%";
});


function calculateTotal(items) {
    return items.reduce((total, item) => total + item.amount, 0);
}
