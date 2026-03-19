import { NavLink } from 'react-router-dom'

function Header({ projetoAtualId }) {
    return (
        <header className="header">
            <div className="header__conteudo">
                <h1 className="header__logo">Kanban de Projetos</h1>

                <nav className="header__nav">
                    {/* NavLink aplica estilo automaticamente para rota ativa */}
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'ativo' : '')} end>
                        Inicio
                    </NavLink>

                    {/* Link dinamico aparece apenas quando existe projeto selecionado */}
                    {projetoAtualId ? (
                        <NavLink
                            to={`/projeto/${projetoAtualId}`}
                            className={({ isActive }) => (isActive ? 'ativo' : '')}
                        >
                            Projeto atual
                        </NavLink>
                    ) : null}
                </nav>
            </div>
        </header>
    )
}

export default Header