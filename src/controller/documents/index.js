
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/documents.json"
export const findAll = async (req, res) => {
    try {
        // Read the invoice data from the JSON file (assuming invoices.json is structured as provided)
        const result = await readFile(fileName);

        // Get pagination parameters from the query (default page is 1, itemsPerPage is 20)
        const { page = 1, itemsPerPage = 20 } = req.query;

        // Parse invoices from the data (assuming invoices are inside an 'invoices' array)
        let documents = result.map((d, index) => {
            return {
                ...d.newDocument,
                attachment: {
                    ...d.newDocument.attachment,
                    "downloadLink": "https://example.com/download/document1.pdf"
                },
                "actions": {
                    "download": "Download",
                    "delete": index ? true : false
                }
            }
        })

        // Calculate the total number of pages
        const totalItems = documents.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Calculate the start and end indexes for the current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;

        // Get the invoices for the current page
        const paginatedInvoices = documents.slice(startIndex, endIndex);

        // Construct the response object
        const response = {
            documents: paginatedInvoices,
            pagination: {
                currentPage: parseInt(page, 10),
                totalPages: totalPages,
                itemsPerPage: parseInt(itemsPerPage, 10),
            },
        };

        // Send the response back to the client
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching invoices' });
    }
};

export const find = async (req, res) => {
    const id = req.params['id'];
    try {
        const result = await readFile(fileName)
        const data = result.find(item => item.id === id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: ' Not found' });
        }
    } catch (error) {
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
