import { useState } from 'react'
import TarefaCard from './TarefaCard'

function ColunaKanban({
  titulo,
  status,
  tarefas,
  moverTarefa,
  tarefaArrastandoId,
  setTarefaArrastandoId,
  atualizarTarefa,
}) {
  // filter garante que cada coluna mostre apenas seu status.
  const tarefasDaColuna = tarefas.filter((tarefa) => tarefa.status === status)
  const [arrastandoPorCima, setArrastandoPorCima] = useState(false)

  function aoSoltar(evento) {
    evento.preventDefault()
    setArrastandoPorCima(false)

    const tarefaId = evento.dataTransfer.getData('text/plain')
    if (!tarefaId) {
      return
    }

    moverTarefa(tarefaId, status)
    setTarefaArrastandoId(null)
  }

  return (
    <section
      className={`coluna ${arrastandoPorCima ? 'coluna--arrastando' : ''}`}
      onDragOver={(evento) => {
        evento.preventDefault()
        setArrastandoPorCima(true)
      }}
      onDragLeave={() => setArrastandoPorCima(false)}
      onDrop={aoSoltar}
    >
      <div className="coluna__topo">
        <h3>{titulo}</h3>
        <span className="badge">{tarefasDaColuna.length}</span>
      </div>

      <div className="coluna__lista">
        {arrastandoPorCima ? <div className="drop-placeholder">Solte aqui para mover</div> : null}

        {tarefasDaColuna.length === 0 ? (
          <p className="mensagem-vazia">Sem tarefas nesta coluna.</p>
        ) : (
          tarefasDaColuna.map((tarefa) => (
            <TarefaCard
              key={tarefa.id}
              tarefa={tarefa}
              onDragStart={(evento, tarefaId) => {
                evento.dataTransfer.effectAllowed = 'move'
                evento.dataTransfer.setData('text/plain', tarefaId)
                setTarefaArrastandoId(tarefaId)
              }}
              onDragEnd={() => setTarefaArrastandoId(null)}
              estaArrastando={tarefaArrastandoId === tarefa.id}
              onSalvarEdicao={atualizarTarefa}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default ColunaKanban