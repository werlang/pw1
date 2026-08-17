<?php

/**
 * Itinerário inicial do ônibus intermunicipal do IFSul.
 * Os índices numéricos representam a ordem sequencial das paradas.
 */
$roteiroOriginal = [
    "Terminal Rodoviário",
    "Hospital Regional",
    "Praça Central",
    "Bairro Industrial",
    "Praça Central", // Duplicidade para teste de sanitização
    "Campus IFSul"
];

// Trabalha em uma cópia para preservar os dados originais
$roteiro = $roteiroOriginal;

// 1. Inserção no início da linha
array_unshift($roteiro, "Garagem da Empresa");

// 2. Inserção intermediária logo após "Hospital Regional"
$indiceHospital = array_search("Hospital Regional", $roteiro, true);
if ($indiceHospital !== false) {
    array_splice($roteiro, $indiceHospital + 1, 0, "Biblioteca Municipal");
}

// 3. Remoção de parada cancelada ("Bairro Industrial")
$indiceCancelada = array_search("Bairro Industrial", $roteiro, true);
if ($indiceCancelada !== false) {
    array_splice($roteiro, $indiceCancelada, 1);
}

// 4. Eliminação de paradas duplicadas e reindexação de 0 a N-1
$roteiro = array_values(array_unique($roteiro));

// Estatísticas da rota
$totalParadas = count($roteiro);
$totalTrechos = $totalParadas > 1 ? $totalParadas - 1 : 0;
$inicioLinha = $roteiro[0] ?? "—";
$fimLinha = $roteiro[$totalParadas - 1] ?? "—";
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor de Roteiro do Ônibus</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Editor de Roteiro - Transporte Escolar</h1>
            <p>Ajuste e validação sequencial do itinerário da linha estudantil.</p>
        </header>

        <section class="painel-estatisticas" aria-label="Resumo do itinerário">
            <article class="cartao">
                <h2>Total de Paradas</h2>
                <strong><?= $totalParadas ?></strong>
            </article>

            <article class="cartao">
                <h2>Total de Trechos</h2>
                <strong><?= $totalTrechos ?></strong>
            </article>

            <article class="cartao inicio">
                <h2>Início da Linha</h2>
                <strong><?= htmlspecialchars($inicioLinha) ?></strong>
            </article>

            <article class="cartao fim">
                <h2>Destino Final</h2>
                <strong><?= htmlspecialchars($fimLinha) ?></strong>
            </article>
        </section>

        <section class="comparativo-rotas">
            <article class="painel-lista original">
                <h2>Itinerário Original</h2>
                <ol>
                    <?php foreach ($roteiroOriginal as $indice => $parada) { ?>
                        <li>
                            <span class="indice-tag">[<?= $indice ?>]</span>
                            <?= htmlspecialchars($parada) ?>
                        </li>
                    <?php } ?>
                </ol>
            </article>

            <article class="painel-lista revisado">
                <h2>Itinerário Revisado</h2>
                <ol>
                    <?php foreach ($roteiro as $indice => $parada) { ?>
                        <li class="<?= $indice === 0 ? 'ponto-inicio' : ($indice === $totalParadas - 1 ? 'ponto-fim' : '') ?>">
                            <span class="indice-tag">[<?= $indice ?>]</span>
                            <strong><?= htmlspecialchars($parada) ?></strong>
                            <?php if ($indice === 0) { ?>
                                <span class="badge-tag">Partida</span>
                            <?php } elseif ($indice === $totalParadas - 1) { ?>
                                <span class="badge-tag final">Chegada</span>
                            <?php } ?>
                        </li>
                    <?php } ?>
                </ol>
            </article>
        </section>

        <section class="conexoes-intermediarias">
            <h2>Navegação de Trechos e Conexões</h2>
            <p>Inspeção das paradas intermediárias com seus respectivos pontos anterior e posterior:</p>

            <div class="grade-conexoes">
                <?php for ($i = 1; $i < $totalParadas - 1; $i++) { ?>
                    <article class="cartao-conexao">
                        <div class="bloco anterior">
                            <span class="rotulo">Origem do trecho</span>
                            <span class="nome-ponto"><?= htmlspecialchars($roteiro[$i - 1]) ?></span>
                        </div>

                        <div class="bloco atual">
                            <span class="rotulo">Parada <?= $i ?></span>
                            <strong><?= htmlspecialchars($roteiro[$i]) ?></strong>
                        </div>

                        <div class="bloco proximo">
                            <span class="rotulo">Destino do trecho</span>
                            <span class="nome-ponto"><?= htmlspecialchars($roteiro[$i + 1]) ?></span>
                        </div>
                    </article>
                <?php } ?>
            </div>
        </section>
    </main>
</body>
</html>
