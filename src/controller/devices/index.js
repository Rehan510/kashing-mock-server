
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/devices.json"

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
export const statusHistory = async (req, res) => {
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
        let devices =  [
                {
                    "timestamp": "2024-11-04 14:32:07",
                    "status": "Online",
                    "description": "Heartbeat"
                },
                {
                    "timestamp": "2024-11-04 14:22:06",
                    "status": "Online",
                    "description": "Heartbeat"
                },
                {
                    "timestamp": "2024-11-04 11:58:15",
                    "status": "Online",
                    "description": "System ONLINE"
                },
                {
                    "timestamp": "2024-11-04 10:58:15",
                    "status": "Online",
                    "description": "Kashing Agent successfully initialised - v1.0.0 [Build 1]"
                }
                // Additional status entries...
            ]

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
            statusHistory: paginatedDevices,
        
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


export const findAllStocks = async (req, res) => {
    try {
        // Read the devices data from the JSON file
        const result = await readFile(fileName);
        // Construct the response object
        const response = {
            "productStocks": [
                {
                    "position": 1,
                    "product": "",
                    "itemsPerSale": 1,
                    "currentStock": 0,
                    "price": "£0.00",
                    "latestReconciliation": null,
                    "actions": {
                        "setProduct": true,
                        "delete": true
                    }
                }
                // Additional product entries if available...
            ],
            "actions": [
                {
                    "action": "save",
                    "label": "Save",
                    "tooltip": "Save the product configurations"
                },
                {
                    "action": "setProduct",
                    "label": "Set Product",
                    "tooltip": "Associate a product with this position"
                }
            ]
        }



        // Send the response back to the client
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching devices' });
    }
};
export const updateAllStocks = async (req, res) => {
    const { body } = req;
    try {
        // Read the devices data from the JSON file
        const result = await readFile(fileName);
        // Construct the response object
        const response = body
        // Send the response back to the client
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching devices' });
    }
};
export const findAllSales = async (req, res) => {
    const { body } = req;
    try {
        // Read the devices data from the JSON file
        const result = await readFile(fileName);
        // Construct the response object
        const response = {
            "salesSummary": {
                "totalSales": "£4.00",
                "chipAndPin": "£4.00",
                "numberOfSales": 4
            },
            "latestTransactions": [
                {
                    "date": "2024-11-04 05:26:38",
                    "ref": "BC73C9E66E6E4DC996A6E86AF3638635",
                    "description": "62004E45000F300B4ABD50342140000",
                    "name": "446278******4517",
                    "amount": "£1.00",
                    "outstanding": "£0.00",
                    "asset": "Ashington AWT",
                    "status": "Completed",
                    "info": "View"
                },
                {
                    "date": "2024-11-04 07:37:45",
                    "ref": "B9984CB972BE34451AC8B7657E6D64E9",
                    "description": "62004E45000F300B4ABD50342140000",
                    "name": "465902******9029",
                    "amount": "£1.00",
                    "outstanding": "£0.00",
                    "asset": "Ashington AWT",
                    "status": "Completed",
                    "info": "View"
                }
                // Additional transactions...
            ]
        }

        // Send the response back to the client
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching devices' });
    }
};
export const getConfig = async (req, res) => {
    const { body } = req;
    try {
        // Read the devices data from the JSON file
        const result = await readFile(fileName);
        // Construct the response object
        const response = {
            "config": {
                "basicInformation": {
                    "name": "Ashington AWT",
                    "customId": "",
                    "description": "62004E45000F300B4ABD50342140000"
                },
                "location": {
                    "store": "Ashington",
                    "position": ""
                }
            }
        }


        // Send the response back to the client
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching devices' });
    }
};
export const statusHistoryy = async (req, res) => {
    const { body } = req;
    try {
        // Read the devices data from the JSON file
        const result = await readFile(fileName);
        // Construct the response object
        const response = {
            "statusHistory": [
                {
                    "timestamp": "2024-11-04 14:32:07",
                    "status": "Online",
                    "description": "Heartbeat"
                },
                {
                    "timestamp": "2024-11-04 14:22:06",
                    "status": "Online",
                    "description": "Heartbeat"
                },
                {
                    "timestamp": "2024-11-04 11:58:15",
                    "status": "Online",
                    "description": "System ONLINE"
                },
                {
                    "timestamp": "2024-11-04 10:58:15",
                    "status": "Online",
                    "description": "Kashing Agent successfully initialised - v1.0.0 [Build 1]"
                }
                // Additional status entries...
            ],
            "pagination": {
                "currentPage": 1,
                "totalPages": 5,
                "itemsPerPage": 25
            }
        }



        // Send the response back to the client
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching devices' });
    }
};
export const updateConfig = async (req, res) => {
    const { body } = req;
    try {
        // Read the devices data from the JSON file
        const result = await readFile(fileName);
        // Construct the response object
        const response = body


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
        console.log(device, id)

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
