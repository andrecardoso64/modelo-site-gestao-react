import { useState, useEffect } from "react";
import { Row, Col, Container,Card } from "react-bootstrap"

function Dashboard(){

    const [projetosPendentes, setProjetosPendentes] = useState(0);
    const [projetosConcluidos, setProjetosConcluidos] = useState(0);
    const [projetosCancelados, setProjetosCancelados] = useState(0);
    const [projetosEmAndamento, setProjetosEmAndamento] = useState(0);

    const [tarefasPendentes, setTarefasPendentes] = useState(0);
    const [tarefasConcluidos, setTarefasConcluidos] = useState(0);
    const [tarefasCancelados, setTarefasCancelados] = useState(0);
    const [tarefasEmAndamento, setTarefasEmAndamento] = useState(0);

    const [users, setUsers] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [tarefas, setTarefas] = useState([]);

    const mostrarTarefas = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/tarefas');
                const dados = await response.json();
        
                setTarefas(dados);
        
            } catch (error) {
                console.log(error);
            }
        };
        
        useEffect(() => {mostrarTarefas()}, []);
    
        const mostrarProjetos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/projetos');
                const dados = await response.json();

                setProjetos(dados);
    
            } catch (error) {
                console.log(error);
            }
        }

        const countProjetos = async () => {};

        useEffect(() => {mostrarProjetos()}, []);
    
        const mostrarUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/usuarios');
                const dados = await response.json();
    
                setUsers(dados);
    
            } catch (error) {
                console.log(error);
            }
        };

        useEffect(() => {mostrarUsuarios()}, []);

    return (
    <div>
        <Container className="my-4">
            <Row>
                <Col>
                    <Card bg="success">
                        <Card.Body className="text-white">
                            <div id="concluidos">{projetosConcluidos}</div>
                            Concluídos
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="info">
                        <Card.Body>
                            <div>{projetosEmAndamento}</div>
                            Em Andamento
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="warning">
                        <Card.Body>
                            <div>{projetosPendentes}</div>
                            Pendentes
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="danger">
                        <Card.Body className="text-white">
                            <div>{projetosCancelados}</div>
                            Cancelados
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Row className="my-4">
            <Col xs={6} className="mb-3">
                <Card>
                    <Card.Header className="bg-black text-white">Distribuição de Status</Card.Header>
                    <Card.Body></Card.Body>
                </Card>
            </Col>
            <Col xs={6} className="mb-3">
                <Card>
                    <Card.Header className="bg-black text-white">Projetos por Mês</Card.Header>
                    <Card.Body></Card.Body>
                </Card>
            </Col>
            <Col xs={12} className="mb-3">
                <Card>
                    <Card.Header className="bg-black text-white">Projeto por Responsável</Card.Header>
                    <Card.Body></Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
)
}

export default Dashboard