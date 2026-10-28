import { abrirBanco } from './database';
import { campeonatosIniciais, Campeonato } from '@/data/campeonatos';

async function inserirDadosIniciais(
  banco: SQLite.SQLiteDatabase
): Promise<void> {
  const resultado = await banco.getFirstAsync<{ quantidade: number }>(
    'SELECT COUNT(*) as quantidade FROM campeonatos'
  );

  if (!resultado || resultado.quantidade > 0) {
    return;
  }
  for (const campeonato of campeonatosIniciais) {
    await banco.runAsync(
      `
        INSERT INTO campeonatos
        (id, nome, modalidade, dataInicio, dataFim, qtdTimes, local, status, times)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
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
}
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
export async function carregarCampeonatos(): Promise<Campeonato[]> {
  try {
    const banco = await abrirBanco();

    const linhas = await banco.getAllAsync(
      `
        SELECT *
        FROM campeonatos
        ORDER BY id
      `
    );
    return linhas.map(converterCampeonato);
  } catch (erro) {
    console.error('Erro ao carregar campeonatos:', erro);
    return [];
  }
}
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

export type { Campeonato };
