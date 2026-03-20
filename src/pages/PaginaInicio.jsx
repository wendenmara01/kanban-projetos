import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormNovoProjeto from '../components/FormNovoProjeto'
import Header from '../components/Header'
import { useTarefas } from '../contexts/TarefasContext'

function PaginaInicio() {
  const navigate = useNavigate()
  const { projetos, tarefas } = useTarefas()
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('todos')
  const [ordenacao, setOrdenacao] = useState('atividade')

  const contagemPorProjeto = useMemo(() => {
    return tarefas.reduce((acumulador, tarefa) => {
      if (!acumulador[tarefa.projetoId]) {
        acumulador[tarefa.projetoId] = { a_fazer: 0, progresso: 0, concluido: 0 }
      }

      if (tarefa.status in acumulador[tarefa.projetoId]) {
        acumulador[tarefa.projetoId][tarefa.status] += 1
      }

      return acumulador
    }, {})
  }, [tarefas])

  const termosBusca = busca.trim().toLowerCase()

  const projetosExibidos = useMemo(() => {
    const tarefasPorProjeto = tarefas.reduce((acumulador, tarefa) => {
      if (!acumulador[tarefa.projetoId]) {
        acumulador[tarefa.projetoId] = []
      }

      acumulador[tarefa.projetoId].push(tarefa)
      return acumulador
    }, {})

    return projetos
      .filter((projeto) => {
        const contagem = contagemPorProjeto[projeto.id] || { a_fazer: 0, progresso: 0, concluido: 0 }
        const total = contagem.a_fazer + contagem.progresso + contagem.concluido

        if (filtro === 'concluidos' && total !== contagem.concluido) {
          return false
        }

        if (filtro === 'pendentes' && total === contagem.concluido) {
          return false
        }

        if (filtro === 'sem_tarefas' && total > 0) {
          return false
        }

        if (!termosBusca) {
          return true
        }

        const tarefasDoProjeto = tarefasPorProjeto[projeto.id] || []
        const textoProjeto = `${projeto.nome} ${projeto.descricao || ''}`.toLowerCase()
        const encontrouProjeto = textoProjeto.includes(termosBusca)
        const encontrouTarefa = tarefasDoProjeto.some((tarefa) => {
          const textoTarefa = `${tarefa.titulo} ${tarefa.descricao || ''}`.toLowerCase()
          return textoTarefa.includes(termosBusca)
        })

        return encontrouProjeto || encontrouTarefa
      })
      .sort((a, b) => {
        const contagemA = contagemPorProjeto[a.id] || { a_fazer: 0, progresso: 0, concluido: 0 }
        const contagemB = contagemPorProjeto[b.id] || { a_fazer: 0, progresso: 0, concluido: 0 }
        const totalA = contagemA.a_fazer + contagemA.progresso + contagemA.concluido
        const totalB = contagemB.a_fazer + contagemB.progresso + contagemB.concluido

        if (ordenacao === 'nome') {
          return a.nome.localeCompare(b.nome, 'pt-BR')
        }

        if (ordenacao === 'progresso') {
          const progressoA = totalA === 0 ? 0 : contagemA.concluido / totalA
          const progressoB = totalB === 0 ? 0 : contagemB.concluido / totalB
          return progressoB - progressoA
        }

        const atividadeA = Math.max(
          new Date(a.criadoEm || 0).getTime(),
          ...(tarefasPorProjeto[a.id] || []).map((tarefa) => {
            const ultimoLog = tarefa.logs?.[tarefa.logs.length - 1]?.criadoEm || tarefa.criadoEm
            return new Date(ultimoLog || 0).getTime()
          }),
        )
        const atividadeB = Math.max(
          new Date(b.criadoEm || 0).getTime(),
          ...(tarefasPorProjeto[b.id] || []).map((tarefa) => {
            const ultimoLog = tarefa.logs?.[tarefa.logs.length - 1]?.criadoEm || tarefa.criadoEm
            return new Date(ultimoLog || 0).getTime()
          }),
        )
        return atividadeB - atividadeA
      })
  }, [projetos, tarefas, contagemPorProjeto, filtro, ordenacao, termosBusca])

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

<<<<<<< HEAD
          <div className="ferramentas-home">
            <input
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Busca global: projeto ou tarefa"
            />

            <select value={filtro} onChange={(evento) => setFiltro(evento.target.value)}>
              <option value="todos">Todos</option>
              <option value="pendentes">Com pendencias</option>
              <option value="concluidos">Concluidos</option>
              <option value="sem_tarefas">Sem tarefas</option>
            </select>

            <select value={ordenacao} onChange={(evento) => setOrdenacao(evento.target.value)}>
              <option value="atividade">Mais atividade recente</option>
              <option value="progresso">Maior progresso</option>
              <option value="nome">Nome (A-Z)</option>
            </select>
          </div>

          {projetosExibidos.length === 0 ? (
            <p className="mensagem-vazia">Nenhum projeto ainda. Crie o primeiro acima.</p>
=======
          {projetos.length === 0 ? (
            <p className="mensagem-vazia">NENHUM projeto ainda. Crie o primeiro acima.</p>
>>>>>>> c9ce0b4c7ed7d23330e5294b6f7f26a7e82ded40
          ) : (
            <div className="grade-projetos">
              {projetosExibidos.map((projeto) => {
                const contagem = contagemPorProjeto[projeto.id] || {
                  a_fazer: 0,
                  progresso: 0,
                  concluido: 0,
                }
                const total = contagem.a_fazer + contagem.progresso + contagem.concluido
                const percentual = total > 0 ? Math.round((contagem.concluido / total) * 100) : 0

                return (
                  <article key={projeto.id} className="card-projeto card-projeto--compacto">
                    <h3>{projeto.nome}</h3>

                    <ul className="projeto-resumo-status">
                      <li>Em andamento - {contagem.a_fazer}</li>
                      <li>Fazendo - {contagem.progresso}</li>
                      <li>Feito - {contagem.concluido}</li>
                    </ul>

                    <div className="projeto-progresso" aria-label={`Progresso ${percentual}%`}>
                      <div className="projeto-progresso__barra" style={{ width: `${percentual}%` }} />
                    </div>
                    <p className="projeto-progresso__texto">Progresso: {percentual}%</p>

                    <button
                      className="botao"
                      type="button"
                      onClick={() => navigate(`/projeto/${projeto.id}`)}
                    >
                      Visualizar projeto
                    </button>
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