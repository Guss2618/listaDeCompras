import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { createProduto, updateProduto } from '../services/api';

export default function FormularioProdutoScreen({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (route.params?.produto) {
      const produto = route.params.produto;
      setNome(produto.nome);
      setQuantidade(produto.quantidade.toString());
      setValor(produto.valor.toString());
      setIsEditing(true);
    }
  }, [route.params]);

  const handleSalvar = async () => {
    if (!nome.trim() || !quantidade.trim() || !valor.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const quantidadeNum = parseInt(quantidade);
    const valorNum = parseFloat(valor);

    if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
      Alert.alert('Erro', 'A quantidade deve ser um número positivo');
      return;
    }

    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'O valor deve ser um número positivo');
      return;
    }

    const produtoData = {
      nome: nome.trim(),
      quantidade: quantidadeNum,
      valor: valorNum,
    };

    try {
      setLoading(true);
      
      if (isEditing) {
        await updateProduto(route.params.produto.id, produtoData);
      } else {
        await createProduto(produtoData);
      }
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome do Produto</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome do produto"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={styles.input}
            value={quantidade}
            onChangeText={setQuantidade}
            placeholder="Digite a quantidade"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            placeholder="Digite o valor"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={[styles.botaoSalvar, loading && styles.botaoDesabilitado]}
            onPress={handleSalvar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.textoBotaoSalvar}>
                {isEditing ? 'Atualizar' : 'Salvar'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  botaoSalvar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoDesabilitado: {
    backgroundColor: '#ccc',
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotaoCancelar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
