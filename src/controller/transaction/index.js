
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/transaction.json"
export const findAll = async (req, res) => {
    try {
        // Read the invoice data from the JSON file (assuming it's already in the structure you provided)
        const result = await readFile(fileName)
        // Get pagination parameters from the query (default page is 1, itemsPerPage is 20)
        const { page = 1, itemsPerPage = 20 } = req.query;

        // Calculate the total number of pages
        const totalItems = result.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Calculate the start and end indexes for the current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;

        // Get the invoices for the current page
        const paginatedTransactions = result.slice(startIndex, endIndex);

        // Construct the response object
        const response = {
            filters: {
                general: {
                    status: "",
                    type: ""
                },
                paymentDetails: {
                    transactionId: "",
                    originalTransactionId: "",
                    reference: "",
                    currency: "",
                    cardIssuer: "",
                    last4CardDigits: "",
                    terminal: "",
                    terminalType: "",
                    minAmount: null,
                    maxAmount: null,
                    scheduledFrom: "",
                    scheduledTo: ""
                },
                customerDetails: {
                    contact: "",
                    email: "",
                    phone: ""
                },
                location: {
                    store: "",
                    country: "",
                    ipAddress: "",
                    address1: "",
                    address2: "",
                    postCode: "",
                    city: ""
                }
            },
            transactions: paginatedTransactions,
            pagination: {
                currentPage: parseInt(page, 10),
                totalPages: totalPages,
                itemsPerPage: parseInt(itemsPerPage, 10),
            }
        };

        // Send the response back to the client
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching' });
    }
};


export const find = async (req, res) => {
    const id = req.params['id'];
    try {
        const result = await readFile(fileName)
        const transaction = result.find(item => item.id == id);
        const response = {
            transactionAmount: transaction.amount,
            customerDetails: {
                customerId: transaction.customer
            },
            transactionDetails: {
                id: transaction.transactionId,
                date: transaction.date,
                dateToComplete: null,  // Assuming null as per the example
                type: "Cardholder present",  // You can adjust this based on actual data
                terminal: "Padiham AWT",  // You can adjust this based on actual data
                fees: "£0.0300",  // Assuming a fixed fee, can be dynamic if needed
                store: "Padiham",  // Assuming a fixed store name
                settlementStatus: "Settling"  // Assuming a static status for now
            },
            orderDetails: [
                {
                    orderDescription: transaction.description,
                    reference: transaction.reference,
                    subtotal: "£0.83",  // Example, adjust if you have data for this
                    tax: "£0.17",  // Example, adjust accordingly
                    total: transaction.amount,
                    amountToComplete: "£0.00"  // Example, can be dynamic if needed
                }
            ]
        };

        if (transaction) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: ' Not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching' });
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
        res.status(500).json({ message: 'Error adding' });
    }
};

export const update = async (req, res) => {
    const id = req.params['id'];
    const { body } = req;
    try {
        const result = await readFile(fileName)
        const index = result.findIndex(item => item.id === id);
        if (index !== -1) {
            result[index] = { ...result[index], ...body };
            await writeFile(fileName, result)
            res.status(200).json(result[index]);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating' });
    }
};

export const deleteById = async (req, res) => {
    const id = req.params['id'];
    try {
        const result = await readFile(fileName)
        const index = result.findIndex(item => item.id === id);
        if (index !== -1) {
            result.splice(index, 1);
            await writeFile(fileName, result)
            res.status(204).json();  // No content to return after deletion
        } else {
            res.status(404).json({ message: ' Not founddd' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting' });
    }
};
