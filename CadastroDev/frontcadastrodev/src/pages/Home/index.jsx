import { useEffect, useState, useRef } from 'react'
import './style.css'
import Lixeira from '../../assets/LixeirinhaPequena.png'
import api from '../../services/api.js'

function Home() {
  const [users, setUsers] = useState([]) // useState para atualizar tela

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    try {
      const response = await api.get('/usuarios')
      setUsers(response.data) // atualiza estado
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    }
  }

  async function creatUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
  }

  getUsers() 

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)

  }

  getUsers()

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}/>
        <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
        <input placeholder='E-mail' name='email' type='email' ref={inputEmail}/>
        <button type='button' onClick={creatUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={ () => deleteUsers(user.id)}>
            <img src={Lixeira} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
