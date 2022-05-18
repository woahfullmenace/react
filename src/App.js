import React, { useState,Fragment } from "react";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import { nanoid } from "nanoid";

const App = () => {
  const[employees , setEmployees]= useState(data);
  const[addFormData,setAddFormData]= useState({
    name:"",
    age:"",
    department:""
   });

   const [editFormData, setEditFormData] = useState({
    name: "",
    age: "",
    department: ""
  });
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newEmployee = {
      id: nanoid(),
      name: addFormData.name,
      age: addFormData.age,
      department: addFormData.department,
    };

    const newEmployees = [...employees, newEmployee];
    setEmployees(newEmployees);
  };
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedEmployee = {
      id: editEmployeeId,
      name: editFormData.name,
      age: editFormData.age,
      department: editFormData.department
    };

    const newEmployees = [...employees];

    const index = employees.findIndex((employee) => employee.id === editEmployeeId);

    newEmployees[index] = editedEmployee;

    setEmployees(newEmployees);
    setEditEmployeeId(null);
  };

  const handleEditClick = (event, employee) => {
    event.preventDefault();
    setEditEmployeeId(employee.id);

    const formValues = {
      name: employee.name,
      age: employee.age,
      department: employee.department
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditEmployeeId(null);
  };

  const handleDeleteClick = (employeeId) => {
    const newEmployees = [...employees];

    const index = employees.findIndex((employee) => employee.id === employeeId);

    newEmployees.splice(index, 1);

    setEmployees(newEmployees);
  };




  


  return(
    <div className="app-container">
    <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Department</th>
            </tr>
        </thead>
        <tbody>
           {employees.map((employee) => (
            <Fragment>
                {editEmployeeId === employee.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    employee={employee}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
           )}
              </Fragment>
           ))}
           </tbody>
      </table>
      </form>
      <h3>add a new employee record in the table</h3>
      <form onSubmit={handleAddFormSubmit}>
      <input 
         type="text" 
         placeholder="enter your name"
         required='required'
         name="name"
         onChange={handleAddFormSubmit}
       />
       <input 
         type="text" 
         placeholder="enter your age"
         required='required'
         name="age"
         onChange={handleAddFormSubmit}
       />
       <input 
         type="text" 
         placeholder="enter your department"
         required='required'
         name="department"
         onChange={handleAddFormSubmit}
       />
      <button type="submit"> ADD EMPLOYEE</button>

      </form>
    </div>


  );
}

export default App;