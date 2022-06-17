import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const User = () => {
  const { todos } = useSelector((state) => ({
    loading: state.loading,
    todos: state.todos,
    error: state.error,
  }));

  return (
    <div>
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.emailAddress}</td>
                <td>{item.dob}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
