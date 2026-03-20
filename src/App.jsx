import './App.css'
import { Route, Routes } from 'react-router-dom'
import PaginaDetalhes from './pages/PaginaDetalhes'
import PaginaInicio from './pages/PaginaInicio'
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada'
import PaginaProjeto from './pages/PaginaProjeto'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/projetos" element={<PaginaInicio />} />
      <Route path="/projeto/:id" element={<PaginaProjeto />} />
      <Route path="/tarefa/:id" element={<PaginaDetalhes />} />
      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
  )
}

export default App
