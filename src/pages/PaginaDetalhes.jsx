import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useTarefas } from '../contexts/TarefasContext'

function PaginaDetalhes() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { obterTarefaPorId, obterProjetoPorId, moverTarefa, removerTarefa } = useTarefas()

  const tarefa = obterTarefaPorId(id)
  const projeto = tarefa ? obterProjetoPorId(tarefa.projetoId) : null

  if (!tarefa) {
    return (
      <>
        <Header />
        <main className="pagina">
          <p>Tarefa nao encontrada.</p>
          <Link className="botao" to="/">
            Voltar
          </Link>
        </main>
      </>
    )
  }

  function irParaStatus(status) {
    moverTarefa(tarefa.id, status)
  }

  function apagarTarefa() {
    removerTarefa(tarefa.id)
    navigate(projeto ? `/projeto/${projeto.id}` : '/')
  }

  return (
    <>
      <Header projetoAtualId={projeto?.id} />

      <main className="pagina">
        <section className="secao">
          <h2>{tarefa.titulo}</h2>
          <p>{tarefa.descricao || 'Sem descricao.'}</p>

          <p>
            Projeto: <strong>{projeto?.nome || 'Projeto removido'}</strong>
          </p>

          <p>
            Status atual: <strong>{tarefa.status}</strong>
          </p>

          <p>
            Prioridade: <strong>{tarefa.prioridade}</strong>
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="botao" onClick={() => irParaStatus('a_fazer')}>
              Mover para A Fazer
            </button>
            <button className="botao" onClick={() => irParaStatus('progresso')}>
              Mover para Em Progresso
            </button>
            <button className="botao" onClick={() => irParaStatus('concluido')}>
              Mover para Concluido
            </button>
            <button className="botao botao--perigo" onClick={apagarTarefa}>
              Remover tarefa
            </button>
          </div>
        </section>

        <section className="secao secao--formulario">
          <h3>Historico de logs</h3>

          {tarefa.logs?.length ? (
            <ul>
              {tarefa.logs.map((log) => (
                <li key={log.id}>
                  <strong>{new Date(log.criadoEm).toLocaleString('pt-BR')}:</strong> {log.texto}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem logs registrados.</p>
          )}
        </section>
      </main>
    </>
  )
}

export default PaginaDetalhes