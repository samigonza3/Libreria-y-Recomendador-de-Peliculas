import './App.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,
} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CreateMovie from './components/createMovie';
import Home from './components/Home';
import Movies from './components/movies';
import Dashboard from './components/dashboard';
import logo from './popcorn.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function App() {
  return (
    <div className="navbar-container">
      <Router>
        <Navbar expand="lg" className="navbar navbar-expand-lg navbar-light bg-light navbar-container">
          <Container>
            <Navbar.Brand as={Link} to="/" className="nav-link brand-text">Muvi Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                <Nav.Link as={Link} to="/movies" className="nav-link">Películas</Nav.Link>
                <Nav.Link as={Link} to="/create-movie" className="nav-link">Añadir Película</Nav.Link>
                <Nav.Link as={Link} to="/dashboard" className="nav-link">Dashboard</Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/create-movie" element={<CreateMovie />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>

    
      <section id="carrusel" class="block">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://i.ibb.co/T4nXTMn/carrusel-1.jpg" class="d-block w-100" alt="..."/>
          
        </div>
         <div class="carousel-item">
          <img src="https://i.ibb.co/T4nXTMn/carrusel-1.jpg" class="d-block w-100" alt="..."/>
          <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        {/*<div class="carousel-item">
          <img src="https://i.ibb.co/T4nXTMn/carrusel-1.jpg" class="d-block w-100" alt="..."/>
          <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div> */}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
      </section>

         

      <div id="logo" className="container text-center mt-4 logo-container">
                <img src={logo} className="App-logo" alt="logo" />
      </div>
        



    </div>


  );
}

export default App;
