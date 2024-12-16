
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/stores.json"

export const findAll = async (req, res) => {
    try {
        const filters = req.query; // Filters are passed as query parameters
        const result = await readFile(fileName); // Read the store data
        
        // Apply filters
        let filteredStores = result;

        // Filter by wallet (e.g., ?filter[wallet]=GBP Wallet)
        if (filters.wallet) {
            const walletFilters = filters.wallet.split(',');
            filteredStores = filteredStores.filter(store => 
                walletFilters.includes(store.store.info.wallet.name)
            );
        }

        // Filter by address (e.g., ?filter[address]=London&filter[postCode]=12345)
        if (filters.address) {
            if (filters.address.city) {
                filteredStores = filteredStores.filter(store => 
                    store.store.location.city.toLowerCase().includes(filters.address.city.toLowerCase())
                );
            }
            if (filters.address.postCode) {
                filteredStores = filteredStores.filter(store => 
                    store.store.location.postCode.includes(filters.address.postCode)
                );
            }
            if (filters.address.country) {
                const countries = filters.address.country.split(',');
                filteredStores = filteredStores.filter(store => 
                    countries.includes(store.store.location.country)
                );
            }
        }

        // Filter by date range (e.g., ?filter[dateRange][createdFrom]=2024-01-01&filter[dateRange][toDate]=2024-12-31)
        if (filters.dateRange) {
            const { createdFrom, toDate } = filters.dateRange;
            if (createdFrom) {
                filteredStores = filteredStores.filter(store => 
                    new Date(store.createdAt) >= new Date(createdFrom)
                );
            }
            if (toDate) {
                filteredStores = filteredStores.filter(store => 
                    new Date(store.createdAt) <= new Date(toDate)
                );
            }
        }

        // Search term filter (e.g., ?filter[searchTerm]=Store 88)
        if (filters.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase();
            filteredStores = filteredStores.filter(store => 
                store.store.info.name.toLowerCase().includes(searchTerm)
            );
        }

        // Pagination (optional, for large data sets)
        const currentPage = parseInt(filters.page) || 1;
        const itemsPerPage = parseInt(filters.itemsPerPage) || 25;
        const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
        const paginatedStores = filteredStores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        // Prepare response with filtered and paginated data
        const response = {
            stores: paginatedStores.map(store => ({
                id: store.id,
                name: store.store.info.name,
                wallet: store.store.info.wallet.name,
                balance: "£0.00",  // Placeholder balance
                salesCount: 0,     // Placeholder sales count
                users: 2,          // Placeholder for users
                devices: 1,        // Placeholder for devices
                latestActivity: "2024-10-30" // Placeholder for latest activity
            })),
            filters: {
                wallet: ["GBP Wallet", "USD Wallet", "EUR Wallet"],
                address: {
                    address: "",
                    postCode: "",
                    city: "",
                    country: ["United Kingdom", "United States", "Germany"]
                },
                dateRange: {
                    createdFrom: "",
                    toDate: ""
                },
                searchTerm: filters.searchTerm || ""
            },
            pagination: {
                currentPage,
                totalPages,
                itemsPerPage,
            }
        };

        // Send the filtered and paginated response
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error fetching filtered stores' });
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
