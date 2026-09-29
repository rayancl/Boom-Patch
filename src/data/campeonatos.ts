export type Campeonato = {
  id: string;
  nome: string;
  modalidade: string;
  dataInicio: string;
  dataFim: string;
  qtdTimes: number;
  local: string;
  status: string;
  times: string[];
};

export const campeonatosIniciais: Campeonato[] = [
  {
  
    id: '1',
    nome: 'Boom Cup Futsal',
    modalidade: 'Futsal',
    dataInicio: '05/10/2026',
    dataFim: '30/11/2026',
    qtdTimes: 8,
    local: 'Ginásio do Bairro',
    status: 'Em andamento',
    times: ['Boom FC', 'Craques do Morro', 'Os Imparáveis', 'Leões do Norte', 'Fúria Jovem', 'Tropa do Ás', 'Velozes FC', 'Real Esquema'],
  },
  {
    id: '2',
    nome: 'Campeonato Interclasse',
    modalidade: 'Vôlei',
    dataInicio: '10/11/2026',
    dataFim: '15/12/2026',
    qtdTimes: 6,
    local: 'Quadra da Escola',
    status: 'Agendado',
    times: ['3º A', '3º B', '2º A', '2º B', '1º A', '1º B'],
  },
  {
    id: '3',
    nome: 'Copa de Xadrez',
    modalidade: 'Xadrez',
    dataInicio: '20/11/2026',
    dataFim: '21/11/2026',
    qtdTimes: 4,
    local: 'Sala de Jogos',
    status: 'Agendado',
    times: ['Turma A', 'Turma B', 'Turma C', 'Turma D'],
  },
];
