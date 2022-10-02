import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsersApi = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/user`);
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersApi();
  }, []);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Username</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => <tr key={item._id} className="table-dark">
          <th scope="row">{index + 1}</th>
          <td>{`${item.first_name} ${item.last_name}`}</td>
          <td>{item.email}</td>
          <td>{item.username}</td>
          <td>{item.role}</td>
          <td>{item.active ? <span className='badge bg-success'>Active</span> : <span className='badge bg-danger'>Inactive</span>}</td>
          <td>
            <Link to={`/users/${item._id}`} className="btn btn-primary btn-sm">
              View
            </Link>
          </td>
        </tr>)}
      </tbody>
    </table>
  );
};

export default UserList;
