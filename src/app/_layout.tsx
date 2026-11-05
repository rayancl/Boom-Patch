
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1B4332',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#F2F7F4',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Boom Patch',
        }}
      />

      <Stack.Screen
        name="adicionar"
        options={{
          title: 'Campeonatos',
        }}
      />

      <Stack.Screen
        name="detalhe/[id]"
        options={{
          title: 'Detalhes do campeonato',
        }}
      />
    </Stack>
  );
}
