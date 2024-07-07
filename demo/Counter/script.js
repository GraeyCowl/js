// script.js

// Event listener to load the shopping list from localStorage when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadShoppingList();
});

// Function to add an item to the shopping list
function addItem() {
    const itemInput = document.getElementById('itemInput');
    const itemName = itemInput.value.trim();

    // Ensure the item name is not empty
    if (itemName !== '') {
        const shoppingList = document.getElementById('shoppingList');

        // Create list item element
        const listItem = document.createElement('li');
        listItem.textContent = itemName;

        // Create quantity controls container
        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';

        // Create minus button
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => updateQuantity(listItem, -1);

        // Create quantity input field
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'quantity-input';
        quantityInput.value = 1;
        quantityInput.onchange = () => saveShoppingList();

        // Create plus button
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => updateQuantity(listItem, 1);

        // Append buttons and input field to the quantity controls container
        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityInput);
        quantityControls.appendChild(plusButton);

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.onclick = () => removeItem(listItem);

        // Append quantity controls and remove button to the list item
        listItem.appendChild(quantityControls);
        listItem.appendChild(removeButton);

        // Append the list item to the shopping list
        shoppingList.appendChild(listItem);

        // Clear the input field
        itemInput.value = '';

        // Save the updated shopping list to localStorage
        saveShoppingList();
    }
}

// Function to update the quantity of an item
function updateQuantity(item, change) {
    const quantityInput = item.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value, 10);
    // Ensure quantity is at least 1
    quantity = Math.max(1, quantity + change);
    quantityInput.value = quantity;
    // Save the updated shopping list to localStorage
    saveShoppingList();
}

// Function to remove an item from the shopping list
function removeItem(item) {
    item.remove();
    // Save the updated shopping list to localStorage
    saveShoppingList();
}

// Function to save the shopping list to localStorage
function saveShoppingList() {
    const shoppingList = [];
    // Loop through each list item and get the item name and quantity
    document.querySelectorAll('#shoppingList li').forEach(item => {
        shoppingList.push({
            name: item.firstChild.textContent,
            quantity: parseInt(item.querySelector('.quantity-input').value, 10)
        });
    });
    // Save the shopping list array to localStorage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Function to load the shopping list from localStorage
function loadShoppingList() {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;

        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => updateQuantity(listItem, -1);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'quantity-input';
        quantityInput.value = item.quantity;
        quantityInput.onchange = () => saveShoppingList();

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => updateQuantity(listItem, 1);

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityInput);
        quantityControls.appendChild(plusButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.onclick = () => removeItem(listItem);

        listItem.appendChild(quantityControls);
        listItem.appendChild(removeButton);

        document.getElementById('shoppingList').appendChild(listItem);
    });
}

// Function to export the shopping list to a spreadsheet
function exportToSpreadsheet() {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const worksheet = XLSX.utils.json_to_sheet(shoppingList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shopping List');
    XLSX.writeFile(workbook, 'shopping_list.xlsx');
}