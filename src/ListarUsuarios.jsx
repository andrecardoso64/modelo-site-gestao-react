import { useState, useEffect } from "react"

//Note: This works

function ListarUsuarios(){

    const [users, setUsers] = useState([])

    //https://jsonplaceholder.typicode.com/users
    //https://spring-boot-treina-recife-turma-11-production.up.railway.app/api/v1/swagger-ui/index.html

    const mostrarUsuarios = async () => {
        try {
            const usuarios = await fetch('https://spring-boot-treina-recife-turma-11-production.up.railway.app/api/v1/public/usuarios');
            const dados = await usuarios.json();
            console.log(dados);
            setUsers(dados.content);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {mostrarUsuarios()}, [])
    
    /*fetch('https://spring-boot-treina-recife-turma-11-production.up.railway.app/api/v1/public/usuarios').then((resp) => resp.json()).then((data) => setUsuario(data));

    });*/

    return (
        <div>
            <div><h2>Lista de Usuarios</h2></div>
            <ul>
                {
                    users.map((user) => (<li>{user.id}-{user.nome}</li>))
                }
            </ul>
        </div>
    )
}

export default ListarUsuarios