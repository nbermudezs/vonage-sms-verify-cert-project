import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ConfirmPhoneNumber({ requestId }) {
  const [verificationCode, setVerificationCode] = useState();

  function confirm() {
    fetch('/confirmNumber', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requestId, verificationCode })
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === '0') {
          alert('Successufully verified -- you can now chat with other users');
          window.location = '/';
        }
      });
  }

  function cancel() {
    fetch('/cancelVerification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requestId })
    })
      .then((res) => res.json())
      .then(() => {
        window.location = '/';
      });
  }

  return (
    <div className="position-absolute d-flex w-100 h-100">
      <Card className="m-auto">
        <Card.Header>Confirm your number</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter verification code"
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="secondary" type="button" onClick={cancel} className="mr-4">
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={confirm}>
            Confirm
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

ConfirmPhoneNumber.propTypes = {};

export default ConfirmPhoneNumber;
