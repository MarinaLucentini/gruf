import { Col, Container, Row } from "react-bootstrap";
import Nav from "./Nav";
import { PiPlantDuotone } from "react-icons/pi";
import { BiWorld } from "react-icons/bi";

const Dashboard = () => {
  return (
    <>
      <Nav />
      <Container className="min-vh-100 my-5">
        <Row className="w-25">
          <Col className="d-flex align-items-center justify-content-evenly ">
            <div className="d-flex flex-column align-items-center">
              <PiPlantDuotone size={24} color="var(--accent-color)" />
              <p>My Plants</p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <BiWorld size={24} color="var(--accent-color)" />
              <p>Community</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Dashboard;
