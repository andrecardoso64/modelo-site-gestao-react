import { Form, FloatingLabel, Button, Row, Col} from "react-bootstrap"

function Projetos(){
    return(
        <div className="d-md-flex flex-md-wrap flex-column align-content-center">
            <h2 className="d-md-flex">Cadastro de Projetos</h2>
            <Form className="p-md-1">
                <Form.Group className="mt-1">
                    <FloatingLabel className="mt-1" controlId="nome" label="Nome do Projeto">
                        <Form.Control id="nome" type="text" placeholder=''></Form.Control>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <FloatingLabel controlId="descricao" label="Descrição">
                        <Form.Control id="descricao" as="textarea" rows={3}></Form.Control>
                    </FloatingLabel>
                </Form.Group>

                <Row>
                    <Form.Group as={Col} xs={6} className="m-md-0">
                        <FloatingLabel controlId="dtCriacao" label="Data de Criação">
                            <Form.Control id="dtCriacao" type="date"></Form.Control>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} className="m-md-0">
                        <FloatingLabel controlId="dtConclusao" label="Data de Conclusão">
                            <Form.Control id="dtConclusao" type="date"></Form.Control>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} className="m-md-0">
                        <FloatingLabel controlId="status" label="Status da Tarefa">
                            <Form.Select id="status">
                                <option value="emAndamento">Em Andamento</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    
                    <Form.Group as={Col} xs={6} className="m-md-0">
                        <FloatingLabel controlId="responsavel" label="Responsável pela Tarefa">
                            <Form.Select id="responsavel">
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

export default Projetos