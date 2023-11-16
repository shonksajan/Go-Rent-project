import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewcars.css';

export default function Userslist() {
  const [userslist, setuserslist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8081/userslist')
      .then((response) => {
        setuserslist(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bac">
      <table className="responsive-table">
        <header>Users List</header>
        <table className="styled-table">
          <thead>
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {userslist.map((userslist) => (
              <tr >
                <td>{userslist.f_name}</td>
                <td>{userslist.l_name}</td>
                <td>{userslist.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </table>
    </div>
  );
}
