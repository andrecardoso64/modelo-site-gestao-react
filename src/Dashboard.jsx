import { Row, Col, Container,Card } from "react-bootstrap"

function Dashboard(){
    return (
    <div>
        <Container className="my-4">
            <Row>
                <Col>
                    <Card bg="success">
                        <Card.Body className="text-white">
                            <div id="concluidos">0</div>
                            Concluídos
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="info">
                        <Card.Body>
                            <div>0</div>
                            Em Andamento
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="warning">
                        <Card.Body>
                            <div>0</div>
                            Pendentes
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="danger">
                        <Card.Body className="text-white">
                            <div>0</div>
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