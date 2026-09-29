import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  buscarCampeonato,
  excluirCampeonato,
  Campeonato,
} from '@/lib/storage';

export default function DetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [campeonato, setCampeonato] = useState<Campeonato | undefined>(
    undefined
  );

  useFocusEffect(
    useCallback(() => {
      if (id) {
        buscarCampeonato(id).then(setCampeonato);
      }
    }, [id])
  );

  // EXCLUIR CAMPEONATO
  function excluir() {
    Alert.alert(
      'Excluir campeonato',
      'Tem certeza que deseja excluir este campeonato?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            if (id) {
              await excluirCampeonato(id);
              router.back();
            }
          },
        },
      ]
    );
  }

  if (!campeonato) {
    return (
      <View style={styles.container}>
        <Text style={styles.naoEncontrado}>
          Campeonato não encontrado.
        </Text>
      </View>
    );
  }

  // RANKING DOS TIMES
  const ranking = campeonato.times
    .map((time) => ({
      nome: time,
      pontos: campeonato.pontuacoes?.[time] ?? 0,
    }))
    .sort((a, b) => b.pontos - a.pontos);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.nome}>{campeonato.nome}</Text>

      {/* INFORMAÇÕES DO CAMPEONATO */}

      <View style={styles.card}>
        <Text style={styles.label}>Modalidade</Text>
        <Text style={styles.valor}>
          {campeonato.modalidade}
        </Text>

        <Text style={styles.label}>Período</Text>
        <Text style={styles.valor}>
          {campeonato.dataInicio} → {campeonato.dataFim}
        </Text>

        <Text style={styles.label}>Local</Text>
        <Text style={styles.valor}>
          {campeonato.local}
        </Text>

        <Text style={styles.label}>Quantidade de times</Text>
        <Text style={styles.valor}>
          {campeonato.qtdTimes}
        </Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.valor}>
          {campeonato.status}
        </Text>
      </View>

      {/* BOTÕES EDITAR E EXCLUIR */}

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => router.push(`/editar/${id}`)}
        >
          <Text style={styles.textoBotaoEditar}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={excluir}
        >
          <Text style={styles.textoBotaoExcluir}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>

      {/* TIMES PARTICIPANTES */}

      <Text style={styles.sectionTitle}>
        Times participantes
      </Text>

      <View style={styles.card}>
        {campeonato.times.map((time, indice) => (
          <View
            key={time}
            style={styles.timeRow}
          >
            <View style={styles.timePosicao}>
              <Text style={styles.timePosicaoTexto}>
                {indice + 1}º
              </Text>
            </View>

            <Text style={styles.timeNome}>
              {time}
            </Text>

            <Text style={styles.pontos}>
              {campeonato.pontuacoes?.[time] ?? 0} pts
            </Text>
          </View>
        ))}
      </View>

      {/* RANKING */}

      <Text style={styles.sectionTitle}>
        Ranking
      </Text>

      <View style={styles.card}>
        {ranking.map((time, indice) => (
          <View
            key={time.nome}
            style={styles.rankingRow}
          >
            <View style={styles.rankingPosicao}>
              <Text style={styles.rankingPosicaoTexto}>
                {indice + 1}º
              </Text>
            </View>

            <View style={styles.rankingInfo}>
              <Text style={styles.rankingNome}>
                {time.nome}
              </Text>

              <Text style={styles.rankingPontos}>
                {time.pontos} pontos
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7F4',
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  naoEncontrado: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: '#666',
  },

  nome: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DCE8DF',
    gap: 4,
  },

  label: {
    fontSize: 13,
    color: '#8A8A8E',
    marginTop: 8,
  },

  valor: {
    fontSize: 16,
    color: '#1C1C1E',
  },

  /* BOTÕES */

  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: '#1B4332',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoEditar: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D32F2F',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoExcluir: {
    color: '#D32F2F',
    fontSize: 15,
    fontWeight: '700',
  },

  /* TÍTULOS */

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 20,
    marginBottom: 8,
  },

  /* TIMES */

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },

  timePosicao: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1B4332',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  timePosicaoTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  timeNome: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1E',
  },

  pontos: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B4332',
  },

  /* RANKING */

  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },

  rankingPosicao: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1B4332',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  rankingPosicaoTexto: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },

  rankingInfo: {
    flex: 1,
  },

  rankingNome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },

  rankingPontos: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
});
