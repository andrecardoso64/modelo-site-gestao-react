import { useState } from "react"
import { Form, FloatingLabel, Button, Container } from "react-bootstrap"

function validacao(){
    //alert('Formulário enviado')
    console.log('Enviado')
}

function Usuarios(){

    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [email, setEmail] = useState()
    const [dtNascimento, setDtNascimento] = useState()
    const [status, setStatus] = useState('ativo')
    const [senha, setSenha] = useState()

    //console.log(status)

    return (
        <div className="d-md-flex flex-md-wrap flex-column align-content-center">
                <h2 className="d-md-flex ">Cadastro de Usuários</h2>
                <Form className="p-md-1">
                    <Form.Group className="mt-1">
                        <FloatingLabel className="mt-1" label="Nome">
                            <Form.Control type="text" placeholder='' onChange={(event) => setNome(event.target.value)}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="CPF">
                            <Form.Control type="text" placeholder='' onChange={(event) => setCpf(event.target.value)}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="E-mail">
                            <Form.Control type="text" placeholder='' onChange={(event) => setEmail(event.target.value)}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Data de Nascimento">
                            <Form.Control type="date" onChange={(event) => setDtNascimento(event.target.value)}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Status">
                            <Form.Select onChange={(event) => setStatus(event.target.value)}>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                                <option value="bloqueado">Bloqueado</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel label="Senha" className="mb-0">
                            <Form.Control id="senha" type="password" placeholder='' onChange={(event) => setSenha(event.target.value)}></Form.Control>
                        </FloatingLabel>
                        <Form.Text className="d-sm-flex justify-content-start" muted>Sua senha deve ter de 8 a 20 caracteres, contendo letras e numeros, e não deve ter espaços, caracteres especiais, ou emojis.</Form.Text>
                    </Form.Group>
                    <Form.Group className="d-md-flex flex-column">
                        <Button variant="success" className="mb-2" onClickCapture={validacao()}>Cadastrar</Button>
                        <Button variant="outline-danger" as="input" type="reset" value="Cancelar" />
                    </Form.Group>
                </Form>
        </div>
)
}

export default Usuarios