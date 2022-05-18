import React from "react";

const ReadOnlyRow = ({ employee, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.age}</td>
      <td>{employee.address}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, employee)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(employee.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
