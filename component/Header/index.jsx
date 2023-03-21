import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React from 'react';
import styles from './index.module.css';

function Header({filterRegion}) {
  const regionsNames = ['WORLD', 'SOUTH AMERICA', 'NORTH AMERICA', 'EUROPE', 'CHINA'];

  return (
    <div className={styles.container}>
      <Navbar key={'sm'} bg="light" expand={'sm'} className="mb-3" >
        <Container fluid>
          <Navbar.Brand href="/">Dota Try Hard</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'sm'}`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-${'sm'}`} aria-labelledby={`offcanvasNavbarLabel-expand-${'sm'}`} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'sm'}`}>Dota Try Hard</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3" style={{marginRight: 80}}>
                { filterRegion &&<NavDropdown title="Regions" id={`offcanvasNavbarDropdown-expand-${'sm'}`}>
                  { regionsNames.map((name, index) => (
                    <NavDropdown.Item key={index}
                      href="#"
                      onClick={() => {
                        document.querySelector('.btn-close').click();
                        filterRegion(index);
                      }}
                    >
                      {name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
