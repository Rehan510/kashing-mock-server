
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/roles.json"

export const findAll = async (req, res) => {
    try {
        const result = await readFile(fileName);  // Read the roles data from file
        const roles = result.map((item, index) => {
            // Map each item to the desired format
            return {
                id: item.id, // Assign a unique ID starting from 1
                name: item.newRole.name || "No name provided", // Use the role name, defaulting if empty
                users: 0, // This could be dynamic, here it's set to 0 by default
                permissions: item.newRole.permissions || {},
                "actions": [
                    {
                        "action": "edit",
                        "icon": "pencil",
                        "tooltip": "Tooltip text "
                    }
                ] // Permissions are mapped directly
            };
        });

        // Return the formatted roles
        res.status(200).json({ roles });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching roles' });
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
