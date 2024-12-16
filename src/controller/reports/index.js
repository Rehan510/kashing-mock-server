
import { writeFile, readFile } from "../../utils/helper.js"
const fileName = "/reportsFilter.json"
export const findAll = async (req, res) => {
    try {
        const result = await readFile(fileName);

        // Map through the result and format it as per the desired structure
    

        // Return the formatted wallets
        res.status(200).json( result );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error fetching' });
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
