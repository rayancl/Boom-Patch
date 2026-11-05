
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  adicionarCampeonato,
  atualizarCampeonato,
  buscarCampeonato,
  Campeonato,
} from '@/lib/storage';

export default function AdicionarScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const editando = Boolean(id);

  const [nome, setNome] = useState('');
  const [modalidade, setModalidade] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [qtdTimes, setQtdTimes] = useState('');
  const [local, setLocal] = useState('');

  const [campeonatoOriginal, setCampeonatoOriginal] =
    useState<Campeonato | null>(null);

  const [carregando, setCarregando] = useState(editando);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function carregarDados() {
      try {
        const dados = await buscarCampeonato(String(id));

        if (!dados) {
          Alert.alert(
            'Campeonato não encontrado',
            'Não foi possível localizar este campeonato.',
            [{ text: 'Voltar', onPress: () => router.back() }]
          );
          return;
        }

        setCampeonatoOriginal(dados);
        setNome(dados.nome);
        setModalidade(dados.modalidade);
        setDataInicio(dados.dataInicio);
        setDataFim(dados.dataFim);
        setQtdTimes(String(dados.qtdTimes));
        setLocal(dados.local);
      } catch (error) {
        console.error('Erro ao carregar campeonato:', error);

        Alert.alert(
          'Erro',
          'Não foi possível carregar os dados do campeonato.',
          [{ text: 'Voltar', onPress: () => router.back() }]
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [id]);

  const salvar = async () => {
    if (salvando) return;

    if (!nome.trim() || !modalidade.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o nome e a modalidade do campeonato.'
      );
      return;
    }

    const quantidade = Number(qtdTimes);

    if (
      qtdTimes.trim() &&
      (!Number.isInteger(quantidade) || quantidade < 1)
    ) {
      Alert.alert(
        'Quantidade inválida',
        'Informe uma quantidade inteira de times maior que zero.'
      );
      return;
    }

    setSalvando(true);

    try {
      if (editando && campeonatoOriginal) {
        const campeonatoAtualizado: Campeonato = {
          ...campeonatoOriginal,
          nome: nome.trim(),
          modalidade: modalidade.trim(),
          dataInicio: dataInicio.trim() || 'A definir',
          dataFim: dataFim.trim() || 'A definir',
          qtdTimes: quantidade || 0,
          local: local.trim() || 'A definir',
        };

        await atualizarCampeonato(campeonatoAtualizado);

        Alert.alert(
          'Campeonato atualizado!',
          'As alterações foram salvas com sucesso.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      } else {
        await adicionarCampeonato({
          nome: nome.trim(),
          modalidade: modalidade.trim(),
          dataInicio: dataInicio.trim() || 'A definir',
          dataFim: dataFim.trim() || 'A definir',
          qtdTimes: quantidade || 0,
          local: local.trim() || 'A definir',
          status: 'Agendado',
          times: [],
        });

        Alert.alert(
          'Campeonato criado!',
          'O campeonato foi salvo com sucesso.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
      }
    } catch (error) {
      console.error('Erro ao salvar campeonato:', error);

      Alert.alert(
        'Erro ao salvar',
        'Não foi possível salvar o campeonato. Tente novamente.'
      );
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1B4332" />
        <Text style={styles.loadingText}>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>
          {editando ? 'Editar Campeonato' : 'Novo Campeonato'}
        </Text>

        <Text style={styles.subtitulo}>
          {editando
            ? 'Altere as informações do campeonato.'
            : 'Preencha as informações para criar seu campeonato.'}
        </Text>

        <Text style={styles.label}>Nome do campeonato *</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex.: Boom Cup 2027"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Modalidade *</Text>
        <TextInput
          style={styles.input}
          value={modalidade}
          onChangeText={setModalidade}
          placeholder="Ex.: Futsal, Vôlei, Xadrez"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Data de início</Text>
        <TextInput
          style={styles.input}
          value={dataInicio}
          onChangeText={setDataInicio}
          placeholder="Ex.: 05/10/2026"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Data de fim</Text>
        <TextInput
          style={styles.input}
          value={dataFim}
          onChangeText={setDataFim}
          placeholder="Ex.: 30/11/2026"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Quantidade de times</Text>
        <TextInput
          style={styles.input}
          value={qtdTimes}
          onChangeText={setQtdTimes}
          placeholder="Ex.: 8"
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Local</Text>
        <TextInput
          style={styles.input}
          value={local}
          onChangeText={setLocal}
          placeholder="Ex.: Ginásio do Bairro"
          placeholderTextColor="#9CA3AF"
        />

        <Pressable
          style={[styles.button, salvando && styles.buttonDisabled]}
          onPress={salvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              {editando ? 'Salvar alterações' : 'Criar campeonato'}
            </Text>
          )}
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={salvando}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F7F4',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE8DF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
  },
  button: {
    backgroundColor: '#1B4332',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F7F4',
  },
  loadingText: {
    color: '#666',
    marginTop: 12,
    fontSize: 15,
  },
});
