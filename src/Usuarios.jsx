import { useState, useEffect } from "react"
import { Form, FloatingLabel, Button, Modal, Card} from "react-bootstrap"
import { InputMask } from "@react-input/mask";
import './style.css';

function Usuarios(){

    const [formValido, setFormValido] = useState(false); //validates the main form
    const [deletionValido, setDeletionValido] = useState(false); //validates the selects in the modal for deletion
    const [counter, setCounter] = useState(0); //counter for the number of selects submitted in the modal for deletion

    const [buttons, setButtons] = useState([]); //list of buttons in the modal for deletion
    const [selectHidden, setSelectHidden] = useState(true);
    const [divHidden, setDivHidden] = useState(false);
    const [excluirHidden, setExcluirHidden] = useState(true); //hides the delete button

    const [showCad, setShowCad] = useState(false);
    const [showDel, setShowDel] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [usuarioId, setUsuarioId] = useState(0);

    const [users, setUsers] = useState([]);

    const [usuario, setUsuario] = useState({
        nome: "",
        cpf: "",
        email: "",
        dtNascimento: "",
        status: "ativo",
        senha: "",
    })

    const [projeto, setProjeto] = useState({
        nome: "",
        descricao: "",
        dtCriacao: "",
        dtConclusao: "",
        status: "",
        responsavelId: 0,
    });

    const [tarefa, setTarefa] = useState({
        titulo:"",
        prioridade:"",
        descricao:"",
        dtCriacao:"",
        dtConclusao:"",
        status:"",
        responsavelId: 0,
        projetoId: 0,
    })

    const [projetosLinked, setProjetosLinked] = useState([]);
    const [tarefasLinked, setTarefasLinked] = useState([]);


    const mostrarUsuarios = async () => {
        try {
            const usuarios = await fetch('http://localhost:8080/api/usuarios');
            const dados = await usuarios.json();
            setUsers(dados);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {mostrarUsuarios()}, [])

    const getUsuario = async(usuarioId) => {

        try{
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`);

            const dados = await response.json();
            console.log(dados);

            setUsuarioId(usuarioId);

            setUsuario((prevState) => ({...prevState, ...dados}))
            
        }catch(error){
            console.log(error)
        }
    }

    
    const getProjeto = async (projetoId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/projetos/${projetoId}`);

            const dados = await response.json();
            
            setProjeto((prevState) => ({...prevState,...dados}));

        } catch (error) {
            console.log(error);
            alert('Erro ao pegar dados do projeto')
        }
    };

    const getTarefa = async (tarefaId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/tarefas/${tarefaId}`);

            const dados = await response.json();
            
            setTarefa((prevState) => ({...prevState,...dados}));

        } catch (error) {
            console.log(error);
            alert('Erro ao pegar dados do projeto')
        }
    };

    const salvar = async () => {

        const usuarioCad = usuario;

        try {
            
            const response = await fetch('http://localhost:8080/api/usuarios', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuarioCad)
            });

            const dados = await response.json();
            alert('Usuario Cadastrado com sucesso');

        } catch (error) {
            console.log(error);
            alert('Erro no cadastro do usuario');
        }
    };

    const editar = async (responsavelId) => {
        const usuarioEd = usuario;

        try{
            const response = await fetch(`http://localhost:8080/api/usuarios/${responsavelId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(usuarioEd)
            })

            const dados = await response.json();
            console.log(dados);
            alert('Usuario editado com sucesso')
        }catch(error){
            console.log(error);
        }
    };

    const checkProjetosLinkedToUsuario = async (responsavelId) => {
        if(responsavelId > 0){
            try {
                const projetosTemp = [];

                const response = await fetch('http://localhost:8080/api/projetos');

                const dados = await response.json();

                for(let i = 0; i < dados.length; i++){
                    if(dados[i].responsavelId === responsavelId){ 
                        projetosTemp.push(dados[i]);
                    }
                }

                setProjetosLinked(projetosTemp);

            } catch (error) {
                console.log(error)
            }
        }
    };

    const checkTarefasLinkedToUsuario = async (responsavelId) => {
        if(responsavelId > 0){
            try {
                const tarefasTemp = [];

                const response = await fetch('http://localhost:8080/api/tarefas');

                const dados = await response.json();

                for(let i = 0; i < dados.length; i++){
                    if(dados[i].responsavelId === responsavelId){
                        tarefasTemp.push(dados[i]);
                    }
                }

                setTarefasLinked(tarefasTemp);

            } catch (error) {
                console.log(error);
            }
        }
    };

    //edits the user responsible for the project
    const putNewResponsavelProjeto = async (projetoId, newResponsavelId) => {

        const projetoPut = projeto;
        projetoPut.responsavelId = newResponsavelId;

        try {

            const response = await fetch(`http://localhost:8080/api/projetos/${projetoId}`,{
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(projetoPut)
            });

            const dados = await response.json();
            if(dados.status === 500){
                alert('Erro ao atualizar responsavel do projeto');
            } else {
                alert('Projeto alterado com sucesso');
            }

            } catch (error) {
                console.log(error);
                console.log('Erro ao atualizar responsavel do projeto');
            }
    };

    //edits the user responsible for the task
    const putNewResponsavelTarefa = async (tarefaId, newResponsavelId) => {

        const tarefaPut = tarefa;
        tarefaPut.responsavelId = newResponsavelId;

        try {

            const response = await fetch(`http://localhost:8080/api/tarefas/${tarefaId}`,{
                method: 'PUT',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(tarefaPut)
            });

            const dados = await response.json();
            if(dados.status === 500){
                alert('Erro no servidor ao atualizar responsavel da tarefa');
            } else {
                alert('Tarefa alterada com sucesso');
            }

            } catch (error) {
                console.log(error);
                console.log('Erro ao atualizar responsavel da tarefa')
            }
    }

    const excluir = async (usuarioId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
                method: 'DELETE',
            })

            if(response.ok){
                alert('Usuario excluido com sucesso');
            }else{
                alert('Erro no servidor')
            }
            
        } catch (error) {
            console.log(error);
            alert('Erro ao exluir usuário');
        }
    };

    const handleChange = (e) => {
        setUsuario((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        } else{
            editMode ? editar(usuarioId) : salvar();
        }

        setFormValido(true);
    };

    return (
        <div className="d-md-flex flex-md-wrap flex-column align-content-center">
            <h2 className="d-md-flex justify-content-center">Lista de Usuarios</h2>
            <div className="my-4">
                <Button onClick={() => {
                    setShowCad(true);
                    setEditMode(false);
                }}>Cadastrar</Button></div>
            <div className="d-md-flex flex-wrap my-3 justify-content-center">
                {
                    users.map((user) => (
                        <Card key={user.id} className="mx-2 my-2 col-3">
                            <Card.Header>{user.id} - {user.nome}</Card.Header>
                            <Card.Body>
                                <div>CPF: {user.cpf}</div>
                                <div>E-mail: {user.email}</div>
                                <div>Status: {user.status}</div>
                                <div className="mt-3">
                                    <Button className="mx-1" variant="success" onClick={() => {
                                        setShowCad(true);
                                        setEditMode(true);
                                        getUsuario(user.id);
                                        setUsuarioId(user.id);
                                    }}>Editar</Button>
                                    <Button className="mx-1" variant="danger" onClick={() => {
                                        setShowDel(true);
                                        setUsuarioId(user.id);
                                    }}>Excluir</Button>
                                </div>
                            </Card.Body>
                        </Card>))
                }
            </div>

            <Modal centered backdrop={"static"} size="lg" show={showCad} onHide={()=>setShowCad(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de Usuários</Modal.Title>
            </Modal.Header>

            <Modal.Body className="d-md-flex justify-content-center">

                <Form noValidate validated={formValido} onSubmit={handleSubmit} className="p-md-1">

                    <Form.Group id="campoNome" className="mt-1">
                        <FloatingLabel className="mt-1" controlId="nome" label="Nome">
                            <Form.Control type="text" required name="nome" placeholder='' value={usuario.nome} onChange={handleChange}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group id="campoCpf">
                        <FloatingLabel controlId="cpf" label="CPF">
                            <InputMask minLength={14} required name="cpf" type="text" placeholder='' value={usuario.cpf} onChange={handleChange} className="form-control" mask="___.___.___-__" replacement={{ _: /\d/ }} separate></InputMask>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group id="campoEmail">
                        <FloatingLabel controlId="email" label="E-mail">
                            <Form.Control required name="email" type="text" placeholder='' value={usuario.email} onChange={handleChange}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group id="campoDtNascimento">
                        <FloatingLabel controlId="dtNascimento" label="Data de Nascimento">
                            <Form.Control required name="dtNascimento" type="date" value={usuario.dtNascimento} onChange={handleChange}></Form.Control>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group id="campoStatus">
                        <FloatingLabel controlId="status" label="Status">
                            <Form.Select required name="status" value={usuario.status} onChange={handleChange}>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                                <option value="bloqueado">Bloqueado</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group id="campoSenha">
                        <FloatingLabel controlId="senha" label="Senha" className="mb-0">
                            <Form.Control required name="senha" minLength={8} maxLength={20} type="password" placeholder='' value={usuario.senha} onChange={handleChange}></Form.Control>
                        </FloatingLabel>
                        <Form.Text id="helpSenha" className="d-sm-flex justify-content-start">Sua senha deve ter de 8 a 20 caracteres, contendo letras e numeros, e não deve ter espaços, caracteres especiais, ou emojis.</Form.Text>
                    </Form.Group>

                    <Form.Group className="d-md-flex flex-column">
                        <Button variant="success" type="submit" className="mb-2">Cadastrar</Button>
                        <Button variant="outline-danger" onClick={() => {setShowCad(false)}}>Cancelar</Button>
                    </Form.Group>

                    </Form>

                    </Modal.Body>
                </Modal>

                <Modal centered show={showDel} backdrop={'static'} onShow={() => {
                    checkProjetosLinkedToUsuario(usuarioId);
                    checkTarefasLinkedToUsuario(usuarioId);
                }} onHide={()=>{
                    setShowDel(false);
                    setDeletionValido(false);
                    setProjetosLinked([]);
                    setDivHidden(false);
                    setExcluirHidden(true);
                    setSelectHidden(true);
                    }}>

                    <Modal.Header><Modal.Title>Exclusão de Usuario</Modal.Title></Modal.Header>

                    <Modal.Body>
                        <div onChange={(event) => {
                            const forms = event.currentTarget.children;
                            const buttonTemp = [];

                            //pushes the buttons of the modal into a temporary list
                            for(let i = 0; i < forms.length; i++){
                                const buttonElement = forms[i].lastChild.firstChild
                                buttonTemp.push(buttonElement);
                            }

                            setButtons(buttonTemp);

                        }}>
                            <div hidden={divHidden} onChange={(event) => {

                                const selectElementValue = event.currentTarget.children[1].firstChild.value;
                                const buttonElement = event.currentTarget.lastChild.lastChild;

                                if(selectElementValue === "y"){
                                    buttonElement.hidden = false;
                                } else{
                                    alert('Cancelamento de usuário cancelado')
                                    setShowDel(false);
                                }
                            }}>

                                <div>
                                    <h2>ATENÇÃO</h2>
                                    <p>Os seguintes procedimentos serão aplicados à exclusão:</p>
                                    <ul>
                                        <li className="text-justify">O seguinte procedimento exigirá a realocação dos responsáveis dos projetos e das tarefas relacionadas a este usuário, se houver</li>
                                        <li className="text-justify">Após a confirmação não será possível cancelar pela interface do site</li>
                                    </ul>
                                    <p>Deseja Realmente excluir esse usuario</p>
                                </div>

                                <div><Form.Select>
                                        <option value="" hidden>Selecione uma opção</option>
                                        <option value="y">Sim</option>
                                        <option value="n">Não</option>
                                    </Form.Select>
                                </div>

                                <div className="mt-3"><Button variant="danger" hidden onClick={() => {
                                    setSelectHidden(false);
                                    setDivHidden(true);
                                    setExcluirHidden(false);
                                    }}>Confirmar escolha</Button>
                                </div>

                            </div>
                            {projetosLinked.map((projeto) => (
                                <Form noValidate validated={deletionValido} onChange={(event) => {

                                    getProjeto(projeto.id);

                                    const select = event.currentTarget.children[1].firstChild;

                                    //Hide Buttons that dont have same id as the current form Select
                                    for(let i = 0; i < buttons.length; i++){
                                     if(buttons[i].id !== select.id){
                                        buttons[i].hidden = true;
                                    }else{
                                        buttons[i].hidden = false
                                    }
                                    }

                                }} onSubmit={(event) => {
                                    if(event.currentTarget.checkValidity() === false){
                                        event.preventDefault();
                                        event.stopPropagation();
                                    } else{
                                        if(projeto.responsavelId === usuarioId){
                                            event.preventDefault();
                                            event.stopPropagation();
                                        } else{
                                            putNewResponsavelProjeto(projeto.id, projeto.responsavelId);
                                            event.preventDefault();
                                        }
                                    }
                                    setDeletionValido(true);
                                }}>
                                    <div hidden={selectHidden}>Selecione um novo usuário para o projeto {projeto.nome}</div>
                                    <Form.Group>
                                        <Form.Select id={projeto.id} required hidden={selectHidden} onChange={(event) => {
                                            projeto.responsavelId = event.target.value;
                                        }}>

                                            <option value="" hidden>Selecione um responsavel</option>
                                            {users.map((user) => (user.id === usuarioId ? '' :
                                                <option value={user.id}>
                                                    {user.id} - {user.nome}
                                                </option>
                                            ))}

                                        </Form.Select>
                                    </Form.Group>

                                    <div>
                                        <Button type="submit" id={projeto.id} hidden variant="success" onClick={() => setCounter(counter+1)}>Confirmar</Button>
                                    </div>
                                </Form>
                            ))}

                                {tarefasLinked.map((tarefa) => (
                                <Form noValidate validated={deletionValido} onChange={(event) => {

                                    getTarefa(tarefa.id);

                                    const select = event.currentTarget.children[1].firstChild;

                                    //Hide Buttons that dont have same id as the current form Select
                                    for(let i = 0; i < buttons.length; i++){
                                     if(buttons[i].id !== select.id){
                                        buttons[i].hidden = true;
                                    }else{
                                        buttons[i].hidden = false
                                    }
                                    }

                                }} onSubmit={(event) => {
                                    if(event.currentTarget.checkValidity() === false){
                                        event.preventDefault();
                                        event.stopPropagation();
                                    } else{
                                        if(tarefa.responsavelId === usuarioId){
                                            event.preventDefault();
                                            event.stopPropagation();
                                        } else{
                                            putNewResponsavelTarefa(tarefa.id, tarefa.responsavelId);
                                            event.preventDefault();
                                        }
                                    }
                                    setDeletionValido(true);
                                }}>
                                    <div hidden={selectHidden}>Selecione um novo responsável para tarefa {tarefa.titulo}</div>
                                    <Form.Group>
                                        <Form.Select id={tarefa.id} required hidden={selectHidden} onChange={(event) => {
                                            tarefa.responsavelId = event.target.value;
                                            }}>
                                                        <option value="" hidden>Selecione um responsavel</option>
                                            {users.map((user) => (user.id === usuarioId ? '' :
                                                <option value={user.id}>
                                                    {user.id} - {user.nome}
                                                </option>))}
                                        </Form.Select>
                                    </Form.Group>
                                    <div>
                                        <Button type="submit" id={tarefa.id} hidden variant="success" onClick={() => setCounter(counter+1)}>Confirmar</Button>
                                        </div>
                                </Form>))}
                        </div>
                        <div>
                            <Button variant="danger" hidden={excluirHidden} onClick={() => {
                                if(counter >= (projetosLinked.length + tarefasLinked.length)){
                                    excluir(usuarioId);
                                    setShowDel(false);
                                } else {
                                    alert('Preencha os outros campos');
                                }
                            }}>Excluir</Button>
                        </div>
                    </Modal.Body>
                </Modal>
        </div>
)
}

export default Usuarios