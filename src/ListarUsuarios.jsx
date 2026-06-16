//import { useState, useEffect } from "react"

//Note: This works

function ListarUsuarios(){

    //const [usuario, setUsuario] = useState([])

    //https://jsonplaceholder.typicode.com/users
    //https://spring-boot-treina-recife-turma-11-production.up.railway.app/api/v1/swagger-ui/index.html

    /*useEffect(() => {
        fetch('jsonplaceholder.typicode.com/users').then((resp) => resp.json()).then((data) => setUsuario(data));
    }, []);*/
    

    return (
        <div>
            <div><h2>Lista de Usuarios</h2></div>
            <ul>
                {/*usuario.map((user) => (<li>{user.nome}</li>))*/}
            </ul>
        </div>
    )
}

export default ListarUsuarios