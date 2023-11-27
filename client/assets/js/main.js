import { createAccounts } from "./accounts.js";
import { getTransaction } from "./transactions.js";
import { transfer } from "./transfer.js";

const spinner = document.querySelector('.spinner');

async function loadData() {
    await createAccounts();
    await getTransaction();
}
document.getElementById('transfer-button').addEventListener('click', () => {
    spinner.classList.remove('hidden');
    setTimeout(async () => {
        await transfer();
        spinner.classList.add('hidden');
    }, 1000);
});

loadData().then(() => spinner.classList.add('hidden'))