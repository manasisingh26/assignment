import React, { useEffect, useState } from "react";
import "./EmailPerformanceTable.css";

const itemsPerPage = 6; // Number of rows per page

const EmailPerformanceTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([
    "Emails",
    "PublishDate",
    "Sent",
    "ClickThroughRate",
    "DeliveredRate",
    "UnsubscribedRate",
    "SpamReportRate",
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Import the JSON data file
    import("./emailPerformanceData.json")
      .then((jsonData) => {
        setData(jsonData.default);
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });
  }, []);

  const handleCheckboxChange = (index) => {
    // Update the selected columns based on checkbox selection
    const columnName = data[index].Emails; // Assuming Email is the unique identifier
    if (selectedColumns.includes(columnName)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    } else {
      setSelectedColumns([...selectedColumns, columnName]);
    }
  };

  const filteredData = data.filter((item) =>
    item.Emails.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <h2>All Email Performance</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Email"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
      <div className="table-header">
        <div className="table-header-right">
          <button
            className="export-button"
            onClick={() => {}}
          >
            Export
          </button>
          <button
            className="manage-columns-button"
            onClick={() => {}}
          >
            Manage Columns
          </button>
        </div>
      </div>
      <table className="email-performance-table">
        <thead>
          <tr>
            <th></th>
            {selectedColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(item.Emails)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              {selectedColumns.map((column) => (
                <td key={column}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
      <button
        className={`page-button previous-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`page-button ${currentPage === index + 1 ? "active-page" : ""}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`page-button next-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
  );
};

export default EmailPerformanceTable;
