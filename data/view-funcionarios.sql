DROP VIEW IF EXISTS `momento`.dados_dos_funcionarios;

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `momento`.dados_dos_funcionarios AS
    SELECT 
        momento.funcionarios.funcionario_id AS funcionario_id,
        momento.funcionarios.primeiro_nome AS primeiro_nome,
        momento.funcionarios.sobrenome AS sobrenome,
        momento.funcionarios.email AS email,
        momento.funcionarios.telefone AS telefone,
        momento.funcionarios.data_contratacao AS data_contratacao,
        momento.funcionarios.salario AS salario,
        momento.departamentos.departamento_nome AS departamento_nome,
        momento.ocupacoes.ocupacao_nome AS cargo,
        momento.ocupacoes.min_salario AS min_salario,
        momento.ocupacoes.max_salario AS max_salario
    FROM
        ((momento.funcionarios
        JOIN momento.ocupacoes ON ((momento.funcionarios.ocupacao_id = momento.ocupacoes.ocupacao_id)))
        JOIN momento.departamentos ON ((momento.funcionarios.departamento_id = momento.departamentos.departamento_id)))