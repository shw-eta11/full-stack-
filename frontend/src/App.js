import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/users")
  .then(res => setUsers(res.data))
  .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Fullstack App</h1>
      
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table 
          style={{ 
            borderCollapse: 'collapse', 
            width: '100%', 
            textAlign: 'left' 
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
