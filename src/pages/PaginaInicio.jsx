import { useNavigate } from 'react-router-dom'
import FormNovoProjeto from '../components/FormNovoProjeto'
import Header from '../components/Header'
import { useTarefas } from '../contexts/TarefasContext'

function PaginaInicio() {
  const navigate = useNavigate()
  const { projetos } = useTarefas()

  return (
    <>
      <Header />

      <main className="pagina pagina--inicio">
        <section className="secao secao--formulario">
          <h2>Novo projeto</h2>
          {/* O formulario cria projeto via Context API e navega para o board */}
          <FormNovoProjeto />
        </section>

        <section className="secao">
          <h2>Projetos cadastrados</h2>

          {projetos.length === 0 ? (
            <p className="mensagem-vazia">Nenhum projeto ainda. Crie o primeiro acima.</p>
          ) : (
            <div className="grade-projetos">
              {projetos.map((projeto) => (
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
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default PaginaInicio