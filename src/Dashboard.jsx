import { Row, Col, Container,Card } from "react-bootstrap"

function Dashboard(){
    return (
    <div>
        <Container className="my-4">
            <Row>
                <Col>
                    <Card bg="success">
                        <Card.Body>
                            <Card.Text className="text-white">
                                <div id="concluidos">0</div>
                                Concluídos
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="info">
                        <Card.Body>
                            <Card.Text>
                                <div>0</div>
                                Em Andamento
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="warning">
                        <Card.Body>
                            <Card.Text>
                                <div>0</div>
                                Pendentes
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card bg="danger">
                        <Card.Body>
                            <Card.Text className="text-white">
                                <div>0</div>
                                Cancelados
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Row className="my-4">
            <Col xs={6} className="mb-3">
                <Card>
                    <Card.Header>Distribuição de Status</Card.Header>
                    <Card.Body></Card.Body>
                </Card>
            </Col>
            <Col xs={6} className="mb-3">
                <Card>
                    <Card.Header>Projetos por Mês</Card.Header>
                    <Card.Body></Card.Body>
                </Card>
            </Col>
            <Col xs={12} className="mb-3">
                <Card>
                    <Card.Header>Projeto por Responsável</Card.Header>
                    <Card.Body></Card.Body>
                </Card>
            </Col>
        </Row>
        <div>Main Page</div>
    </div>
)
}

export default Dashboard