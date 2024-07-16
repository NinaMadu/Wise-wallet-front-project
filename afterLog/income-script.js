
	// Get form, income list, and total income amount elements 
    const incomeForm = 
    document.getElementById("income-form"); 
    const incomeList = 
    document.getElementById("Income-list"); 
    const totalIncomeAmountElement = 
    document.getElementById("total-income-amount"); 

    
    // Initialize Income array from localStorage 
let incomes = 
JSON.parse(localStorage.getItem("incomes")) || []; 

// Function to render incomes in tabular form 
function renderIncomes() { 

	// Clear income list 
	incomeList.innerHTML = ""; 

	// Initialize total Income amount 
	let totalIncomeAmount = 0; 

	// Loop through income array and create table rows 
	for (let i = 0; i < incomes.length; i++) { 
		const income = incomes[i]; 
		const incomeRow = document.createElement("tr"); 
		incomeRow.innerHTML = ` 
	<td>${income.name}</td> 
	<td>$${income.amount}</td> 
	<td class="in-delete-btn" in-data-id="${i}">Delete</td> 
	`; 
		incomeList.appendChild(incomeRow); 

		// Update total income amount 
		totalIncomeAmount += income.amount; 
	} 

	// Update total income amount display 
	totalIncomeAmountElement.textContent = 
		totalIncomeAmount.toFixed(2); 

        //save total income to localStorage

        localStorage.setItem("totalIncome",JSON.stringify(totalIncomeAmount));

	// Save incomes to localStorage 
	localStorage.setItem("incomes", 
		JSON.stringify(incomes)); 

		
} 


// Function to add income 
function addIncome(event) { 
	event.preventDefault(); 

	// Get income name and amount from form 
	const incomeNameInput = 
		document.getElementById("income-name"); 
	const incomeAmountInput = 
		document.getElementById("income-amount"); 
	const incomeName = 
	     incomeNameInput.value; 
	const incomeAmount = 
		parseFloat(incomeAmountInput.value); 

	// Clear form inputs 
	incomeNameInput.value = ""; 
	incomeAmountInput.value = ""; 

	// Validate inputs 
	if (incomeName === "" || isNaN(incomeAmount)) { 
		alert("Please enter valid income details."); 
		return; 
	} 

	// Create new income object 
	const income = { 
		name: incomeName, 
		amount: incomeAmount, 
	}; 

	// Add income to incomes array 
	incomes.push(income); 

	// Render incomes 
	renderIncomes(); 
} 

// Function to delete incomes 
function deleteIncomes(event) { 
	if (event.target.classList.contains("in-delete-btn")) { 

		// Get incomes index from data-id attribute 
		const incomeIndex = 
			parseInt(event.target.getAttribute("in-data-id")); 

		// Remove incomes from expenses array 
		incomes.splice(incomeIndex, 1); 

		// Render incomes 
		renderIncomes(); 
	} 
} 


// Add event listeners for incomes
incomeForm.addEventListener("submit", addIncome); 
incomeList.addEventListener("click", deleteIncomes); 



renderIncomes();
