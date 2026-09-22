import { useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { buscarCampeonato, Campeonato } from '../../lib/storage';

export default function DetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [campeonato, setCampeonato] = useState<Campeonato | undefined>(undefined);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        buscarCampeonato(id).then(setCampeonato);
      }
    }, [id])
  );

  if (!campeonato) {
    return (
      <View style={styles.container}>
        <Text style={styles.naoEncontrado}>Campeonato não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.nome}>{campeonato.nome}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Modalidade</Text>
        <Text style={styles.valor}>{campeonato.modalidade}</Text>

        <Text style={styles.label}>Período</Text>
        <Text style={styles.valor}>
          {campeonato.dataInicio} → {campeonato.dataFim}
        </Text>

        <Text style={styles.label}>Local</Text>
        <Text style={styles.valor}>{campeonato.local}</Text>

        <Text style={styles.label}>Quantidade de times</Text>
        <Text style={styles.valor}>{campeonato.qtdTimes}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.valor}>{campeonato.status}</Text>
      </View>

      <Text style={styles.sectionTitle}>Times participantes</Text>
      <View style={styles.card}>
        {campeonato.times.map((time, indice) => (
          <View key={time} style={styles.timeRow}>
            <View style={styles.timePosicao}>
              <Text style={styles.timePosicaoTexto}>{indice + 1}º</Text>
            </View>
            <Text style={styles.timeNome}>{time}</Text>
          </View>
        ))}
      </View>

      {/* TAREFA (Aula 18): adicione um botão "Editar" e "Excluir" aqui,
          com confirmação (Alert.alert) antes de excluir. */}

      {/* TAREFA (Aula 19, ranking): guarde a pontuação de cada time
          e mostre aqui um ranking ordenado por pontos. */}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 20,
    marginBottom: 8,
  },
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
    fontSize: 15,
    color: '#1C1C1E',
  },
});