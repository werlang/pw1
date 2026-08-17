<?php

/**
 * Lista de presença e parâmetros de consulta para verificação.
 */
$chamada = [
    "Ana Souza",
    "Bruno Lima",
    "Carla Dias",
    "Daniel Rocha",
    "Eduarda Ramos"
];

// Lista de nomes para testar na interface
$consultas = [
    "Carla Dias",
    "Ana Souza",   // Está na posição 0
    "Felipe Silva" // Não está na lista
];

$totalPresentes = count($chamada);

// Realiza as buscas para cada consulta
$resultadosConsultas = [];

foreach ($consultas as $nome) {
    $estaPresente = in_array($nome, $chamada, true);
    $indice = array_search($nome, $chamada, true);

    $resultadosConsultas[] = [
        "nome" => $nome,
        "presente" => $estaPresente,
        "encontrado" => ($indice !== false), // Comparação estrita essencial
        "indice" => $indice,
        "ordem" => ($indice !== false) ? $indice + 1 : null
    ];
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificador de Presença</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Verificador de Presença</h1>
            <p>Busca e validação em arrays com <code>in_array()</code> e <code>array_search()</code>.</p>
        </header>

        <section class="painel-resumo">
            <article class="cartao">
                <h2>Total de Presentes</h2>
                <strong><?= $totalPresentes ?></strong>
                <span>estudantes na ata</span>
            </article>
        </section>

        <section class="conteudo-principal">
            <div class="bloco-chamada">
                <h2>Ata de Presença da Turma</h2>
                <ol class="lista-chamada">
                    <?php foreach ($chamada as $posicao => $estudante) { ?>
                        <li>
                            <span class="ordem-tag"><?= $posicao + 1 ?>º</span>
                            <strong><?= htmlspecialchars($estudante) ?></strong>
                            <span class="indice-sub">índice [<?= $posicao ?>]</span>
                        </li>
                    <?php } ?>
                </ol>
            </div>

            <div class="bloco-consultas">
                <h2>Consultas Realizadas</h2>
                <div class="grade-consultas">
                    <?php foreach ($resultadosConsultas as $item) { ?>
                        <article class="cartao-consulta <?= $item['encontrado'] ? 'presente' : 'ausente' ?>">
                            <div class="cabecalho-consulta">
                                <h3><?= htmlspecialchars($item["nome"]) ?></h3>
                                <span class="badge-status <?= $item['encontrado'] ? 'presente' : 'ausente' ?>">
                                    <?= $item['encontrado'] ? "Presente" : "Ausente" ?>
                                </span>
                            </div>

                            <p class="detalhe-consulta">
                                <?php if ($item["encontrado"]) { ?>
                                    Localizado na <strong><?= $item["ordem"] ?>ª posição</strong> da lista (índice <code><?= $item["indice"] ?></code>).
                                <?php } else { ?>
                                    Estudante não encontrado na chamada do dia.
                                <?php } ?>
                            </p>
                        </article>
                    <?php } ?>
                </div>
            </div>
        </section>
    </main>
</body>
</html>
