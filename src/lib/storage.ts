import AsyncStorage from '@react-native-async-storage/async-storage';
import { campeonatosIniciais, Campeonato } from '@/data/campeonatos';

const STORAGE_KEY = '@boom-patch:campeonatos';

export async function carregarCampeonatos(): Promise<Campeonato[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json !== null) {
      return JSON.parse(json);
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(campeonatosIniciais));
    return campeonatosIniciais;
  } catch (erro) {
    console.error('Erro ao carregar campeonatos:', erro);
    return campeonatosIniciais;
  }
}

export async function salvarCampeonatos(campeonatos: Campeonato[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(campeonatos));
  } catch (erro) {
    console.error('Erro ao salvar campeonatos:', erro);
  }
}

export async function adicionarCampeonato(
  novoCampeonato: Omit<Campeonato, 'id'>
): Promise<Campeonato[]> {
  const campeonatos = await carregarCampeonatos();
  const campeonatoComId: Campeonato = { ...novoCampeonato, id: String(Date.now()) };
  const atualizados = [...campeonatos, campeonatoComId];
  await salvarCampeonatos(atualizados);
  return atualizados;
}

export async function buscarCampeonato(id: string): Promise<Campeonato | undefined> {
  const campeonatos = await carregarCampeonatos();
  return campeonatos.find((c) => c.id === id);
}