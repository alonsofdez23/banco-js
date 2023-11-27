export const transfer = async () => {
    const from = document.querySelector('[data-id="dropdown-field-from"]');
    const to = document.querySelector('[data-id="dropdown-field-to"]');
    const amount = document.getElementById('amount');
    const balance = document.querySelector('[data-id="dropdown-field-from"] option:checked').dataset.balance;

    if (amount.value.trim() === '') {
        alert('Debe ingresar una cantidad');
        amount.focus();
        return;
    }

    if (parseFloat(amount.value) > parseFloat(balance)) {
        alert('No tiene saldo suficiente');
        amount.focus();
        return;
    }

    const data = {
        from: from.value,
        to: to.value,
        amount: parseFloat(amount.value),
        currency: 'EUR'
    }

    fetch('http://localhost:3000/transfer', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(res => {
            res.json();
        })
        .catch(err => {
            console.error("res.json() can't be parsed because fetch mode is no-cors")
        })
        .then(data => {
            amount.value = '';
        })
}

document.getElementById('transfer-button').addEventListener('click', transfer)