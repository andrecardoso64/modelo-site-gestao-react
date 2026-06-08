import { Form, FloatingLabel, Button, Row, Col} from "react-bootstrap"

function Tarefas(){
    return(
        <div className="d-md-flex flex-md-wrap flex-column align-content-center">
            <h2 className="d-md-flex">Cadastro de Tarefas</h2>
            <Form className="p-md-1">
                <Form.Group className="mt-1">
                    <FloatingLabel className="mt-1" label="Título">
                        <Form.Control type="text" placeholder=''></Form.Control>
                    </FloatingLabel>
                </Form.Group>

                <Row>
                    <Form.Group as={Col}>
                        <FloatingLabel label="Prioridade da Tarefa">
                            <Form.Select>
                                <option value="">Selecione</option>
                                <option value="alta">Alta</option>
                                <option value="media">Média</option>
                                <option value="baixa">Baixa</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <FloatingLabel label="Responsável pela Tarefa">
                            <Form.Select>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <Form.Group>
                    <FloatingLabel label="Descrição">
                        <Form.Control as="textarea" rows={3}></Form.Control>
                    </FloatingLabel>
                </Form.Group>

                <Row>
                    <Form.Group as={Col} xs={6} className="m-md-0">
                        <FloatingLabel label="Data de Criação">
                            <Form.Control type="date"></Form.Control>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} className="m-md-0">
                        <FloatingLabel label="Data de Conclusão">
                            <Form.Control type="date"></Form.Control>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} className="m-md-0">
                        <FloatingLabel label="Status da Tarefa">
                            <Form.Select>
                                <option value="emAndamento">Em Andamento</option>
                                <option value="pendente">Pendente</option>
                                <option value="concluido">Concluído</option>
                                <option value="cancelado">Cancelado</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Form.Group as={Col} xs={6} className="m-md-0">
                        <FloatingLabel label="Projeto">
                            <Form.Select>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Form.Group className="d-md-flex flex-column">
                    <Button variant="success" className="mb-2">Cadastrar</Button>
                    <Button variant="outline-danger" as="input" type="reset" value="Cancelar" />
                </Form.Group>
            </Form>
        </div>
    )
}

export default Tarefas