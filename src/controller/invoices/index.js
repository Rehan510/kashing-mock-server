import { writeFile, readFile } from "../../utils/helper.js";
const fileName = "/invoices.json";

export const findAll = async (req, res) => {
  try {
    // Read the invoice data from the JSON file (assuming invoices.json is structured as provided)
    const invoicesData = await readFile(fileName);

    // Get pagination parameters from the query (default page is 1, itemsPerPage is 20)
    const { page = 1, itemsPerPage = 20 } = req.query;

    // Parse invoices from the data (assuming invoices are inside an 'invoices' array)
    const invoices = invoicesData.invoices;

    // Calculate the total number of pages
    const totalItems = invoices.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the start and end indexes for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    // Get the invoices for the current page
    const paginatedInvoices = invoices.slice(startIndex, endIndex);

    // Construct the response object
    const response = {
      invoices: paginatedInvoices,
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
