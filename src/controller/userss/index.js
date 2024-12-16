
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/users.json"
export const findAll = async (req, res) => {
    try {
        // Sample user data (This could be read from a file or database)
        const userData =  await readFile(fileName)

        // Get pagination and filter parameters from the query
        const { page = 1, itemsPerPage = 25 } = req.query;

        // Calculate total number of pages
        const totalItems = userData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Ensure the current page is a valid number within the range
        const currentPage = Math.min(Math.max(1, page), totalPages);

        // Calculate the start and end index for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;

        // Get the slice of users for the current page
        const paginatedUsers = userData.slice(startIndex, endIndex);

        // Construct the response
        const response = {
            addNewUserButton: {
                label: "Add a New User",
                tooltip: "Click to add a new user"
            },
            users: paginatedUsers.map(user => {
                return {
                    name: user.userInfo.name,
                    userType: "Store Employee",  // This can be adjusted if needed
                    since: new Date().toISOString(),  // This could be the date when the user was created
                    stores: user.storePermissions.stores.length,
                    currentStore: user.storePermissions.stores[0].storeName,  // Assuming the first store is the primary one
                    latestActivity: new Date().toISOString(),  // Current time as the latest activity
                    actions: {
                        edit: {
                            tooltip: "Edit user information"
                        },
                        delete: {
                            tooltip: "Delete user"
                        }
                    }
                };
            }),
            pagination: {
                currentPage: currentPage,
                totalPages: totalPages,
                itemsPerPage: parseInt(itemsPerPage, 10),
                totalItems: totalItems
            }
        };

        // Send the response
        res.status(200).json(response);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching users' });
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
            res.status(404).json({ message: ' Not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting' });
    }
};
