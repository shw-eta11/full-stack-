import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
   axios.get(`${process.env.REACT_APP_API_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Fullstack App</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

