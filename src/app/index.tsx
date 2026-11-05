
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Campeonato,
  carregarCampeonatos,
} from '@/lib/storage';

export default function ListaScreen() {
  const [campeonatos, setCampeonatos] = useState<Campeonato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');

    try {
      const dados = await carregarCampeonatos();
      setCampeonatos(dados);
    } catch (error) {
      console.error('Erro ao carregar campeonatos:', error);
      setErro('Não foi possível carregar os campeonatos. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      const executar = async () => {
        setCarregando(true);
        setErro('');

        try {
          const dados = await carregarCampeonatos();

          if (ativo) {
            setCampeonatos(dados);
          }
        } catch (error) {
          console.error('Erro ao carregar campeonatos:', error);

          if (ativo) {
            setErro(
              'Não foi possível carregar os campeonatos. Tente novamente.'
            );
          }
        } finally {
          if (ativo) {
            setCarregando(false);
          }
        }
      };

      executar();

      return () => {
        ativo = false;
      };
    }, [])
  );

  const abrirDetalhes = (id: string) => {
    router.push({
      pathname: '/detalhe/[id]',
      params: { id },
    });
  };

  const criarCampeonato = () => {
    router.push('/adicionar');
  };

  return (
    <View style={styles.container}>
      {carregando ? (
        <View style={styles.estado}>
          <ActivityIndicator size="large" color="#1B4332" />
          <Text style={styles.estadoTexto}>
            Carregando campeonatos...
          </Text>
        </View>
      ) : erro ? (
        <View style={styles.estado}>
          <Text style={styles.icone}>⚠️</Text>
          <Text style={styles.estadoTitulo}>
            Ops! Algo deu errado.
          </Text>
          <Text style={styles.estadoTexto}>{erro}</Text>

          <Pressable style={styles.retryButton} onPress={carregar}>
            <Text style={styles.retryButtonText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={campeonatos}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={[
            styles.listContent,
            campeonatos.length === 0 && styles.listaVazia,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.estado}>
              <Text style={styles.icone}>🏆</Text>
              <Text style={styles.estadoTitulo}>
                Nenhum campeonato ainda
              </Text>
              <Text style={styles.estadoTexto}>
                Crie seu primeiro campeonato para começar!
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPress={() => abrirDetalhes(String(item.id))}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.itemNome}>
                  {item.nome}
                </Text>

                <View
                  style={[
                    styles.statusBadge,
                    item.status === 'Em andamento' &&
                      styles.statusAtivo,
                  ]}
                >
                  <Text style={styles.statusTexto}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.itemInfo}>
                {item.modalidade} · {item.qtdTimes} times
              </Text>

              <Text style={styles.itemData}>
                {item.dataInicio} → {item.dataFim}
              </Text>

              <Text style={styles.itemLocal}>
                📍 {item.local}
              </Text>

              <Text style={styles.verDetalhes}>
                Ver detalhes →
              </Text>
            </Pressable>
          )}
        />
      )}

      <Pressable
        style={styles.addButton}
        onPress={criarCampeonato}
      >
        <Text style={styles.addButtonText}>
          + Criar Campeonato
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7F4',
  },

  listContent: {
    padding: 16,
    paddingBottom: 110,
    gap: 12,
  },

  listaVazia: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  estado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },

  icone: {
    fontSize: 42,
    marginBottom: 12,
  },

  estadoTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B4332',
    textAlign: 'center',
    marginBottom: 8,
  },

  estadoTexto: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },

  retryButton: {
    backgroundColor: '#1B4332',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DCE8DF',
  },

  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    flex: 1,
  },

  statusBadge: {
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },

  statusAtivo: {
    backgroundColor: '#BBF7D0',
  },

  statusTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#14532D',
  },

  itemInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },

  itemData: {
    fontSize: 13,
    color: '#1B4332',
    marginTop: 4,
    fontWeight: '600',
  },

  itemLocal: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },

  verDetalhes: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B4332',
    marginTop: 12,
  },

  addButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#1B4332',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
