import axios from 'axios'

const API = axios.create({
  baseURL: 'https://gnosys-task.onrender.com/api'
})

export default API