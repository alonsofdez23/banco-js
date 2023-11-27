import { accountMask, formatCurrency, formatDateShort } from "./utils.js";

 export async function getTransaction() {
    const res = await fetch("http://localhost:3000/transactions");
    const data = await res.json();

    const { transactions } = data;
    const transactionsList = document.querySelector('.transfers');
    transactionsList.innerHTML = '';

    transactions.slice(-2).reverse().forEach(transaction => {
        createTransactionCard(transaction, transactionsList)
    });
}

function createTransactionCard(transaction, parent) {
    const transactionItem = document.createElement('li');
        transactionItem.classList.add('transfer');

        const transactionSection = document.createElement('section');
        transactionSection.classList.add('transfer-details');

        const transactionHeader = document.createElement('header');
        transactionHeader.classList.add('transfer-details-header');

        const transactionFrom = document.createElement('h4');
        transactionFrom.textContent = `De: ${accountMask(transaction.from)}`;

        const transactionTo = document.createElement('h4');
        transactionTo.textContent = `A: ${accountMask(transaction.to)}`;

        const transactionFooter = document.createElement('footer');
        transactionFooter.classList.add('transfer-details-footer');

        const transactionAmount = document.createElement('h4');
        transactionAmount.textContent = `Cantidad: ${formatCurrency(transaction.amount)}`;

        const transactionDate = document.createElement('h4');
        transactionDate.textContent = `Fecha: ${formatDateShort(transaction.date)}`;

        transactionHeader.appendChild(transactionFrom);
        transactionHeader.appendChild(transactionTo);
        transactionFooter.appendChild(transactionAmount);
        transactionFooter.appendChild(transactionDate);
        transactionSection.appendChild(transactionHeader);
        transactionSection.appendChild(transactionFooter);
        transactionItem.appendChild(transactionSection);

        parent.appendChild(transactionItem);
}

getTransaction();