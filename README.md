# API do Projeto Momento

Este projeto foi criado para aprender e explorar o desenvolvimento de APIs usando o Spring Boot.

Este projeto possui uma API básica construída usando NodeJS e MySQL. Serve como exemplo para uso em sala de aula, fornecendo uma introdução à construção de APIs com SpringBoot e mostrando vários recursos e potencialidades das tecnologias envolvidas.

## Tecnologias usadas
**HTML e CSS:** Tecnologias para desenvolvimento de interface web.

**Javascript:** Interação do usuário e utilização do fetch para consumo da API.

**Postman:** Uma plataforma de colaboração para desenvolvimento e teste de API, que pode ser usada para interagir e testar os endpoints da API.

**MySQL:**

## Funcionários
Retorna informações sobre um funcionário com base no ID.

**Método HTTP:** GET

**Endpoint / Parâmetros de URL:** ```/funcionarios```

**Descrição**: Retorna uma lista de todos os funcionários disponíveis.

--- 

**Exemplo de Requisição:** ```GET /funcionarios```

**Endpoint / Parâmetros de URL:** /funcionarios/id/:funcionario_id

**Parâmetros de URL:** funcionario_id (integer) - ID do funcionário desejado.

--- 

**Exemplo de Requisição:** ```GET /funcionarios/123```

**Endpoint / Parâmetros de URL:** /funcionarios/nome/:nome

**Parâmetros de URL:** nome (string) - Noe do funcionário desejado.

---

**Exemplo de Requisição:** ```GET /funcionarios/nome/Alessandra Neves```

**Endpoint / Parâmetros de URL:** /funcionarios/departamento/:nome

**Parâmetros de URL:** nome (string) - Nome do departamento desejado.

--- 

**Exemplo de Requisição:** ```GET /funcionarios/departamento/marketing```

**Endpoint / Parâmetros de URL:** /funcionarios/cargo/:cargo

**Parâmetros de URL:** cargo (string) - Nome do cargo desejado.

--- 

**Exemplo de Requisição:** ```GET /funcionarios/cargo/contador```

**Endpoint / Parâmetros de URL:** /funcionarios/regiao/:nome

**Parâmetros de URL:** `nome` (string) - Nome da região desejada.

--- 

**Exemplo de Requisição:** ```GET /funcionarios/regiao/Americas```

**Endpoint / Parâmetros de URL:** /funcionarios/salario_gt/:valor

**Parâmetros de URL:** valor (int) - valor base para pesquisar valores **maiores**

--- 

**Exemplo de Requisição:** ```GET /funcionarios/salario_gt/2000```

**Endpoint / Parâmetros de URL:** /funcionarios/salario_lt/:valor

**Parâmetros de URL:** valor (int) - valor base para pesquisar valores **menores**

--- 

**Exemplo de Requisição:** ```GET /funcionarios/salario_lt/3000```

**Endpoint / Parâmetros de URL:** /funcionarios/escritorio/nome/:nome

**Parâmetros de URL:** nome (string) - nome da sala do escritório desejado.

**Exemplo de Requisição:** ```GET /funcionarios/escritorio/nome/Beta```

--- 

**Endpoint / Parâmetros de URL:** /funcionarios/escritorio/endereco/:endereco

**Parâmetros de URL:** endereco (string) - endereço da sala do escritório desejado.

**Exemplo de Requisição:** ```GET /funcionarios/escritorio/endereco/Bobos```

--- 

TODOS os endpoints acima trarão o mesmo tipo de resposta: 

**Exemplo de Respostas:**
```
{
  "funcionario_id": 123,
  "primeiro_nome": "Gabriel Augusto",
  "sobrenome": "Fernandes",
  "telefone": "123456789",
  "data_contratacao": "2023-01-01",
  "salario": 50000,
  "cargo": "Gerente Operacional",
  "min_salario": 40000,
  "max_salario": 60000,
  "departamento": "Marketing",
  "escritorio_nome": "Torre da Justiça",
  "escritorio_endereco": "Rua dos Bobos, 0.",
  "pais": "Brasil",
  "regiao": "Americas"
}

// ... Outros funcionários do mesmo departamento (Quando necessário ou disponível)
```
## Características
Esta API apresentará os seguintes recursos:

1. **Operações CRUD**: a API oferece suporte a operações básicas de CRUD (Criar, Ler, Atualizar, Excluir) para uma entidade específica.

2. **Arquitetura RESTful**: A API segue os princípios da Transferência de Estado Representacional (REST), fornecendo uma interface uniforme para interação com recursos.

3. **Validação**: os dados da solicitação são validados para garantir que atendam aos critérios exigidos antes do processamento.

Sinta-se à vontade para explorar e modificar o código para saber mais sobre como construir APIs com NodeJS.

## Configuração & Execução

Para executar localmente a API da Empresa Momento, siga estas etapas:

1. Certifique-se de ter o NodeJS instalado: `https://nodejs.org/`.
2. Clone este repositório para o seu ambiente local.
3. Execute o script `momento.sql` no seu banco MySQL.
4. Abra o projeto em sua IDE.
5. Atualize o arquivo `index.js` com as configurações do seu ambiente.
6. Abra o terminal, navegue até a pasta do seu projeto e utilize o comando para ver o projeto funcionando: `node index.js`
7. Abra o seu navegador e utilize o endereço `http://localhost:3000` (atenção aos endpoints).
8. Caso seja necessário, atualize o endereço da API dentro dos arquivos `.html`.

## Recursos
- [Documentação do Postman](https://learning.postman.com/docs/)
- [Documentação do NodeJS](https://nodejs.org/)

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE). Sinta-se à vontade para usar e modificar o código para fins educacionais.