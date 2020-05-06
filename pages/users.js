import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Users() {
  const urlParams = globalThis.location ? new URLSearchParams(globalThis.location.search) : null;
  const userB = urlParams && urlParams.get('displayName');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(({ users }) => {
        setUsers(users);
      });
  }, []);

  function chatWith(userA) {
    fetch('/chat', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userA, userB })
    }).then(() => {
      alert(`All set! You can chat with ${userA} using your phone now`);
    });
  }

  return (
    <div className="position-absolute d-flex w-100 h-100">
      <Card className="m-auto">
        <Table striped hover className="mb-0">
          <thead>
            <tr>
              <th>Display Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.displayName.replace(' ', '')}>
                <td>{user.displayName}</td>
                <td>
                  <Button variant="primary" onClick={() => chatWith(user.displayName)} type="button">
                    Chat
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default Users;
