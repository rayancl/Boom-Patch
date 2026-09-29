import {
  router,
  useFocusEffect,
} from 'expo-router';

import { useCallback, useState } from 'react';

import {
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

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      const carregar = async () => {
        try {
          const dados = await carregarCampeonatos();

          if (ativo) {
            setCampeonatos(dados);
          }
        } catch (error) {
          console.error(
            'Erro ao carregar campeonatos:',
            error
          );
        }
      };

      carregar();

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
      <FlatList
        data={campeonatos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum campeonato cadastrado ainda.
          </Text>
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
          </Pressable>
        )}
      />

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

  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
    fontSize: 16,
  },

  item: {
    backgroundColor: '#fff',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
