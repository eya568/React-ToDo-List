import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import ToDoList from './ToDoList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDoList />
  </StrictMode>,
)
