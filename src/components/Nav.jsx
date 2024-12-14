import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";

const Nav = () => {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" className="brand" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Welcome <a href="#login">User</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Nav;
