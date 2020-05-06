import React, { useState } from 'react';
import fetch from 'node-fetch';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ConfirmPhoneNumber from './ConfirmPhoneNumber';

function App() {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+12172473836');
  const [requestId, setRequestId] = useState();

  function submitForm() {
    fetch('/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber, displayName })
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('json', json);

        if (json.status === 10) {
          // it means a verification is already in progress -- needs special handling
        }
        // assume everything went well and we have a status = 0
        setRequestId(json.request_id);
      });
  }

  if (requestId) {
    return (
      <ConfirmPhoneNumber phoneNumber={phoneNumber} requestId={requestId} />
    );
  }

  return (
    <div className="position-absolute d-flex w-100 h-100">
      <Card className="m-auto">
        <Card.Header>Sign-Up</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Form.Text className="text-muted">
                We will send a verification code to this number.
              </Form.Text>
            </Form.Group>
          </Form>
          <Button variant="primary" type="button" onClick={submitForm}>
            Submit
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
