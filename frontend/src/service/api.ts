import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/' // Altere para a URL da sua API
})

export default api
