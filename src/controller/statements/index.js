
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/statements.json"
 // Ensure you have the correct import for reading the file

export const getStatements = async (req, res) => {
    try {
        // Read the JSON file as an array of statements
        const statements = await readFile(fileName); // Read file content as string

        // Get pagination and filter parameters from the query
        const { page = 1, itemsPerPage = 25, from, to, status = 'Settled' } = req.query;

        // Apply date range filter if 'from' and 'to' are provided
        let filteredStatements = statements;

        if (from && to) {
            filteredStatements = filteredStatements.filter(statement => {
                const clearedDate = new Date(statement.clearedDate);
                const startDate = new Date(from);
                const endDate = new Date(to);
                return clearedDate >= startDate && clearedDate <= endDate;
            });
        }

        // Apply status filter (e.g., 'Settled' as per your requirements)
        if (status) {
            // filteredStatements = filteredStatements.filter(statement => statement.status == status);
        }

        // Pagination logic
        const totalItems = filteredStatements.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;
        const paginatedStatements = filteredStatements.slice(startIndex, endIndex);
        console.log(paginatedStatements); // Debugging log for paginated results

        // Construct the response object
        const response = {
            filters: {
                statementType: ["Wire transfers", "Kashing Invoices", "Other"], // Static list, adjust as needed
                store: "", // Default value, modify if necessary
                status: status || "Settled", // Use the status from query or default to "Settled"
                dateRange: {
                    from: from || "2024-10-01", // Default from date
                    to: to || "2024-11-04" // Default to date
                }
            },
            viewMode: "Simple", // Assuming 'Simple' view mode is always used
            statements: paginatedStatements,
            pagination: {
                currentPage: parseInt(page, 10),
                totalPages: totalPages,
                itemsPerPage: parseInt(itemsPerPage, 10)
            }
        };

        // Send the response back to the client
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message); // Log any errors for debugging
        res.status(500).json({ message: 'Error fetching statements' }); // Return error message
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
