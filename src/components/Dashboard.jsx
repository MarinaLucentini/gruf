import { Button, Col, Container, Row } from "react-bootstrap";
import Nav from "./Nav";
import { PiPlantDuotone } from "react-icons/pi";
import { BiWorld } from "react-icons/bi";
import PlantCard from "./PlantCard";
import CommunitySection from "./CommunitySection";
import MonitoringChart from "./ChartHumidity";
import NutrientsChart from "./ChartNutrients";
import LightDistributionChart from "./ChartLight";
import Calendar from "react-calendar";
import GPT from "./GPT";

const Dashboard = () => {
  return (
    <>
      <Nav />
      <Container className="min-vh-100 my-5">
        {/* Barra di Navigazione Interna */}
        <Row className="w-50 mx-auto mb-4">
          <Col className="d-flex align-items-center justify-content-evenly">
            <div className="d-flex flex-column align-items-center">
              <PiPlantDuotone size={30} color="var(--accent-color)" />
              <p className="fw-bold">My Plants</p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <BiWorld size={30} color="var(--accent-color)" />
              <p className="fw-bold">Community</p>
            </div>
          </Col>
        </Row>
        <Row className="w-25 ms-auto">
          <Col className=" justify-content-end">
            <Calendar />
          </Col>
        </Row>
        <Button className="w-25 h-25">Add a plant</Button>
        {/* Sezione Elenco delle Coltivazioni */}
        <Row className="mb-5">
          <h2 className="text-center mb-4">List of Crops</h2>
          <Col>
            <PlantCard name="Basilico" status="Buona salute" image="https://example.com/basilico.jpg" />
            <PlantCard name="Pomodoro" status="Crescita media" image="https://example.com/pomodoro.jpg" />
          </Col>
        </Row>

        {/* Monitoraggio in Tempo Reale */}
        <Row className="mb-5 flex-column">
          <h2 className="text-center mb-4">Real Time Monitoring</h2>
          <Col>
            <div className="bg-light p-3 rounded">
              <MonitoringChart />
            </div>
          </Col>
          <Col>
            <div className="bg-light p-3 rounded">
              <NutrientsChart />
            </div>
          </Col>
          <Col>
            <div className="bg-light p-3 rounded">
              <LightDistributionChart />
            </div>
          </Col>
        </Row>

        {/* Sezione Community */}
        <Row>
          <h2 className="text-center mb-4">AI suggestions</h2>
          <GPT />
        </Row>
        <Row>
          <h2 className="text-center mb-4">Community</h2>
          <Col>
            <CommunitySection />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
