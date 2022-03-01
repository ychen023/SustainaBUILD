import { FaUserCircle } from 'react-icons/fa';
import { Navbar, Container, Nav, NavItem } from 'react-bootstrap';
import Logo from '../img/no_logo_white_2.png';

export function NavB() {
  return (
    <Navbar expand="lg" className="navbar-format">
      <Container>
        <Navbar.Brand>
          <img className="push-right" alt="Sustainabuild logo" src={Logo} />
        </Navbar.Brand>
        <Nav className="nav-format">
          <NavItem className="nav-tabs">Home</NavItem>
          <NavItem className="nav-tabs">Build</NavItem>
          <NavItem className="nav-tabs">Dashboard</NavItem>
          <NavItem className="nav-tabs">About</NavItem>
          <NavItem className="nav-tabs me-auto"><FaUserCircle /></NavItem>
        </Nav>
      </Container>

    </Navbar>
  )

}