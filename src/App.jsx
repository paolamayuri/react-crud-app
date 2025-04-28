import { useState, useEffect } from "react"
import useUsers from "./utils/hooks/useUsers"
import API from "./utils/api"

export default function App() {
  const { users, loading, getUsers } = useUsers()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [editingUser, setEditingUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { name, email }

    try {
      if (editingUser) {
        await API.put(`/users/${editingUser.id}`, data)
        setEditingUser(null)
      } else {
        await API.post('/users', data)
      }
      setName("")
      setEmail("")
      getUsers()
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setName(user.name)
    setEmail(user.email)
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`)
      getUsers()
    } catch (error) {
      console.error('Erro ao excluir usuário:', error)
    }
  }

  if (loading) return <p>Carregando usuários...</p>

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciamento de Usuários</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginLeft: "10px" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          {editingUser ? "Atualizar" : "Adicionar"}
        </button>
      </form>

      {users?.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: "10px" }}>
              {user.name} - {user.email}
              <button onClick={() => handleEdit(user)} style={{ marginLeft: "10px" }}>
                Editar
              </button>
              <button onClick={() => handleDelete(user.id)} style={{ marginLeft: "5px" }}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
