import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, Nav, Navbar, Button, Modal, Form, FloatingLabel } from 'react-bootstrap'
import { InputMask } from '@react-input/mask'

import './App.css'
import './style.css'

import logo from './assets/logo.png'
import person_add from './assets/person_add_black.svg'
import person_add_light from './assets/person_add_light.svg'
import task_add from './assets/assignment_add.svg'
import task_add_light from './assets/assignment_add_light.svg'
import project from './assets/dashboard.svg'
import project_light from './assets/dashboard_light.svg'
import Dashboard from './Dashboard.jsx'
import Usuarios from './Usuarios.jsx'
import Projetos from './Projetos.jsx'
import Tarefas from './Tarefas.jsx'

function NavBar() {

  const [show, setShow] = useState(false);
  const [usuarioIconSrc, setUsuarioIconSrc] = useState(person_add);
  const [projetoIconSrc, setProjetoIconSrc] = useState(project);
  const [tarefaIconSrc, setTarefaIconSrc] = useState(task_add);

  return (
    <div>
      <Navbar className='justify-content-between align-items-center mb-4'>
        <Container>
              <Navbar.Collapse>
                <Navbar.Brand><Link className='anchor-nodec' to='/'><img src={logo} alt="DashBoard" /></Link></Navbar.Brand>
              </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-center'>
                  <Nav>
                    <Nav.Item onMouseOver={() => {setUsuarioIconSrc(person_add_light)}} onMouseLeave={() => {setUsuarioIconSrc(person_add)}} className='nav-link-container mx-1'>
                      <Link className='anchor-nodec' to='/usuarios'>
                      <img className='nav-icon' src={usuarioIconSrc} alt="" />
                      Usuarios
                      </Link>
                    </Nav.Item>
                    <Nav.Item onMouseOver={() => {setProjetoIconSrc(project_light)}} onMouseLeave={() => {setProjetoIconSrc(project)}} className='nav-link-container mx-1'>
                      <Link className='anchor-nodec' to='/projetos'>
                        <img className='nav-icon' src={projetoIconSrc} alt="" />
                        Projetos
                      </Link>
                    </Nav.Item>
                    <Nav.Item onMouseOver={() => {setTarefaIconSrc(task_add_light)}} onMouseLeave={() => {setTarefaIconSrc(task_add)}} className='nav-link-container mx-1'>
                      <Link className='anchor-nodec' to='/tarefas'>
                        <img className='nav-icon' src={tarefaIconSrc} alt="" />
                        Tarefas
                      </Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                  <Button onClick={() => setShow(true)}>Login</Button>
                </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal centered show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Login de Usuario</Modal.Title></Modal.Header>
        <Modal.Body className="d-md-flex justify-content-center pt-0">
          <Form>
            <Form.Group>
              <FloatingLabel controlId="cpf" label="CPF">
                <InputMask name="cpf" minLength={14} required type="text" placeholder='' className="form-control" mask="___.___.___-__" replacement={{ _: /\d/ }} separate></InputMask>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="senha" label="Senha">
                <Form.Control name="senha" type='password' placeholder=''></Form.Control>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="d-sm-flex flex-column align-items-end">
              <div className='my-0'><Button disabled>Login</Button></div>
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

export default NavBar
