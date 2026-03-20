/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'kanban-projetos-dados'

const TarefasContext = createContext(undefined)

function gerarId(prefixo) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefixo}-${crypto.randomUUID()}`
  }

  return `${prefixo}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function carregarDadosIniciais() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (!salvo) {
      return { projetos: [], tarefas: [] }
    }

    const dados = JSON.parse(salvo)
    return {
      projetos: Array.isArray(dados.projetos) ? dados.projetos : [],
      tarefas: Array.isArray(dados.tarefas) ? dados.tarefas : [],
    }
  } catch {
    return { projetos: [], tarefas: [] }
  }
}

export function TarefasProvider({ children }) {
  const [dadosIniciais] = useState(() => carregarDadosIniciais())
  const [projetos, setProjetos] = useState(dadosIniciais.projetos)
  const [tarefas, setTarefas] = useState(dadosIniciais.tarefas)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        projetos,
        tarefas,
      }),
    )
  }, [projetos, tarefas])

  function adicionarProjeto({ nome, descricao }) {
    const novoProjeto = {
      id: gerarId('projeto'),
      nome: nome?.trim() || 'Projeto sem nome',
      descricao: descricao?.trim() || '',
      criadoEm: new Date().toISOString(),
    }

    setProjetos((estadoAtual) => [...estadoAtual, novoProjeto])

    return novoProjeto.id
  }

  function adicionarLog(tarefaId, texto) {
    setTarefas((estadoAtual) =>
      estadoAtual.map((tarefa) => {
        if (tarefa.id !== tarefaId) {
          return tarefa
        }

        return {
          ...tarefa,
          logs: [
            ...(Array.isArray(tarefa.logs) ? tarefa.logs : []),
            {
              id: gerarId('log'),
              texto,
              criadoEm: new Date().toISOString(),
            },
          ],
        }
      }),
    )
  }

  function adicionarTarefa({ projetoId, titulo, descricao, prioridade }) {
    const novaTarefa = {
      id: gerarId('tarefa'),
      projetoId,
      titulo: titulo?.trim() || 'Tarefa sem titulo',
      descricao: descricao?.trim() || '',
      prioridade: prioridade || 'media',
      status: 'a_fazer',
      criadoEm: new Date().toISOString(),
      logs: [
        {
          id: gerarId('log'),
          texto: 'Tarefa criada na coluna A Fazer',
          criadoEm: new Date().toISOString(),
        },
      ],
    }

    setTarefas((estadoAtual) => [...estadoAtual, novaTarefa])

    return novaTarefa.id
  }

  function removerTarefa(tarefaId) {
    setTarefas((estadoAtual) => estadoAtual.filter((tarefa) => tarefa.id !== tarefaId))
  }

  function moverTarefa(tarefaId, novoStatus) {
    const mapaStatus = {
      a_fazer: 'A Fazer',
      progresso: 'Em Progresso',
      concluido: 'Concluido',
    }

    setTarefas((estadoAtual) =>
      estadoAtual.map((tarefa) => {
        if (tarefa.id !== tarefaId || tarefa.status === novoStatus) {
          return tarefa
        }

        return {
          ...tarefa,
          status: novoStatus,
          logs: [
            ...(Array.isArray(tarefa.logs) ? tarefa.logs : []),
            {
              id: gerarId('log'),
              texto: `Status alterado para ${mapaStatus[novoStatus] || novoStatus}`,
              criadoEm: new Date().toISOString(),
            },
          ],
        }
      }),
    )
  }

  function atualizarTarefa(tarefaId, { titulo, prioridade }) {
    setTarefas((estadoAtual) =>
      estadoAtual.map((tarefa) => {
        if (tarefa.id !== tarefaId) {
          return tarefa
        }

        const proximoTitulo = titulo?.trim() || tarefa.titulo
        const proximaPrioridade = prioridade || tarefa.prioridade
        const houveAlteracao =
          proximoTitulo !== tarefa.titulo || proximaPrioridade !== tarefa.prioridade

        if (!houveAlteracao) {
          return tarefa
        }

        return {
          ...tarefa,
          titulo: proximoTitulo,
          prioridade: proximaPrioridade,
          logs: [
            ...(Array.isArray(tarefa.logs) ? tarefa.logs : []),
            {
              id: gerarId('log'),
              texto: 'Tarefa atualizada no card do kanban',
              criadoEm: new Date().toISOString(),
            },
          ],
        }
      }),
    )
  }

  function obterProjetoPorId(projetoId) {
    return projetos.find((projeto) => projeto.id === projetoId)
  }

  function obterTarefaPorId(tarefaId) {
    return tarefas.find((tarefa) => tarefa.id === tarefaId)
  }

  const valor = {
    projetos,
    tarefas,
    adicionarProjeto,
    adicionarTarefa,
    removerTarefa,
    moverTarefa,
    atualizarTarefa,
    adicionarLog,
    obterProjetoPorId,
    obterTarefaPorId,
  }

  return <TarefasContext.Provider value={valor}>{children}</TarefasContext.Provider>
}

export function useTarefas() {
  const context = useContext(TarefasContext)

  if (!context) {
    throw new Error('useTarefas deve ser usado dentro de TarefasProvider')
  }

  return context
}
