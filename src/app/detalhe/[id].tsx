
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  buscarCampeonato,
  deletarCampeonato,
  Campeonato,
} from '@/lib/storage';

export default function DetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [campeonato, setCampeonato] = useState<Campeonato | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');

    try {
      const dados = await buscarCampeonato(String(id));

      if (!dados) {
        setCampeonato(null);
        setErro('Campeonato não encontrado.');
      } else {
        setCampeonato(dados);
      }
    } catch (error) {
      console.error('Erro ao buscar campeonato:', error);
      setErro('Não foi possível carregar os dados. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  const editar = () => {
    router.push({
      pathname: '/adicionar',
      params: { id: String(id) },
    });
  };

  const excluir = () => {
    Alert.alert(
      'Excluir campeonato',
      'Tem certeza de que deseja excluir este campeonato? Essa ação não poderá ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: confirmarExclusao,
        },
      ]
    );
  };

  const confirmarExclusao = async () => {
    if (excluindo) return;

    setExcluindo(true);

    try {
      await deletarCampeonato(String(id));

      Alert.alert(
        'Campeonato excluído',
        'O campeonato foi removido com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao excluir campeonato:', error);

      Alert.alert(
        'Erro ao excluir',
        'Não foi possível excluir o campeonato. Tente novamente.'
      );
    } finally {
      setExcluindo(false);
    }
  };

  if (carregando) {
    return (
      <View style={styles.estado}>
        <ActivityIndicator size="large" color="#1B4332" />
        <Text style={styles.estadoTexto}>
          Carregando campeonato...
        </Text>
      </View>
    );
  }

  if (erro || !campeonato) {
    return (
      <View style={styles.estado}>
        <Text style={styles.icone}>⚠️</Text>
        <Text style={styles.titulo}>Ops!</Text>
        <Text style={styles.estadoTexto}>
          {erro || 'Campeonato não encontrado.'}
        </Text>

        <Pressable style={styles.botao} onPress={carregar}>
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </Pressable>

        <Pressable
          style={styles.botaoCancelar}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.botaoCancelarTexto}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.titulo}>{campeonato.nome}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Modalidade</Text>
        <Text style={styles.valor}>{campeonato.modalidade}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.valor}>{campeonato.status}</Text>

        <Text style={styles.label}>Data de início</Text>
        <Text style={styles.valor}>{campeonato.dataInicio}</Text>

        <Text style={styles.label}>Data de encerramento</Text>
        <Text style={styles.valor}>{campeonato.dataFim}</Text>

        <Text style={styles.label}>Quantidade de times</Text>
        <Text style={styles.valor}>{campeonato.qtdTimes}</Text>

        <Text style={styles.label}>Local</Text>
        <Text style={styles.valor}>{campeonato.local}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Times participantes</Text>

        {campeonato.times?.length ? (
          campeonato.times.map((time, index) => (
            <Text key={index} style={styles.time}>
              • {typeof time === 'string' ? time : time.nome}
            </Text>
          ))
        ) : (
          <Text style={styles.estadoTexto}>
            Nenhum time cadastrado ainda.
          </Text>
        )}
      </View>

      <Pressable style={styles.botao} onPress={editar}>
        <Text style={styles.botaoTexto}>✏️ Editar campeonato</Text>
      </Pressable>

      <Pressable
        style={[styles.botaoExcluir, excluindo && styles.desabilitado]}
        onPress={excluir}
        disabled={excluindo}
      >
        {excluindo ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botaoTexto}>🗑️ Excluir campeonato</Text>
        )}
      </Pressable>
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
  estado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F2F7F4',
  },
  icone: {
    fontSize: 40,
    marginBottom: 12,
  },
  estadoTexto: {
    fontSize: 15,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  titulo: {
    fontSize: 25,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DCE8DF',
  },
  label: {
    fontSize: 13,
    color: '#777',
    marginTop: 12,
  },
  valor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginTop: 4,
  },
  time: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#1B4332',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  botaoExcluir: {
    backgroundColor: '#B91C1C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  desabilitado: {
    opacity: 0.6,
  },
  botaoCancelar: {
    padding: 14,
    marginTop: 8,
  },
  botaoCancelarTexto: {
    color: '#1B4332',
    fontWeight: '700',
  },
});
