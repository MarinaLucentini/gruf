import React from "react";
import Col from "react-bootstrap/Col";
import GPTButton from "./GPTButton";

const GPT = () => {
  return (
    <>
      <Col>
        <div id="responseBox" className="mt-3"></div>
      </Col>
      <Col>
        <GPTButton />
      </Col>
    </>
  );
};

export default GPT;
