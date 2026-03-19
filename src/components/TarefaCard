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
    </article>
  )
}

export default TarefaCard