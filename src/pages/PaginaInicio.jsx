import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import FormNovoProjeto from '../components/FormNovoProjeto'
import Header from '../components/Header'
import { useTarefas } from '../contexts/TarefasContext'

function PaginaInicio() {
  const navigate = useNavigate()
  const { projetos, tarefas } = useTarefas()

  const contagemPorProjeto = useMemo(() => {
    return tarefas.reduce((acumulador, tarefa) => {
      if (!acumulador[tarefa.projetoId]) {
        acumulador[tarefa.projetoId] = { total: 0, concluidas: 0 }
      }

      acumulador[tarefa.projetoId].total += 1
      if (tarefa.status === 'concluido') {
        acumulador[tarefa.projetoId].concluidas += 1
      }

      return acumulador
    }, {})
  }, [tarefas])

  return (
    <>
      <Header />

      <main className="pagina pagina--inicio">
        <section className="secao secao--formulario">
          <h2>Novo projeto</h2>
          <FormNovoProjeto />
        </section>

        <section className="secao">
          <h2>Projetos cadastrados</h2>

          {projetos.length === 0 ? (
            <p className="mensagem-vazia">NENHUM projeto ainda. Crie o primeiro acima.</p>
          ) : (
            <div className="grade-projetos">
              {projetos.map((projeto) => {
                const contagem = contagemPorProjeto[projeto.id] || { total: 0, concluidas: 0 }

                return (
                  <article
                    key={projeto.id}
                    className="card-projeto"
                    onClick={() => navigate(`/projeto/${projeto.id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(evento) => {
                      if (evento.key === 'Enter' || evento.key === ' ') {
                        navigate(`/projeto/${projeto.id}`)
                      }
                    }}
                  >
                    <h3>{projeto.nome}</h3>
                    <p>{projeto.descricao || 'Sem descricao.'}</p>

                    <div className="badges">
                      <span className="badge">Total: {contagem.total}</span>
                      <span className="badge">Concluidas: {contagem.concluidas}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default PaginaInicio