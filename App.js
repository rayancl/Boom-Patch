import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projeto em construção 🚧</Text>
      <Text style={styles.subtitle}>Trabalho em Grupo de PAM I</Text>
      <Text style={styles.text}>
        Este é o ponto de partida do projeto (Boom Patch).
      </Text>
      <Text style={styles.text}>
        Edite o arquivo <Text style={styles.code}>App.js</Text> para começar!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a90d9',
    marginBottom: 24,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  code: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
});
