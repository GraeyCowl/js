// script.js

document.addEventListener('DOMContentLoaded', () => {
    loadShoppingList();
});

function addItem() {
    const itemInput = document.getElementById('itemInput');
    const itemName = itemInput.value.trim();

    if (itemName !== '') {
        const shoppingList = document.getElementById('shoppingList');

        const listItem = document.createElement('li');
        listItem.textContent = itemName;

        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => updateQuantity(listItem, -1);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = '1';
        quantityDisplay.className = 'quantity';

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => updateQuantity(listItem, 1);

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(plusButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.onclick = () => removeItem(listItem);

        listItem.appendChild(quantityControls);
        listItem.appendChild(removeButton);

        shoppingList.appendChild(listItem);

        itemInput.value = '';

        saveShoppingList();
    }
}

function updateQuantity(item, change) {
    const quantityDisplay = item.querySelector('.quantity');
    let quantity = parseInt(quantityDisplay.textContent, 10);
    quantity = Math.max(1, quantity + change); // Ensure quantity is at least 1
    quantityDisplay.textContent = quantity;
    saveShoppingList();
}

function removeItem(item) {
    item.remove();
    saveShoppingList();
}

function saveShoppingList() {
    const shoppingList = [];
    document.querySelectorAll('#shoppingList li').forEach(item => {
        shoppingList.push({
            name: item.firstChild.textContent,
            quantity: parseInt(item.querySelector('.quantity').textContent, 10)
        });
    });
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

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

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;
        quantityDisplay.className = 'quantity';

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => updateQuantity(listItem, 1);

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityDisplay);
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