# Projeto Final - Programa Desenvolve - Grupo Boticário / Alura

## Descrição do Projeto

Este projeto final, proposto pela equipe Alura juntamente com o grupo Boticário, visa o desenvolvimento de um site completo para uma empresa de cosméticos. O projeto é dividido em três fases principais, cada uma com objetivos e tecnologias específicas:

## Escopo do Projeto

### Fase 1: Desenvolvimento do Site Responsivo

- **Objetivo**: Criar um site responsivo completo para uma empresa do ramo de cosméticos, com um layout flexível que se adapte a dispositivos móveis e desktop.
- **Tecnologias**: HTML, CSS.
- **Tarefas**:
  - Estruturar páginas da web utilizando HTML e CSS.
  - Desenvolver um layout que responda a diferentes tamanhos de tela.
  - Implementar um cabeçalho e um rodapé consistentes.
  - Utilizar variáveis CSS para facilitar a manutenção e a atualização do design.

### Fase 2: Adição de Funcionalidades Interativas

- **Objetivo**: Aprimorar o site responsivo criado na Fase 1 com funcionalidades interativas e dinâmicas.
- **Tecnologias**: JavaScript.
- **Tarefas**:
  - Adicionar elementos interativos, como menus suspensos, carrosséis de imagens e exibição de informações ao passar o mouse.
  - Implementar outros recursos dinâmicos para melhorar a experiência do usuário.

### Fase 3: Desenvolvimento da API e Funcionalidade de Autenticação

- **Objetivo**: Desenvolver uma API REST para fornecer dados ao site e implementar uma funcionalidade de autenticação.
- **Tecnologias**: Node.js, Express, MongoDB, Mongoose, JSON Web Token (JWT), bcryptjs, DAYJS, Nodemon.
- **Tarefas**:
  - **API REST**:
    - Criar uma API REST utilizando Node.js e Express.
    - Armazenar dados no banco de dados MongoDB.
    - Integrar o frontend com a API para fornecer dados dinâmicos.
  - **Autenticação**:
    - Implementar autenticação utilizando JSON Web Token (JWT) para validar usuários.
    - Utilizar bcryptjs para criptografar senhas dos usuários.

## Instruções para Execução

1. **Clone o Repositório**

   ```bash
   git clone git@github.com:CelsoSiqueira1996/ProjetoFinal-ProgramaDesenvolve.git
   ```

2. **Instale as Dependências**

   - **Backend**:
     Navegue até o diretório do backend e instale as dependências:

     ```bash
     cd back-end
     npm install
     ```

3. **Configuração do Banco de Dados**

   Certifique-se de que o MongoDB está em execução e configure a conexão com o banco de dados no arquivo de configuração do backend.

4. **Configuração da Autenticação**

   Configure as variáveis de ambiente para JWT conforme necessário para a autenticação de usuários.

5. **Execute o Projeto**

   - **Frontend**:

     abrir o arquivo index.html no navegador

   - **Backend**:

     ```bash
     cd back-end
     npm run dev
     ```

6. **Usuários**
   A aplicação apresenta um controle de acesso por meio de permissões. Existem dois tipos de usuários: "user" e o "admin". Apenas usuários "admin" possuem permissões especiais, e são capazes de gerenciar produtos, usuários e tokens gerados. Já os usuários "user" são os usuários padrão, podendo visualizar os produtos, editar e deletar o próprio perfil e editar o próprio carrinho de compras.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Para mais informações e suporte, entre em contato comigo via [LinkedIn](https://www.linkedin.com/in/celso-jacinto-de-siqueira-neto-23500a170/).
