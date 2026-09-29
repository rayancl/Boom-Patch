import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { carregarCampeonatos, deletarCampeonato, Campeonato } from '@/lib/storage';

export default function DetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [campeonato, setCampeonato] = useState<Campeonato | null>(null);

  useEffect(() => {
    const buscarDetalhes = async () => {
      const dados = await carregarCampeonatos();
      const encontrado = dados.find((item) => String(item.id) === String(id));
      if (encontrado) {
        setCampeonato(encontrado);
      }
    };
    buscarDetalhes();
  }, [id]);

  const handleExcluir = () => {
    Alert.alert(
      'Excluir Campeonato',
      'Tem certeza que deseja excluir este campeonato? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletarCampeonato(String(id));
              router.back();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o campeonato.');
            }
          },
        },
      ]
    );
  };

  const handleEditar = () => {
    router.push({
      pathname: '/adicionar',
      params: { id },
    });
  };

  if (!campeonato) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.nome}>{campeonato.nome}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{campeonato.status}</Text>
        </View>

        <Text style={styles.label}>Modalidade:</Text>
        <Text style={styles.valor}>{campeonato.modalidade}</Text>

        <Text style={styles.label}>Quantidade de Times:</Text>
        <Text style={styles.valor}>{campeonato.qtdTimes}</Text>

        <Text style={styles.label}>Período:</Text>
        <Text style={styles.valor}>
          {campeonato.dataInicio} até {campeonato.dataFim}
        </Text>

        <Text style={styles.label}>Local:</Text>
        <Text style={styles.valor}>📍 {campeonato.local}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable style={[styles.button, styles.editButton]} onPress={handleEditar}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.deleteButton]} onPress={handleExcluir}>
          <Text style={styles.buttonText}>Excluir</Text>
        </Pressable>
      </View>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar para a Lista</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F7F4',
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#DCE8DF',
    marginBottom: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#BBF7D0',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#14532D',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 12,
  },
  valor: {
    fontSize: 16,
    color: '#1C1C1E',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2563EB',
  },
  deleteButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
    backgroundColor: '#1B4332',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
