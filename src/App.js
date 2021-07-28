import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination"

function App() {

  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const itemCountPerPage = 6;

  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    getUsersData();
  }, [activePage]);

  const getUsersData = () => {
    axios.get(`https://reqres.in/api/users?page=${activePage}`).then((response) => {
      setUsers(response.data.data);
      setTotalItemsCount(response.data.total);
    }).catch((error) => {
      console.log(error);
      setUsers([]);
      setTotalItemsCount('');
    })
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }

  return (
    <div className="">
      <table>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Profile Picture</th>
        </tr>
        {users.map((user) => {
          return (
            <tr>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <img src={user.avatar} alt="Avtar" style={{ verticalAlign: 'middle', width: '50px', height: '50px', borderRadius: '50%' }} />
              </td>
            </tr>
          );
        })
        }
      </table>
      <br /><br />
      <div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}

export default App;
