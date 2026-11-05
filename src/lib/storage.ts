
import * as SQLite from 'expo-sqlite';
import { abrirBanco } from './database';
import { campeonatosIniciais, Campeonato } from '@/data/campeonatos';

// Insere os campeonatos iniciais somente se o banco estiver vazio
async function inserirDadosIniciais(
  banco: SQLite.SQLiteDatabase
): Promise<void> {
  const resultado = await banco.getFirstAsync<{ quantidade: number }>(
    'SELECT COUNT(*) as quantidade FROM campeonatos'
  );

  if (resultado && resultado.quantidade > 0) {
    return;
  }

  await banco.withTransactionAsync(async () => {
    for (const campeonato of campeonatosIniciais) {
      await banco.runAsync(
        `INSERT INTO campeonatos
        (id, nome, modalidade, dataInicio, dataFim, qtdTimes, local, status, times)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        campeonato.id,
        campeonato.nome,
        campeonato.modalidade,
        campeonato.dataInicio,
        campeonato.dataFim,
        campeonato.qtdTimes,
        campeonato.local,
        campeonato.status,
        JSON.stringify(campeonato.times)
      );
    }
  });
}

// Converte os dados do SQLite para o formato utilizado pelo aplicativo
function converterCampeonato(
  linha: any
): Campeonato {
  return {
    id: String(linha.id),
    nome: linha.nome,
    modalidade: linha.modalidade,
    dataInicio: linha.dataInicio,
    dataFim: linha.dataFim,
    qtdTimes: Number(linha.qtdTimes),
    local: linha.local,
    status: linha.status,
    times: JSON.parse(linha.times || '[]'),
  };
}

// LISTAR campeonatos
export async function carregarCampeonatos(): Promise<Campeonato[]> {
  const banco = await abrirBanco();

  await inserirDadosIniciais(banco);

  const linhas = await banco.getAllAsync(
    `
      SELECT *
      FROM campeonatos
      ORDER BY id
    `
  );

  return linhas.map(converterCampeonato);
}

// ADICIONAR campeonato
export async function adicionarCampeonato(
  novoCampeonato: Omit<Campeonato, 'id'>
): Promise<Campeonato[]> {
  const banco = await abrirBanco();

  const campeonatoComId: Campeonato = {
    ...novoCampeonato,
    id: String(Date.now()),
  };

  await banco.runAsync(
    `
      INSERT INTO campeonatos
      (id, nome, modalidade, dataInicio, dataFim, qtdTimes, local, status, times)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    campeonatoComId.id,
    campeonatoComId.nome,
    campeonatoComId.modalidade,
    campeonatoComId.dataInicio,
    campeonatoComId.dataFim,
    campeonatoComId.qtdTimes,
    campeonatoComId.local,
    campeonatoComId.status,
    JSON.stringify(campeonatoComId.times)
  );

  return carregarCampeonatos();
}

// BUSCAR campeonato pelo ID
export async function buscarCampeonato(
  id: string
): Promise<Campeonato | undefined> {
  const banco = await abrirBanco();

  const linha = await banco.getFirstAsync(
    `
      SELECT *
      FROM campeonatos
      WHERE id = ?
    `,
    id
  );

  if (!linha) {
    return undefined;
  }

  return converterCampeonato(linha);
}

// ATUALIZAR somente o status
export async function atualizarStatusCampeonato(
  id: string,
  novoStatus: string
): Promise<void> {
  const banco = await abrirBanco();

  await banco.runAsync(
    `
      UPDATE campeonatos
      SET status = ?
      WHERE id = ?
    `,
    novoStatus,
    id
  );
}

// EDITAR campeonato completo
export async function atualizarCampeonato(
  campeonato: Campeonato
): Promise<void> {
  const banco = await abrirBanco();

  await banco.runAsync(
    `
      UPDATE campeonatos
      SET
        nome = ?,
        modalidade = ?,
        dataInicio = ?,
        dataFim = ?,
        qtdTimes = ?,
        local = ?,
        status = ?,
        times = ?
      WHERE id = ?
    `,
    campeonato.nome,
    campeonato.modalidade,
    campeonato.dataInicio,
    campeonato.dataFim,
    campeonato.qtdTimes,
    campeonato.local,
    campeonato.status,
    JSON.stringify(campeonato.times),
    campeonato.id
  );
}

// EXCLUIR campeonato
export async function deletarCampeonato(
  id: string
): Promise<void> {
  const banco = await abrirBanco();

  await banco.runAsync(
    `
      DELETE FROM campeonatos
      WHERE id = ?
    `,
    id
  );
}

// Exporta o tipo utilizado nas telas
export type { Campeonato };
