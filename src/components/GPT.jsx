import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const GPT = () => {
  return (
    <Container>
      <Row>
        <Col sm={8}>
		    <div id="responseBox" class="mt-3"></div>
		</Col>
        <Col sm={4}>
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
      </Row>
    </Container>
  );
}

export default GPT;
