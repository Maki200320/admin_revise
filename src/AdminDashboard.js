import React, { useEffect, useState } from "react";
import { db } from "./components/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./admin.css";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const employeesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort employees alphabetically by name
      const sortedEmployees = employeesData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setEmployees(sortedEmployees);
    };
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

   const handleDelete = async (id) => {
    await deleteDoc(doc(db, "employees", id));
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search employee..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.date || "N/A"}</td>
                <td>{emp.timeIn}</td>
                <td>{emp.timeOut || "Not yet"}</td>
                <td><button onClick={() => handleDelete(emp.id)} className="btn delete">Delete</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
