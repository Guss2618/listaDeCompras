import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getProdutos, deleteProduto } from '../services/api';

export default function ListaProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const dados = await getProdutos();
      setProdutos(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (produto) => {
    setProdutoParaDeletar(produto);
    setModalVisible(true);
  };

  const confirmarDelete = async () => {
    try {
      await deleteProduto(produtoParaDeletar.id);
      setProdutos(produtos.filter(p => p.id !== produtoParaDeletar.id));
      setModalVisible(false);
      setProdutoParaDeletar(null);
      Alert.alert('Sucesso', 'Produto removido com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o produto');
    }
  };

  const cancelarDelete = () => {
    setModalVisible(false);
    setProdutoParaDeletar(null);
  };

  const renderProduto = ({ item }) => (
    <View style={styles.produtoItem}>
      <View style={styles.produtoInfo}>
        <Text style={styles.produtoNome}>{item.nome}</Text>
        <Text style={styles.produtoDetalhes}>
          Quantidade: {item.quantidade} | Valor: R$ {item.valor}
        </Text>
      </View>
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoEditar}
          onPress={() => navigation.navigate('FormularioProduto', { produto: item })}
        >
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoDeletar}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.textoBotao}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('FormularioProduto')}
      >
        <Text style={styles.textoBotaoAdicionar}>+ Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduto}
        style={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        onRequestClose={cancelarDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Confirmar Exclusão</Text>
            <Text style={styles.modalTexto}>
              Tem certeza que deseja remover o produto "{produtoParaDeletar?.nome}"?
            </Text>
            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={cancelarDelete}
              >
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoConfirmar}
                onPress={confirmarDelete}
              >
                <Text style={styles.textoBotaoConfirmar}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  botaoAdicionar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  textoBotaoAdicionar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    flex: 1,
  },
  produtoItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  produtoInfo: {
    marginBottom: 12,
  },
  produtoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  produtoDetalhes: {
    fontSize: 14,
    color: '#666',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoEditar: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 6,
    flex: 0.48,
    alignItems: 'center',
  },
  botaoDeletar: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 6,
    flex: 0.48,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalTexto: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  botaoCancelar: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    flex: 0.48,
    alignItems: 'center',
  },
  botaoConfirmar: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 6,
    flex: 0.48,
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textoBotaoConfirmar: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
