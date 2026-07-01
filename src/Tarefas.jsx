import { useState, useEffect } from "react";
import { Form, FloatingLabel, Button, Row, Col, Modal, Card} from "react-bootstrap"

function Tarefas(){

    const [formValido, setFormValido] = useState(false);
    const [showCad, setShowCad] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [tarefaId, setTarefaId] = useState(0);

    const [tarefas, setTarefas] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [users, setUsers] = useState([]);

    const [tarefa, setTarefa] = useState({
        titulo:"",
        prioridade:"",
        descricao:"",
        dtCriacao:"",
        dtConclusao:"",
        status:"emAndamento",
        responsavelId: 0,
        projetoId: 0,
    })

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

    const mostrarUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios');
            const dados = await response.json();

            setUsers(dados);

        } catch (error) {
            console.log(error);
        }
    };

    const getTarefa = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/tarefas/${id}`);

            const dados = await response.json();

            console.log(dados);
            setTarefa((prevState) => ({...prevState, ...dados}))

        } catch (error) {
            console.log(error);
            alert('Erro ao pegar dados da tarefa')
        }
    };

    const salvar = async () => {

        const tarefaCad = tarefa;

        try {
            const response = await fetch('http://localhost:8080/api/tarefas', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tarefaCad)
            });

            const dados = await response.json();
            console.log(dados);
            alert('Tarefa cadastrada com sucesso');

        } catch (error) {
            console.log(error);
            alert('Erro no cadastro da tarefa');
        }
    };

    const editar = async (id) => {

        const tarefaEditar = tarefa;

        try{
            const response = await fetch(`http://localhost:8080/api/tarefas/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(tarefaEditar)
            })

            const dados = await response.json();
            console.log(dados);
            alert('Tarefa editado com sucesso')
        }catch(error){
            console.log(error);
        }
    };

    const excluir = async (id) => {
        try{
            const response = await fetch(`http://localhost:8080/api/tarefas/${id}`, {
                method: 'DELETE',
            })

            if (response.ok){
                alert('Tarefa excluída com sucesso');
            } else{
                alert('Erro ao excluir tarefa');
            }
        }catch(error){
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setTarefa((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        } else{
            if (tarefa.responsavelId === 0 || tarefa.projetoId === 0){
                event.preventDefault();
                event.stopPropagation();
            } else{
                editMode ? editar(tarefaId) :salvar();
            }

        }

        setFormValido(true);
    };

    return(
        <div className="d-md-flex flex-md-wrap flex-column align-content-center">
            <h2 className="d-md-flex justify-content-center">Lista de Tarefas</h2>
            <div className="my-4">
                <Button onClick={() => {
                    setShowCad(true);
                    setEditMode(false);
                    }}>Cadastrar</Button>
            </div>
            <div className="d-md-flex flex-wrap my-3 justify-content-center">
                {
                    tarefas.map((task) => (
                        <Card key={task.id} className="mx-2 my-2 col-3">
                            <Card.Header>{task.id} - {task.titulo}</Card.Header>
                            <Card.Body>
                                <div>Data de Criação: {task.dtCriacao}</div>
                                <div>Data de Conclusão: {task.dtConclusao}</div>
                                <div>Status: {task.status}</div>
                                <div>Id do Projeto: {task.projetoId}</div>
                                <div>Id do Responsavel: {task.responsavelId}</div>
                                <div className="mt-3">
                                    <Button className="mx-1" variant="success" onClick={() => {
                                        setShowCad(true);
                                        setTarefaId(task.id);
                                        setEditMode(true);
                                        getTarefa(task.id);
                                    }}>Editar</Button>
                                    <Button className="mx-1" variant="danger" onClick={() => {
                                        setShowDel(true);
                                        setTarefaId(task.id);
                                    }}>Excluir</Button>
                                </div>
                            </Card.Body>
                        </Card>))
                }
            </div>
            

            <Modal centered backdrop={"static"} size="lg" show={showCad} onShow={() => {
                mostrarProjetos();
                mostrarUsuarios();
            }} onHide={()=>setShowCad(false)}>
                <Modal.Header closeButton>
                    <h2 className="d-md-flex">Cadastro de Tarefas</h2>
                </Modal.Header>
                <Modal.Body className="d-md-flex justify-content-center">
                    <Form noValidate validated={formValido} onSubmit={handleSubmit} className="p-md-1">
                        <Form.Group className="mt-1 mb-0">
                            <FloatingLabel controlId="titulo" className="mt-1 mb-0" label="Título">
                                <Form.Control required name="titulo" value={tarefa.titulo} type="text" placeholder='' onChange={handleChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>

                        <Row className="mb-0">
                            <Form.Group as={Col} className="mb-0">
                                <FloatingLabel controlId="prioridade" className="mb-0" label="Prioridade da Tarefa">
                                    <Form.Select required name="prioridade" value={tarefa.prioridade} onChange={handleChange}>
                                        <option value="" hidden>Selecione uma prioridade</option>
                                        <option value="alta">Alta</option>
                                        <option value="media">Média</option>
                                        <option value="baixa">Baixa</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-0">
                                <FloatingLabel controlId="responsavelId" className="mb-0" label="Responsável pela Tarefa">
                                    <Form.Select required name="responsavelId" value={tarefa.responsavelId} onChange={handleChange}>
                                        <option value="0" hidden>Selecione um Responsavel</option>
                                        {
                                            users.map((user) => (<option key={user.id} value={user.id} >{user.id}-{user.nome}</option>))
                                        }
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mt-0">
                            <FloatingLabel controlId="descricao" label="Descrição">
                                <Form.Control required name="descricao" value={tarefa.descricao} as="textarea" rows={3} onChange={handleChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col} xs={6} className="m-md-0">
                                <FloatingLabel controlId="dtCriacao" className="m-md-0" label="Data de Criação">
                                    <Form.Control required name="dtCriacao" value={tarefa.dtCriacao} type="date" onChange={handleChange}></Form.Control>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} xs={6} className="m-md-0">
                                <FloatingLabel controlId="dtConclusao" className="m-md-0" label="Data de Conclusão">
                                    <Form.Control required name="dtConclusao" value={tarefa.dtConclusao} type="date" onChange={handleChange}></Form.Control>
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group as={Col} xs={6} className="m-md-0">
                                <FloatingLabel controlId="status" label="Status da Tarefa">
                                    <Form.Select required name="status" value={tarefa.status} onChange={handleChange}>
                                        <option value="emAndamento">Em Andamento</option>
                                        <option value="pendente">Pendente</option>
                                        <option value="concluido">Concluído</option>
                                        <option value="cancelado">Cancelado</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                            
                            <Form.Group as={Col} xs={6} className="m-md-0">
                                <FloatingLabel controlId="projetoId" label="Projeto">
                                    <Form.Select required name="projetoId" value={tarefa.projetoId} onChange={handleChange}>
                                        <option value={0} hidden>Selecione um projeto</option>
                                        {
                                            projetos.map((projeto) => (<option key={projeto.id} value={projeto.id} >{projeto.id}-{projeto.nome}</option>))
                                        }
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Form.Group className="d-md-flex flex-column">
                            <Button variant="success" type="submit" className="mb-2">Cadastrar</Button>
                            <Button variant="outline-danger" as="input" type="reset" value="Cancelar" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDel} onHide={() => {setShowDel(false)}}>
                <Modal.Header closeButton><Modal.Title>Exclusão de Tarefa</Modal.Title></Modal.Header>
                <Modal.Body className="d-md-flex justify-content-center pt-0">
                    <Form onSubmit={() => {excluir(tarefaId)}}>
                        <div className="mb-3 mt-0 d-sm-flex justify-content-center fs-5">Deseja realmente excluir essa tarefa?</div>
                        <div className="d-sm-flex flex-column">
                            <Button variant="danger" className="mb-3" type="submit">Excluir</Button>
                            <Button variant="outline-success" onClick={() => {setShowDel(false)}}>Cancelar</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Tarefas