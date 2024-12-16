
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/paymentMethods.json"
export const findAll = async (req, res) => {
    try {
        // Read the data for cards, wallets, and invoice accounts from the respective files
        const cards = await readFile('/paymentMethods.json'); // Assume cards data is stored in 'cards.json'
        const wallets = await readFile('/wallets.json'); // Assume wallet data is stored in 'wallets.json'
        const invoiceAccounts = await readFile('/invoiceAccounts.json'); // Assume invoice data is stored in 'invoiceAccounts.json'

        // Format credit/debit card data
        const creditDebitCards = cards.map(card => {
            return {
                dateAdded: card.dateAdded,
                brand: card.brand,
                type: card.type,
                name: card.name,
                lastDigits: card.lastDigits,
                expiry: card.expiry,
                isDefault: card.isDefault
            };
        });

        // Format kashing wallets data
        const kashingWallets = wallets.map(item => {
            return {
                name: item.wallet.info.name,
                currency: item.wallet.info.currency,
                currentBalance: item.wallet.deposits.currentDeposit,  // Assuming this is the balance
                isDefault: item.wallet.info.isDefault,

            };
        });

        // Format by invoice data
        const byInvoice = invoiceAccounts.map(account => {
            return {
                accountName: account.accountName,
                accountNumber: account.accountNumber,
                sortCode: account.sortCode,
                isDefault: account.isDefault
            };
        });

        // Construct the response in the required format
        const response = {
            paymentMethods: {
                creditDebitCards,
                kashingWallets,
                byInvoice
            }
        };

        // Send the response back to the client
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching payment methodsdd' });
    }
};


export const add = async (req, res) => {
    const { body } = req;
    try {
        const result = await readFile(fileName)
        const randomId = crypto.randomUUID();  // This generates a unique UUID v4
        body.id = randomId;
        result.push(body);
        await writeFile(fileName, result)
        res.status(201).json(body);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error adding' });
    }
};

export const update = async (req, res) => {

    try {

        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: 'Error updating' });
    }
};
