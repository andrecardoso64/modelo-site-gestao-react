import { useState, useEffect } from "react";
import { Form, FloatingLabel, Button, Row, Col, Modal, Card} from "react-bootstrap"

function Projetos(){

    const [formValido, setFormValido] = useState(false);
    const [showCad, setShowCad] = useState(false);
    const [showDel, setShowDel] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [projetoId, setProjetoId] = useState(0);
    const [projetos, setProjetos] = useState([]);
    const [users, setUsers] = useState([]);
    const [tarefasLinked, setTarefasLinked] = useState([]);

    const [projeto, setProjeto] = useState({
        nome: "",
        descricao: "",
        dtCriacao: "",
        dtConclusao: "",
        status: "emAndamento",
        responsavelId: 0,
    });

    const handleChange = (e) => {
        setProjeto((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
        console.log(e.target.name);
        console.log(e.target.value);
        console.log(projeto)
    };

    const mostrarProjetos = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/projetos');
            const dados = await response.json();

            setProjetos(dados);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {mostrarProjetos()}, [])

    const mostrarUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios');
            const dados = await response.json();

            setUsers(dados);

        } catch (error) {
            console.log(error);
        }
    }

    const getProjeto = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/projetos/${id}`);

            const dados = await response.json();

            console.log(dados);
            setProjeto((prevState) => ({...prevState, ...dados}))

        } catch (error) {
            console.log(error);
            alert('Erro ao pegar dados do projeto')
        }
    };

    const checkTarefaLinkedToProjeto = async (id) => {
        if(id > 0){
            try {
                const tarefasTemp = [];

                const response = await fetch('http://localhost:8080/api/tarefas');

                const dados = await response.json();
                console.log(dados)

                if(dados.length > 0){

                    for(let i = 0; i < dados.length; i++){
                        if(dados[i].projetoId === id){

                            console.log(`Projeto (id: ${id}) tem tarefa id: ${dados[i].id}`);
                            //console.log(dados[i].projetoId);
                            tarefasTemp.push(dados[i]);
                        } else{
                            console.log(`projeto (id: ${id}) NÃO tem tarefa id: ${dados[i].id}`)
                        }
                    }

                    setTarefasLinked(tarefasTemp);
                } else {
                    console.log('dados vazios');
                }

            } catch (error) {
                console.log(error)
            }
        }
    };

    const excluirTarefasLinkedToProjeto = async () => {

        for(let i = 0; i < tarefasLinked.length; i++){
            try {
                const response = await fetch(`http://localhost:8080/api/tarefas/${tarefasLinked[i].id}`, {
                    method: 'DELETE'
                });

                if(response.ok){
                    console.log('Tarefa excluída');
                } else{
                    console.log('Erro ao excluir tarefa');
                }

            } catch (error) {
                console.log(error);
            }

        }
    };

    const salvar = async () => {

        const projetoCad = projeto;

        try {
            const response = await fetch('http://localhost:8080/api/projetos', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(projetoCad)
            });

            const dados = await response.json();
            console.log(dados);
            alert('projeto Cadastrado com sucesso');

        } catch (error) {
            console.log(error);
            alert('Erro no cadastro do projeto');
        }
    };

    const editar = async (id) => {

        const projetoEditar = projeto;

        try{
            const response = await fetch(`http://localhost:8080/api/projetos/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(projetoEditar)
            })

            const dados = await response.json();
            console.log(dados);
            alert('Projeto editado com sucesso')
        }catch(error){
            console.log(error);
        }
    };

    const excluir = async (id) => {
        try{
            const response = await fetch(`http://localhost:8080/api/projetos/${id}`, {
                method: 'DELETE',
            })

            if (response.ok){
                alert('Projeto excluído com sucesso');
            } else{
                alert('Erro ao excluir projeto');
            }
        }catch(error){
            console.log(error);
        }
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        } else{
            if(projeto.responsavelId === 0){
                event.preventDefault();
                event.stopPropagation();
                alert('Por favor selecione um responsavel');

            } else{
                editMode ? editar(projetoId) :salvar();
            }
        }

        setFormValido(true);
    };

    return(
        <div className="d-md-flex flex-md-wrap flex-column align-content-center">
            <div className="my-4">
                    <Button onClick={() => {
                        setShowCad(true);
                        setEditMode(false);
                    }}>Cadastrar</Button></div>

            <div className="d-md-flex flex-wrap my-3 justify-content-center">
                {
                    projetos.map((project) => (
                        <Card key={project.id} className="mx-2 my-2 col-3">
                            <Card.Header>{project.id} - {project.nome}</Card.Header>
                            <Card.Body>
                                <div>Data de Criação: {project.dtCriacao}</div>
                                <div>Data de Conclusão: {project.dtConclusao}</div>
                                <div>Status: {project.status}</div>
                                <div>Id do Responsavel: {project.responsavelId}</div>
                                <div className="mt-3">
                                    <Button className="mx-1" variant="success" onClick={() => {
                                            setShowCad(true);
                                            setProjetoId(project.id);
                                            setEditMode(true);
                                            getProjeto(project.id);
                                        }}>Editar</Button>
                                    <Button className="mx-1" variant="danger" onClick={() => {
                                            setShowDel(true);
                                            setProjetoId(project.id);
                                            checkTarefaLinkedToProjeto(project.id)
                                        }}>Excluir</Button>
                                </div>
                            </Card.Body>
                        </Card>))
                }
            </div>

            <Modal centered backdrop={"static"} size="lg" show={showCad} onShow={() => {mostrarUsuarios()}} onHide={()=>setShowCad(false)}>
                <Modal.Header closeButton>
                    <h2 className="d-md-flex">Cadastro de Projetos</h2>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={formValido} onSubmit={handleSubmit} className="p-md-1">
                        <Form.Group className="mt-1">
                            <FloatingLabel className="mt-1" controlId="nome" label="Nome do Projeto">
                                <Form.Control required id="nome" name="nome" value={projeto.nome} type="text" placeholder='' onChange={handleChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group>
                            <FloatingLabel controlId="descricao" label="Descrição">
                                <Form.Control required id="descricao" name="descricao" value={projeto.descricao} as="textarea" rows={3} onChange={handleChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col} xs={6} className="m-md-0">
                                <FloatingLabel controlId="dtCriacao" className="m-md-0" label="Data de Criação">
                                    <Form.Control required id="dtCriacao" name="dtCriacao" value={projeto.dtCriacao} type="date" onChange={handleChange}></Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} xs={6} className="m-md-0">
                                <FloatingLabel controlId="dtConclusao" className="m-md-0" label="Data de Conclusão">
                                    <Form.Control required id="dtConclusao" name="dtConclusao" value={projeto.dtConclusao} type="date" onChange={handleChange}></Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group as={Col} xs={6} className="m-md-0">
                                <FloatingLabel controlId="status" label="Status do Projeto">
                                    <Form.Select required id="status" name="status" value={projeto.status} onChange={handleChange}>
                                        <option value="emAndamento">Em Andamento</option>
                                        <option value="pendente">Pendente</option>
                                        <option value="concluido">Concluído</option>
                                        <option value="cancelado">Cancelado</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                    
                            <Form.Group as={Col} xs={6} className="m-md-0">
                                <FloatingLabel controlId="responsavel" label="Responsável pelo Projeto">
                                    <Form.Select required id="responsavel" name="responsavelId" value={projeto.responsavelId} onChange={handleChange}>
                                        <option value={0} hidden>Escolha um projeto</option>
                                        {
                                            users.map((user) => (<option value={user.id} >{user.id}-{user.nome}</option>))
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
                <Modal.Body>
                <Form onSubmit={() => {
                    excluirTarefasLinkedToProjeto();
                    excluir(projetoId)
                    }}>
                    <div>Deseja realmente excluir esse projeto?</div>
                        <div className="d-sm-flex flex-column">
                            <Button variant="danger" className="mb-2" type="submit">Excluir</Button>
                            <Button variant="outline-success" onClick={() => {setShowDel(false)}}>Cancelar</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Projetos