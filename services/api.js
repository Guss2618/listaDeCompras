const BASE_URL = 'https://68f570696b852b1d6f141e9d.mockapi.io/produtos';

export const getProdutos = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição GET:', error);
    throw error;
  }
};

export const createProduto = async (produto) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar produto');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição POST:', error);
    throw error;
  }
};

export const updateProduto = async (id, produto) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição PUT:', error);
    throw error;
  }
};

export const deleteProduto = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar produto');
    }
    return true;
  } catch (error) {
    console.error('Erro na requisição DELETE:', error);
    throw error;
  }
};
