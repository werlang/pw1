<?php

/**
 * Registro de estudante com campos associativos.
 * Alguns campos opcionais podem não estar definidos no array.
 */
$estudante = [
    "nome" => "Beatriz Ramos",
    "matricula" => "202410",
    "curso" => "Técnico em Informática",
    "turma" => "2AT",
    "media" => 8.7,
    "ativo" => true
];

// Leitura defensiva de campos opcionais utilizando o operador ??
$telefone = $estudante["telefone"] ?? "Não informado";
$observacao = $estudante["observacao"] ?? "Nenhuma pendência registrada";

// Tratamento de exibição
$situacaoMatricula = ($estudante["ativo"] ?? false) ? "Matrícula Ativa" : "Matrícula Trancada";
$classeStatus = ($estudante["ativo"] ?? false) ? "ativo" : "inativo";
$mediaFormatada = number_format($estudante["media"] ?? 0, 1, ",", ".");
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil do Estudante</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main>
        <header>
            <h1>Ficha do Estudante</h1>
            <p>Apresentação de registro associativo com operador de coalescência nula.</p>
        </header>

        <article class="cartao-perfil">
            <div class="cabecalho-perfil">
                <div class="avatar"><?= strtoupper(substr($estudante["nome"], 0, 1)) ?></div>
                <div class="titulos">
                    <h2><?= htmlspecialchars($estudante["nome"]) ?></h2>
                    <span class="subtitulo">Matrícula: <?= htmlspecialchars($estudante["matricula"]) ?></span>
                </div>
                <span class="badge-status <?= $classeStatus ?>"><?= $situacaoMatricula ?></span>
            </div>

            <div class="grade-campos">
                <div class="campo">
                    <span class="rotulo">Curso</span>
                    <strong><?= htmlspecialchars($estudante["curso"]) ?></strong>
                </div>

                <div class="campo">
                    <span class="rotulo">Turma</span>
                    <strong><?= htmlspecialchars($estudante["turma"]) ?></strong>
                </div>

                <div class="campo">
                    <span class="rotulo">Média Geral</span>
                    <strong class="destaque-nota"><?= $mediaFormatada ?></strong>
                </div>

                <div class="campo">
                    <span class="rotulo">Telefone de Contato</span>
                    <span class="valor-opcional <?= $telefone === 'Não informado' ? 'vazio' : '' ?>">
                        <?= htmlspecialchars($telefone) ?>
                    </span>
                </div>
            </div>

            <div class="bloco-observacao">
                <span class="rotulo">Observações Pedagógicas</span>
                <p><?= htmlspecialchars($observacao) ?></p>
            </div>
        </article>
    </main>
</body>
</html>
