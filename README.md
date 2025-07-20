# Gerador de Configurações para Switches e Roteadores

## Descrição

Este projeto é uma aplicação web que auxilia na geração automática de configurações para switches e roteadores, com suporte aos vendors Mikrotik e Huawei. A ferramenta permite gerar configurações padronizadas para interfaces, VLANs, OSPF e outras funcionalidades de rede, reduzindo erros manuais e agilizando o processo de setup de dispositivos.

---

## Funcionalidades

- Geração automática de configurações para Mikrotik e Huawei.
- Suporte a múltiplas interfaces e diferentes tipos de sub-redes (ex: /30).
- Configuração de OSPF para roteadores Huawei.
- Exportação da configuração gerada em arquivo `.txt`.
- Visualização do histórico de configurações na sessão atual.
- Interface responsiva e fácil de usar construída com React e Material-UI.

---

## Tecnologias utilizadas

- React  
- Material-UI (MUI)  
- JavaScript/TypeScript  
- [Outros que você estiver usando, ex: Node.js]

---

## Como usar

### Pré-requisitos

- Node.js (versão 14+ recomendada)  
- npm ou yarn

### Passos para executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/nielkp/ConfigNetTool.git
   cd gerador-config-switch

2. Instale as dependências:

   ```bash
   npm install
   # ou yarn install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   # ou yarn start
   ```

4. Abra seu navegador e acesse:

   ```bash
   http://localhost:3000
   ```

5. Na interface, selecione o vendor (Mikrotik ou Huawei), preencha os campos solicitados (IP, interfaces, barramentos, etc.) e clique para gerar a configuração.

6. Visualize o resultado, exporte para .txt ou copie para aplicar no equipamento.

### Estrutura do projeto
- /src - Código-fonte da aplicação React.

- /public - Arquivos estáticos.

- Componentes React para formulário de entrada, geração e exibição das configurações.

- Módulos específicos para lógica de geração de configuração por vendor.

### Licença
- Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para detalhes.
