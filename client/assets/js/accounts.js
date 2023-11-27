import { accountFormat, formatCurrency, translateToSpanish } from "./utils.js";

export async function createAccounts() {
    const data = await fetch("http://localhost:3000/accounts")
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err));
    const { accounts } = data;
    const selectFrom = document.querySelector('[data-id="dropdown-field-from"]');
    const selectTo = document.querySelector('[data-id="dropdown-field-to"]');

    selectFrom.innerHTML = '';
    selectTo.innerHTML = '';

    accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.accountNumber;

        option.textContent = account.accountNumber;
        option.dataset.type = account.accountType;
        option.dataset.balance = account.balance;
        option.dataset.currency = account.currency;

        selectFrom.appendChild(option);
        selectTo.appendChild(option.cloneNode(true));

        selectFrom.addEventListener('change', changeAccount);
        selectTo.addEventListener('change', changeAccount);
    });
    changeAccount();
    createListOfAccountCards(accounts);
}

function changeAccount(event) {
    const selectFrom = document.querySelector('[data-id="dropdown-field-from"]');
    const selectTo = document.querySelector('[data-id="dropdown-field-to"]');

    if (!event) {
        selectTo.selectedIndex = Array.from(selectFrom.options).findIndex(option => option.value !== selectFrom.value);
        return
    }
    
    const opositeSelect = event.target === selectFrom ? selectTo : selectFrom;
    const selectedIndex = Array.from(event.target.options).findIndex(option => option.value !== event.target.value);
    opositeSelect.selectedIndex = selectedIndex;

    changeAccountCardsOrder(selectFrom, selectTo);
}

function changeAccountCardsOrder(selectedFrom, selectedTo) {
    const accountsList = document.querySelector('.tiles');
    const accounts = Array.from(accountsList.children);
    const accountFrom = accounts.find(account => account.dataset.number === selectedFrom.value);
    const accountTo = accounts.find(account => account.dataset.number === selectedTo.value);
    accountsList.insertBefore(accountFrom, accountTo);
}

function createListOfAccountCards(accounts) {
    const accountsList = document.querySelector('.tiles');
    accountsList.innerHTML = '';
    accounts.forEach(account => {
        const card = createCard(account);
        accountsList.appendChild(card);
    });
}

function createCard(account) {
    const card = document.createElement('li');
        const header = document.createElement('header');
        const icon = document.createElement('i');
        const title = document.createElement('h3');
        const number = document.createElement('span');
        const balance = document.createElement('span');
        const type = document.createElement('span');

        card.classList.add('tile');
        card.dataset.number = account.accountNumber;

        header.classList.add('tile-header');
        icon.classList.add('fas', account.accountType === 'savings' ? 'fa-piggy-bank' : 'fa-wallet');

        balance.textContent = formatCurrency(account.balance);
        number.textContent = accountFormat(account.accountNumber);
        TypeError.textContent = translateToSpanish(account.accountType);

        title.appendChild(balance);
        title.appendChild(number);
        header.appendChild(icon);
        header.appendChild(title);
        card.appendChild(header);
        card.appendChild(type);

        return card;
}

createAccounts();