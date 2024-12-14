import React from "react";
import { Card } from "react-bootstrap";

const PlantCard = ({ name, status, image }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Stato: {status}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PlantCard;
