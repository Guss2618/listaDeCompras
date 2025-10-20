# Lista de Compras - React Native

Um aplicativo React Native com Expo para gerenciar uma lista de compras, desenvolvido como prova de conceito para validação de ideias antes do investimento em infraestrutura de backend completa.

## Funcionalidades

- ✅ **CRUD Completo**: Create, Read, Update, Delete de produtos
- ✅ **Navegação Fluida**: Transição entre telas usando React Navigation
- ✅ **Integração com API**: Comunicação com MockAPI usando Fetch API
- ✅ **Interface Intuitiva**: Design organizado e fácil de usar
- ✅ **Modal de Confirmação**: Confirmação obrigatória antes de deletar produtos
- ✅ **Validação de Dados**: Validação de campos obrigatórios e tipos de dados
- ✅ **Feedback Visual**: Loading states e mensagens de sucesso/erro

## Tecnologias Utilizadas

- **React Native** com **Expo**
- **React Navigation** para navegação entre telas
- **Fetch API** para comunicação com MockAPI
- **JavaScript** (ES6+)

## Estrutura do Projeto

```
├── App.js                          # Componente principal
├── navigation/
│   └── AppNavigator.js            # Configuração de navegação
├── screens/
│   ├── ListaProdutosScreen.js     # Tela de listagem
│   └── FormularioProdutoScreen.js # Tela de formulário
├── services/
│   └── api.js                     # Serviços de API
└── package.json
```

## API Endpoint

O aplicativo consome dados da API MockAPI:
- **URL Base**: `https://68f570696b852b1d6f141e9d.mockapi.io/produtos`
- **Schema**: 
  - `id`: Object ID (gerado automaticamente)
  - `nome`: Nome do produto (string)
  - `quantidade`: Quantidade (number)
  - `valor`: Preço do produto (number)

## Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o projeto**:
   ```bash
   npm start
   ```

3. **Executar em dispositivo**:
   - **Android**: `npm run android`
   - **iOS**: `npm run ios`
   - **Web**: `npm run web`

## Operações CRUD Implementadas

### Create (Criar)
- Formulário para adicionar novos produtos
- Validação de campos obrigatórios
- Envio para API via POST

### Read (Ler)
- Listagem automática de todos os produtos ao iniciar
- Atualização automática após operações CRUD
- Loading state durante carregamento

### Update (Atualizar)
- Navegação para formulário com dados pré-preenchidos
- Edição e salvamento de alterações
- Envio para API via PUT

### Delete (Deletar)
- Modal de confirmação obrigatório
- Remoção da API via DELETE
- Atualização automática da lista

## Critérios de Avaliação Atendidos

### G1: Navegação, Integração com API e Design (0,5 ponto)
- ✅ Navegação fluida entre telas com React Navigation
- ✅ Integração correta com MockAPI usando Fetch API
- ✅ Interface organizada e intuitiva
- ✅ Componentes bem distribuídos

### G2: Funcionalidades CRUD (1,5 ponto)
- ✅ Busca e exibição automática de registros
- ✅ Atualização automática da lista após operações
- ✅ Formulário de cadastro funcional
- ✅ Edição com dados pré-preenchidos
- ✅ Modal de confirmação para exclusão

## Desenvolvido por

Este projeto foi desenvolvido como parte de um desafio acadêmico para demonstrar competências em desenvolvimento mobile com React Native e integração com APIs externas.
