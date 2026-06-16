//import { Navbar, Container } from 'react-bootstrap'
import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import './style.css'
import logo from './assets/logo.png'
import person_add from './assets/person_add_black.svg'
import person_add_light from './assets/person_add_light.svg'
import task_add from './assets/assignment_add.svg'
import task_add_light from './assets/assignment_add_light.svg'
import project from './assets/dashboard.svg'
import project_light from './assets/dashboard_light.svg'
import { Nav, Container, Navbar, Button, Modal, Form } from 'react-bootstrap'
import { InputMask } from '@react-input/mask'
import Dashboard from './Dashboard.jsx'
import Usuarios from './Usuarios.jsx'
import Projetos from './Projetos.jsx'
import Tarefas from './Tarefas.jsx'
import ListarUsuarios from './ListarUsuarios.jsx'

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
        <Modal.Header closeButton>
          <Modal.Title>Login de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>CPF:</Form.Label>
              <InputMask id="cpf" minLength={14} required type="text" placeholder='000.000.000-00' className="form-control" mask="___.___.___-__" replacement={{ _: /\d/ }} separate></InputMask>
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
        <Route path="/usuarios/listarUsuarios" element={<ListarUsuarios />}></Route>
      </Routes>
    </div>
  )
}

export default NavBar
