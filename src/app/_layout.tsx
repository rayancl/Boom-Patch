import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#1C1C1E',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Boom Patch' }} />
        <Stack.Screen name="detalhe/[id]" options={{ title: 'Detalhes do Campeonato' }} />
        <Stack.Screen name="adicionar" options={{ title: 'Novo Campeonato', presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}