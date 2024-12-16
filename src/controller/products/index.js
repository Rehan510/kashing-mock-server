
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/products.json"

export const findAll = async (req, res) => {
    try {
        // Read the devices data from the JSON file
        const result = await readFile(fileName);

        // Get pagination and filter parameters from the query
        const { page = 1, itemsPerPage = 20, status, store } = req.query;

        // Apply filters dynamically
        let filteredDevices = result;

        // Filter by status if provided
        if (status) {
            filteredDevices = filteredDevices.filter(device => device.status === status);
        }

        // Filter by store if provided
        if (store) {
            filteredDevices = filteredDevices.filter(device => device.store === store);
        }

        // Mapping the result to the desired format
        let devices = filteredDevices.map((d) => {
            return {
                id: d.id,
                status: d.status,
                name: d.name,
                lastSeen: d.lastSeen,
                serialNumber: d.serialNumber,
                store: d.store,
                salesToday: {
                    amount: d.salesToday.amount,
                    count: d.salesToday.count,
                },
                stock: d.stock,
                actions: {
                    edit: d.actions.edit,
                    delete: d.actions.delete,
                },
            };
        });

        // Calculate the total number of pages
        const totalItems = devices.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Calculate the start and end indexes for the current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(page * itemsPerPage, totalItems); // Cap the endIndex to totalItems

        // Get the devices for the current page
        const paginatedDevices = devices.slice(startIndex, endIndex);

        // Construct the response object
        const response = {
            devices: paginatedDevices,
            filters: {
                status: ["Online", "Offline", "Maintenance"], // Add more filter options if needed
                store: store || "", // Filter by store if provided
                assetType: "",
                simNumber: "",
                description: "",
                position: "",
            },
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
        res.status(500).json({ message: 'Error fetching devices' });
    }
};



export const find = async (req, res) => {
    const id = req.params['id']; // Get device ID from the URL parameters
    try {
        // Read the devices data from the JSON file
        const result = await readFile(fileName);

        // Find the device by ID
        const device = result.find(item => item.id == id);
        console.log(device,id)

        if (device) {
            // Return the device details in the desired format
            const response = {
                deviceInfo: {
                    assetInformation: {
                        assetType: "Survey",  // Static value or get dynamically if available
                        serialNumber: device.serialNumber,
                        kashingId: device.id,
                        customId: null,  // Assuming this is not available in your data
                        terminalId: "R0037374",  // Static value or dynamically set if available
                    },
                    organisation: {
                        name: "PARK GARAGE GROUP PLC",  // Static value or dynamically set
                        store: device.store,  // Dynamically set store name from device
                    },
                    network: {
                        imei: "869492050104195",  // Static value or get dynamically
                        iccid: "89882280666200573287",  // Static value or get dynamically
                        macAddress: "e4:5f:01:0d:dc:4a",  // Static value or get dynamically
                        mobileNetwork: "10.33.64.131",  // Static value or get dynamically
                        ethernet: "169.254.159.161",  // Static value or get dynamically
                    },
                    signal: {
                        uptime: "About 14 hours",  // Static value or get dynamically
                        lastSeen: "2022-11-24",  // Static value or get dynamically
                        battery: false,  // Static value or get dynamically
                        connectivity: "0%",  // Static value or get dynamically
                    }
                },
                status: device.status // Dynamically set device status
            };

            // Send the response back to the client
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'Device not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching device' });
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
