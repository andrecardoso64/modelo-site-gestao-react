//import { Navbar, Container } from 'react-bootstrap'
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import './style.css'
import { Nav, Container, Navbar, Button, Modal, Form, Row, Col } from 'react-bootstrap'
import Dashboard from './Dashboard.jsx'
import Usuarios from './Usuarios.jsx'
import Projetos from './Projetos.jsx'
import Tarefas from './Tarefas.jsx'
import APICall from './APICall.jsx'

function App() {

  const [show, setShow] = useState(false);

  return (
    <div>
      {/*<nav className='nav-container'>
        <div className='nav-opt-container'>
          <Link className='anchor-nodec' to='/'>Home</Link>
        </div>
        <div className='nav-opt-container'>
          <Link className='anchor-nodec' to='/usuarios'>Usuarios</Link>
        </div>
        <div className='nav-opt-container'>
          <Link className='anchor-nodec' to='/projetos'>Projetos</Link>
        </div>
        <div className='nav-opt-container'>
          <Link className='anchor-nodec' to='/tarefas'>Tarefas</Link>
        </div>
      </nav>*/}

      <Navbar className='justify-content-between align-items-center mb-4'>
        <Container>
              <Navbar.Collapse>
                <Navbar.Brand><Link className='anchor-nodec' to='/'>DashBoard</Link></Navbar.Brand>
              </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-center'>
                  <Nav>
                    <Nav.Item className='nav-link-container'>
                      <Link className='anchor-nodec' to='/usuarios'>Usuarios</Link>
                    </Nav.Item>
                    <Nav.Item className='nav-link-container'>
                      <Link className='anchor-nodec' to='/projetos'>Projetos</Link>
                    </Nav.Item>
                    <Nav.Item className='nav-link-container'>
                      <Link className='anchor-nodec' to='/tarefas'>Tarefas</Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                  <Button onClick={() => setShow(true)}>Login</Button>
                </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal centered show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>CPF:</Form.Label>
              <Form.Control type='text' placeholder='000.000.000-00'></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha:</Form.Label>
              <Form.Control type='password'></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/usuarios' element={<Usuarios />}></Route>
        <Route path='/projetos' element={<Projetos />}></Route>
        <Route path='/tarefas' element={<Tarefas />}></Route>
      </Routes>
    </div>
  )
}

export default App
