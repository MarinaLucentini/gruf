import React from "react";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const GPT = () => {
  return (
    <>
		<Col>
			<div id="responseBox" class="mt-3"></div>
		</Col>
		<Col>
			<InputGroup className="mb-3">
			<Form.Control
			  placeholder="Recipient's username"
			  aria-label="Recipient's username"
			  aria-describedby="basic-addon2"
			/>
			<Button variant="outline-secondary" id="button-addon2">
			  Button
			</Button>
			</InputGroup>
		</Col>
	</>
	);
};

export default GPT;
