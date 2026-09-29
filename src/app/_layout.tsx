import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Boom Patch',
          }}
        />

        <Stack.Screen
          name="detalhe/[id]"
          options={{
            title: 'Detalhes do Campeonato',
          }}
        />

        <Stack.Screen
          name="adicionar"
          options={{
            title: 'Novo Campeonato',
            presentation: 'modal',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
