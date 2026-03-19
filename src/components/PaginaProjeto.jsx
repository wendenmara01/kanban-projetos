import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ColunaKanban from '../components/ColunaKanban'
import FormNovaTarefa from '../components/FormNovaTarefa'
import Header from '../components/Header'
import { useTarefas } from '../contexts/TarefasContext'

function PaginaProjeto() {
  const { id } = useParams()
  const { tarefas, obterProjetoPorId } = useTarefas()

  const projeto = obterProjetoPorId(id)

  const tarefasProjeto = useMemo(
    () => tarefas.filter((tarefa) => tarefa.projetoId === id),
    [tarefas, id],
  )

  if (!projeto) {
    return (
      <>
        <Header />
        <main className="pagina">
          <p>Projeto nao encontrado.</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Header projetoAtualId={id} />

      <main className="pagina pagina--projeto">
        <section className="cabecalho-projeto">
          <h2>{projeto.nome}</h2>
          <p>{projeto.descricao || 'Sem descricao.'}</p>
        </section>

        <section className="kanban-grid">
          {/* Cada coluna recebe SOMENTE tarefas do status correspondente */}
          <ColunaKanban titulo="A Fazer" status="a_fazer" tarefas={tarefasProjeto} />
          <ColunaKanban titulo="Em Progresso" status="progresso" tarefas={tarefasProjeto} />
          <ColunaKanban titulo="Concluido" status="concluido" tarefas={tarefasProjeto} />
        </section>

        <section className="secao secao--formulario">
          <FormNovaTarefa projetoId={id} />
        </section>
      </main>
    </>
  )
}

export default PaginaProjeto