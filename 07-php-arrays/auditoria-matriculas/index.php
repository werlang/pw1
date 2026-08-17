<?php

/**
 * Lote de cadastros de estudantes importados para auditoria.
 * O array original não deve ser modificado durante o processo.
 */
$estudantes = [
    [
        "matricula" => "202401",
        "nome" => "Ana Souza",
        "turma" => "2AT",
        "email" => "ana@ifsul.edu.br",
        "ativo" => true
    ],
    [
        "matricula" => "202402",
        "nome" => "",
        "turma" => "2AM",
        "email" => "pedro@ifsul.edu.br",
        "ativo" => true
    ],
    [
        "matricula" => "202401", // Duplicidade proposital
        "nome" => "Carlos Lima",
        "turma" => "", // Ativo sem turma
        "email" => "carlos@ifsul.edu.br",
        "ativo" => true
    ],
    [
        "matricula" => "202404",
        "nome" => "Beatriz Silva",
        "turma" => "2AT",
        "email" => "", // E-mail ausente
        "ativo" => true
    ],
    [
        "matricula" => "202405",
        "nome" => "Lucas Rocha",
        "turma" => "",
        "email" => "lucas@ifsul.edu.br",
        "ativo" => false // Inativo sem turma é regular
    ]
];

// 1. Extração e detecção de duplicidades nas matrículas
$todasMatriculas = array_column($estudantes, "matricula");
$frequenciaMatriculas = array_count_values($todasMatriculas);

// 2. Contadores e estruturas de auditoria
$totalRegistros = count($estudantes);
$totalRegulares = 0;
$inconsistencias = [];

$tiposProblemas = [
    "Matrícula duplicada no lote" => 0,
    "Nome obrigatório ausente" => 0,
    "E-mail institucional ausente" => 0,
    "Estudante ativo sem turma" => 0
];

// 3. Auditoria registro a registro
foreach ($estudantes as $estudante) {
    $errosDoEstudante = [];

    // Verificação de duplicidade de matrícula
    if (($frequenciaMatriculas[$estudante["matricula"]] ?? 0) > 1) {
        $errosDoEstudante[] = "Matrícula duplicada no lote";
        $tiposProblemas["Matrícula duplicada no lote"]++;
    }

    // Verificação de nome preenchido
    if (trim($estudante["nome"] ?? "") === "") {
        $errosDoEstudante[] = "Nome obrigatório ausente";
        $tiposProblemas["Nome obrigatório ausente"]++;
    }

    // Verificação de e-mail preenchido
    if (trim($estudante["email"] ?? "") === "") {
        $errosDoEstudante[] = "E-mail institucional ausente";
        $tiposProblemas["E-mail institucional ausente"]++;
    }

    // Verificação de turma para estudantes ativos
    if (($estudante["ativo"] ?? false) === true && trim($estudante["turma"] ?? "") === "") {
        $errosDoEstudante[] = "Estudante ativo sem turma";
        $tiposProblemas["Estudante ativo sem turma"]++;
    }

    // Separação entre regulares e pendentes
    if (empty($errosDoEstudante)) {
        $totalRegulares++;
    } else {
        $inconsistencias[] = [
            "dados" => $estudante,
            "motivos" => $errosDoEstudante
        ];
    }
}

// 4. Cálculos estatísticos
$totalPendencias = count($inconsistencias);
$percRegulares = $totalRegistros > 0 ? ($totalRegulares / $totalRegistros) * 100 : 0;
$percPendencias = $totalRegistros > 0 ? ($totalPendencias / $totalRegistros) * 100 : 0;
$totalAlertasEmitidos = array_sum($tiposProblemas);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auditoria de Matrículas - Secretaria Acadêmica</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Painel de Auditoria de Matrículas</h1>
            <p>Diagnóstico de conformidade cadastral para emissão de cartões institucionais.</p>
        </header>

        <section class="painel-estatisticas" aria-label="Métricas da auditoria">
            <article class="cartao">
                <h2>Total Analisado</h2>
                <strong><?= $totalRegistros ?></strong>
                <span>registros no lote</span>
            </article>

            <article class="cartao regulares">
                <h2>Registros Regulares</h2>
                <strong><?= $totalRegulares ?></strong>
                <span><?= number_format($percRegulares, 1, ",", ".") ?>% do total</span>
            </article>

            <article class="cartao pendentes">
                <h2>Com Pendência</h2>
                <strong><?= $totalPendencias ?></strong>
                <span><?= number_format($percPendencias, 1, ",", ".") ?>% do total</span>
            </article>

            <article class="cartao alertas">
                <h2>Total de Alertas</h2>
                <strong><?= $totalAlertasEmitidos ?></strong>
                <span>inconsistências detectadas</span>
            </article>
        </section>

        <section class="frequencia-problemas">
            <h2>Detalhamento por Tipo de Inconsistência</h2>
            <div class="grade-problemas">
                <?php foreach ($tiposProblemas as $tipo => $quantidade) { ?>
                    <div class="item-problema <?= $quantidade > 0 ? 'tem-ocorrencia' : '' ?>">
                        <span class="nome-tipo"><?= htmlspecialchars($tipo) ?></span>
                        <strong class="contagem-tipo"><?= $quantidade ?></strong>
                    </div>
                <?php } ?>
            </div>
        </section>

        <section class="tabela-inconsistencias">
            <h2>Registros com Pendência para Correção (<?= $totalPendencias ?>)</h2>
            <div class="tabela-container">
                <table>
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome Informado</th>
                            <th>Turma</th>
                            <th>E-mail</th>
                            <th>Situação</th>
                            <th>Inconsistências Detectadas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($inconsistencias as $item) { ?>
                            <?php $est = $item["dados"]; ?>
                            <tr>
                                <td><code><?= htmlspecialchars($est["matricula"]) ?></code></td>
                                <td><?= !empty($est["nome"]) ? htmlspecialchars($est["nome"]) : '<span class="vazio">(Não preenchido)</span>' ?></td>
                                <td><?= !empty($est["turma"]) ? htmlspecialchars($est["turma"]) : '<span class="vazio">(Sem turma)</span>' ?></td>
                                <td><?= !empty($est["email"]) ? htmlspecialchars($est["email"]) : '<span class="vazio">(Não preenchido)</span>' ?></td>
                                <td>
                                    <span class="badge-status <?= $est["ativo"] ? 'ativo' : 'inativo' ?>">
                                        <?= $est["ativo"] ? "Ativo" : "Inativo" ?>
                                    </span>
                                </td>
                                <td>
                                    <div class="lista-motivos">
                                        <?php foreach ($item["motivos"] as $motivo) { ?>
                                            <span class="badge-erro"><?= htmlspecialchars($motivo) ?></span>
                                        <?php } ?>
                                    </div>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</body>
</html>
