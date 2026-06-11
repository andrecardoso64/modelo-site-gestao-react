import { useState } from "react"
import { Form, FloatingLabel, Button, Container } from "react-bootstrap"
import { InputMask } from "@react-input/mask";

function Usuarios(){

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [dtNascimento, setDtNascimento] = useState('');
    const [status, setStatus] = useState('ativo');
    const [senha, setSenha] = useState('');

    const [formValido, setFormValido] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }

        setFormValido(true);
    };

    return (
        <div className="d-md-flex flex-md-wrap flex-column align-content-center">
                <h2 className="d-md-flex ">Cadastro de Usuários</h2>

                <Form noValidate validated={formValido} onSubmit={handleSubmit} className="p-md-1">

                    <Form.Group className="mt-1">
                        <FloatingLabel className="mt-1" controlId="nomeUsuario" label="Nome">
                            <Form.Control type="text" required placeholder='' onChange={(event) => setNome(event.target.value)}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel controlId="cpf" label="CPF">
                            <InputMask id="cpf" required type="text" placeholder='' onChange={(event) => setCpf(event.target.value)} className="form-control" mask="___.___.___-__" replacement={{ _: /\d/ }} showMask separate></InputMask>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel controlId="email" label="E-mail">
                            <Form.Control required type="text" placeholder='' onChange={(event) => setEmail(event.target.value)}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel controlId="dtNascimento" label="Data de Nascimento">
                            <Form.Control required type="date" onChange={(event) => setDtNascimento(event.target.value)}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group id="statusContainer">
                        <FloatingLabel controlId="statusUsuario" label="Status">
                            <Form.Select required onChange={(event) => setStatus(event.target.value)}>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                                <option value="bloqueado">Bloqueado</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group id="campoSenha">
                        <FloatingLabel controlId="senha" label="Senha" className="mb-0">
                            <Form.Control required minLength={8} maxLength={20} id="senha" type="password" placeholder='' onChange={(event) => {
                                setSenha(event.target.value);
                            }}></Form.Control>
                        </FloatingLabel>
                        <Form.Text id="helpSenha" className="d-sm-flex justify-content-start">Sua senha deve ter de 8 a 20 caracteres, contendo letras e numeros, e não deve ter espaços, caracteres especiais, ou emojis.</Form.Text>
                    </Form.Group>

                    <Form.Group className="d-md-flex flex-column">
                        <Button variant="success" type="submit" className="mb-2" >Cadastrar</Button>
                        <Button variant="outline-danger" as="input" type="reset" value="Cancelar" />
                    </Form.Group>
                </Form>
        </div>
)
}

export default Usuarios