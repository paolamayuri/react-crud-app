import { useEffect, useState } from "react"
import API from "../api"

export default function useUsers() {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUsers = async () => {
    try {
      const response = await API.get('/users')
      setUsers(response.data || [])
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  const getUserById = async (id) => {
    try {
      const response = await API.get(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return { users, loading, getUsers, getUserById }
}
