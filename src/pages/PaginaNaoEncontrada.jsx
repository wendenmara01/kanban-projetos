import { Link } from 'react-router-dom'
import Header from '../components/Header'

function PaginaNaoEncontrada() {
  return (
    <>
      <Header />

      <main className="pagina pagina--404">
        <h2>404</h2>
        <p>A rota acessada nao existe neste projeto.</p>
        <Link className="botao" to="/">
          Voltar para a pagina inicial
        </Link>
      </main>
    </>
  )
}

export default PaginaNaoEncontrada