import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTarefas } from '../contexts/TarefasContext'

function FormNovaTarefa({ projetoId }) {
  const navigate = useNavigate()
  const { adicionarTarefa } = useTarefas()

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState('media')

  function handleSubmit(evento) {
    evento.preventDefault()

    if (!titulo.trim()) {
      return
    }

    // Ao salvar, criamos a tarefa no Context e redirecionamos para detalhes.
    const tarefaId = adicionarTarefa({
      projetoId,
      titulo,
      descricao,
      prioridade,
    })

    setTitulo('')
    setDescricao('')
    setPrioridade('media')

    navigate(`/tarefa/${tarefaId}`)
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h3>Nova tarefa</h3>

      <label htmlFor="titulo">Titulo</label>
      <input
        id="titulo"
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
        placeholder="Ex: Criar endpoint de login"
        required
      />

      <label htmlFor="descricao">Descricao</label>
      <textarea
        id="descricao"
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        rows={3}
        placeholder="Detalhes da tarefa"
      />

      <label htmlFor="prioridade">Prioridade</label>
      <select
        id="prioridade"
        value={prioridade}
        onChange={(evento) => setPrioridade(evento.target.value)}
      >
        <option value="baixa">Baixa</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <button className="botao" type="submit">
        Salvar tarefa
      </button>
    </form>
  )
}

export default FormNovaTarefa