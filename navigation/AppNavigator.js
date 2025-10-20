import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaProdutosScreen from '../screens/ListaProdutosScreen';
import FormularioProdutoScreen from '../screens/FormularioProdutoScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ListaProdutos"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="ListaProdutos"
          component={ListaProdutosScreen}
          options={() => ({
            title: 'Lista de Compras',
          })}
        />
        <Stack.Screen
          name="FormularioProduto"
          component={FormularioProdutoScreen}
          options={{
            title: 'Produto',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
