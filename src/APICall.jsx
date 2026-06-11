import { useState, useEffect } from "react"

//Note: This works

function APICall(){

    const [usuario, setUsuario] = useState([])

    //https://jsonplaceholder.typicode.com/users

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users').then((resp) => resp.json()).then((data) => setUsuario(data));
    })
    

    return (
        <div>
            <ul>
                {usuario.map((user) => (<li>{user.name}</li>))}
            </ul>
        </div>
    )
}

export default APICall