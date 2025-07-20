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
   git clone https://github.com/seuusuario/gerador-config-switch.git
   cd gerador-config-switch
```
