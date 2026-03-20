<<<<<<< HEAD
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TarefaCard({ tarefa, onDragStart, onDragEnd, estaArrastando, onSalvarEdicao }) {
  const navigate = useNavigate()
  const quantidadeLogs = Array.isArray(tarefa.logs) ? tarefa.logs.length : 0
  const prioridade = (tarefa.prioridade || 'media').toUpperCase()
  const [editando, setEditando] = useState(false)
  const [tituloEditado, setTituloEditado] = useState(tarefa.titulo)
  const [prioridadeEditada, setPrioridadeEditada] = useState(tarefa.prioridade || 'media')

  function abrirDetalhes() {
    if (!editando) {
      navigate(`/tarefa/${tarefa.id}`)
    }
  }

  function salvar(evento) {
    evento.preventDefault()
    onSalvarEdicao?.(tarefa.id, {
      titulo: tituloEditado,
      prioridade: prioridadeEditada,
    })
    setEditando(false)
  }

  function iniciarEdicao(evento) {
    evento.stopPropagation()
    setEditando(true)
  }

  return (
    <article
      className={`tarefa-card tarefa-card--${tarefa.prioridade} ${estaArrastando ? 'tarefa-card--arrastando' : ''}`}
      draggable
      onDragStart={(evento) => onDragStart?.(evento, tarefa.id)}
      onDragEnd={onDragEnd}
      onClick={abrirDetalhes}
      role="button"
      tabIndex={0}
      onKeyDown={(evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
          evento.preventDefault()
          abrirDetalhes()
        }
      }}
    >
      {editando ? (
        <form className="tarefa-card__edicao" onSubmit={salvar} onClick={(evento) => evento.stopPropagation()}>
          <label htmlFor={`titulo-${tarefa.id}`}>Titulo</label>
          <input
            id={`titulo-${tarefa.id}`}
            value={tituloEditado}
            onChange={(evento) => setTituloEditado(evento.target.value)}
            required
          />

          <label htmlFor={`prioridade-${tarefa.id}`}>Prioridade</label>
          <select
            id={`prioridade-${tarefa.id}`}
            value={prioridadeEditada}
            onChange={(evento) => setPrioridadeEditada(evento.target.value)}
          >
            <option value="baixa">BAIXA</option>
            <option value="media">MEDIA</option>
            <option value="alta">ALTA</option>
          </select>

          <div className="tarefa-card__acoes">
            <button className="botao" type="submit">
              Salvar
            </button>
            <button
              className="botao botao--secundario"
              type="button"
              onClick={() => {
                setEditando(false)
                setTituloEditado(tarefa.titulo)
                setPrioridadeEditada(tarefa.prioridade || 'media')
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="tarefa-card__link">
          <h4>{tarefa.titulo}</h4>

          <p>
            Prioridade: <strong>{prioridade}</strong>
          </p>

          <p>{quantidadeLogs} atualizacoes registradas</p>

          <button className="botao botao--secundario" type="button" onClick={iniciarEdicao}>
            Editar rapido
          </button>
        </div>
      )}
=======
import { Link } from 'react-router-dom'

function TarefaCard({ tarefa }) {
  const quantidadeLogs = Array.isArray(tarefa.logs) ? tarefa.logs.length : 0

  return (
    <article className={`tarefa-card tarefa-card--${tarefa.prioridade}`}>
      <h4>{tarefa.titulo}</h4>

      <p>
        Prioridade: <strong>{tarefa.prioridade}</strong>
      </p>

      <p>{quantidadeLogs} atualizacoes registradas</p>

      {/* Link direciona para tela de detalhes usando id dinamico */}
      <Link className="botao" to={`/tarefa/${tarefa.id}`}>
        Ver detalhes
      </Link>
>>>>>>> c9ce0b4c7ed7d23330e5294b6f7f26a7e82ded40
    </article>
  )
}

export default TarefaCard