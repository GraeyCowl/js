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

        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => updateQuantity(listItem, -1);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'quantity-input';
        quantityInput.value = 1;
        quantityInput.onchange = () => saveShoppingList();

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => updateQuantity(listItem, 1);

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantityInput);
        quantityControls.appendChild(plusButton);

        listItem.appendChild(quantityControls);
        listItem.appendChild(document.createTextNode(itemName));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.onclick = () => removeItem(listItem);

        listItem.appendChild(removeButton);

        shoppingList.appendChild(listItem);

        itemInput.value = '';

        saveShoppingList();
    }
}

function updateQuantity(item, change) {
    const quantityInput = item.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value, 10);
    quantity = Math.max(1, quantity + change); // Ensure quantity is at least 1
    quantityInput.value = quantity;
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
            name: item.childNodes[1].textContent,
            quantity: parseInt(item.querySelector('.quantity-input').value, 10)
        });
    });
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function loadShoppingList() {
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    shoppingList.forEach(item => {
        const listItem = document.createElement('li');

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

        listItem.appendChild(quantityControls);
        listItem.appendChild(document.createTextNode(item.name));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.onclick = () => removeItem(listItem);

        listItem.appendChild(removeButton);

        document.getElementById('shoppingList').appendChild(listItem);
    });
}
