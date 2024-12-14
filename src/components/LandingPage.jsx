import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
const LandigPage = () => {
  const navigate = useNavigate();
  const handleStarted = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <Container className="min-vh-100">
        <Row className="min-vh-100">
          <Col className="d-flex align-items-center flex-column min-vh-100 justify-content-center">
            <img src={logo} alt="logo" />
            <h3>Grow Urban Food</h3>
            <h5>Your premier partner in urban trasformation</h5>
            <h5>having healthy food and nurturing</h5>
            <Button onClick={() => handleStarted()} className="m-2">
              Get Started
            </Button>
            <div className="d-flex align-items-center">
              <h6 className="m-2">Click the link for more info</h6>
              <a href="#">Click here</a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default LandigPage;
