# Programação Web I - Arquivos e Upload no PHP

## 1. O que este guia ensina

Esta seção apresenta leitura, escrita e upload de arquivos no servidor. O objetivo é manipular texto, CSV e JSON, compreender caminhos e permissões e receber arquivos sem confiar nos dados fornecidos pelo navegador.

Ao final deste guia, você deve conseguir:

- diferenciar arquivos de texto, CSV, JSON e arquivos enviados;
- trabalhar com caminhos de forma previsível;
- usar funções diretas e funções com ponteiro;
- escolher modos de abertura;
- ler e gravar CSV;
- converter dados entre arrays PHP e JSON;
- receber um upload por formulário ou `FormData`;
- interpretar os códigos de `$_FILES`;
- validar tamanho e tipo real;
- gerar um nome seguro e mover o arquivo;
- evitar sobrescrita, execução indevida e exposição de dados.

## 2. Arquivos como persistência

Dados em uma variável desaparecem ao fim da requisição. Um arquivo permite guardar informações no servidor.

Arquivos funcionam bem para:

- configurações pequenas;
- exportações e importações;
- registros simples de aula;
- dados CSV;
- documentos e imagens enviados.

Para cadastros concorrentes, relacionamentos e consultas complexas, banco de dados costuma ser mais adequado.

## 3. Caminhos

Um caminho relativo pode depender do diretório de execução. `__DIR__` representa a pasta do arquivo PHP atual.

```php
$caminho = __DIR__ . "/dados/config.json";
```

Isso é mais previsível que depender apenas de `"dados/config.json"`.

Nunca use diretamente um caminho recebido do usuário para abrir um arquivo:

```php
// Inseguro: pode permitir acesso fora da pasta esperada.
$conteudo = file_get_contents($_GET["arquivo"]);
```

O servidor deve escolher o diretório e permitir somente arquivos conhecidos.

## 4. Leitura direta

`file_get_contents()` lê todo o conteúdo em uma string.

```php
$caminho = __DIR__ . "/mensagem.txt";
$conteudo = file_get_contents($caminho);

if ($conteudo === false) {
    echo "Não foi possível ler o arquivo.";
    exit;
}
```

É simples e adequado para arquivos pequenos. Um arquivo muito grande pode ocupar memória demais.

## 5. Escrita direta

```php
$resultado = file_put_contents(
    __DIR__ . "/mensagem.txt",
    "Conteúdo atualizado."
);

if ($resultado === false) {
    echo "Não foi possível gravar o arquivo.";
}
```

Por padrão, o conteúdo anterior é substituído.

Para acrescentar:

```php
file_put_contents(
    __DIR__ . "/registro.log",
    "Nova linha\n",
    FILE_APPEND | LOCK_EX
);
```

`LOCK_EX` solicita um bloqueio exclusivo durante a escrita e reduz conflitos entre gravações simultâneas.

## 6. Ponteiros com `fopen()`

`fopen()` abre um arquivo e devolve um recurso.

```php
$arquivo = fopen(__DIR__ . "/dados.txt", "r");

if ($arquivo === false) {
    echo "Falha ao abrir.";
    exit;
}

while (($linha = fgets($arquivo)) !== false) {
    echo htmlspecialchars($linha) . "<br>";
}

fclose($arquivo);
```

Feche o recurso quando terminar.

## 7. Modos de abertura

| Modo | Comportamento |
| --- | --- |
| `r` | somente leitura; arquivo precisa existir |
| `r+` | leitura e escrita; arquivo precisa existir |
| `w` | escrita; apaga o conteúdo ou cria |
| `w+` | leitura e escrita; apaga ou cria |
| `a` | escrita no final; cria se necessário |
| `a+` | leitura e escrita no final |
| `x` | cria para escrita e falha se já existir |

O modo `w` pode apagar um arquivo inteiro. Escolha o modo antes de abrir.

## 8. CSV

CSV representa registros em linhas e colunas separadas por um delimitador. No Brasil, ponto e vírgula é comum porque a vírgula pode aparecer em números.

```text
nome;turma;media
Ana;2AT;8.4
Bruno;2AM;6.8
```

### Leitura

```php
$arquivo = fopen(__DIR__ . "/alunos.csv", "r");

if ($arquivo === false) {
    exit("Não foi possível abrir o CSV.");
}

$cabecalho = fgetcsv($arquivo, null, ";");
$alunos = [];

while (($linha = fgetcsv($arquivo, null, ";")) !== false) {
    $alunos[] = [
        "nome" => $linha[0],
        "turma" => $linha[1],
        "media" => (float) $linha[2]
    ];
}

fclose($arquivo);
```

Testar diretamente o retorno de `fgetcsv()` evita o padrão impreciso `while (!feof(...))`.

### Escrita

```php
$arquivo = fopen(__DIR__ . "/alunos.csv", "a");

if ($arquivo !== false) {
    fputcsv($arquivo, ["Carla", "2AT", 9.1], ";");
    fclose($arquivo);
}
```

`fputcsv()` cuida de delimitadores e aspas melhor que a concatenação manual.

## 9. JSON

JSON mantém chaves, valores e listas em um formato de texto estruturado.

Leitura:

```php
$texto = file_get_contents(__DIR__ . "/config.json");
$config = json_decode($texto, true);

if (!is_array($config)) {
    echo "Configuração inválida.";
    exit;
}
```

Escrita:

```php
$config["updated_at"] = date("c");

$json = json_encode(
    $config,
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
);

file_put_contents(
    __DIR__ . "/config.json",
    $json,
    LOCK_EX
);
```

`JSON_UNESCAPED_UNICODE` mantém caracteres acentuados legíveis no arquivo.

## 10. Erros de JSON

Em PHP moderno, exceções tornam falhas explícitas:

```php
try {
    $dados = json_decode($texto, true, 512, JSON_THROW_ON_ERROR);
    $json = json_encode($dados, JSON_THROW_ON_ERROR);
} catch (JsonException $error) {
    echo "O arquivo JSON está inválido.";
}
```

Não substitua o arquivo original se a conversão falhar.

## 11. Escrita segura de um cadastro JSON

Fluxo:

1. abrir e ler;
2. converter;
3. validar a estrutura;
4. alterar o array em memória;
5. converter novamente;
6. gravar com bloqueio;
7. conferir o retorno.

Arquivos simples ainda podem sofrer disputa se várias requisições fizerem leitura e escrita ao mesmo tempo. Para uso multiusuário, banco de dados oferece controle mais adequado.

## 12. Formulário de upload

No envio tradicional, `enctype="multipart/form-data"` é obrigatório.

```html
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <label for="foto">Foto</label>
    <input id="foto" name="foto" type="file" accept=".jpg,.png,.webp">
    <button type="submit">Enviar</button>
</form>
```

`accept` ajuda a interface, mas não protege o servidor.

Com AJAX:

```js
const dados = new FormData(formulario);

await fetch('upload.php', {
    method: 'POST',
    body: dados
});
```

Não defina manualmente o `Content-Type` ao enviar `FormData`.

## 13. A superglobal `$_FILES`

```php
$foto = $_FILES["foto"] ?? null;
```

Campos principais:

| Campo | Significado |
| --- | --- |
| `name` | nome original informado pelo navegador |
| `tmp_name` | arquivo temporário criado pelo PHP |
| `size` | tamanho em bytes |
| `type` | tipo informado pelo cliente; não é confiável |
| `error` | código do resultado do upload |

O arquivo temporário pode ser removido ao final da requisição. Ele precisa ser validado e movido durante o processamento.

## 14. Códigos de erro

O primeiro teste deve ser `error`.

```php
if (!isset($_FILES["foto"])) {
    echo "Nenhum arquivo foi recebido.";
    exit;
}

$foto = $_FILES["foto"];

if ($foto["error"] !== UPLOAD_ERR_OK) {
    echo "O upload não foi concluído.";
    exit;
}
```

Códigos frequentes:

- `UPLOAD_ERR_OK`: envio concluído;
- `UPLOAD_ERR_INI_SIZE`: excedeu o limite do PHP;
- `UPLOAD_ERR_FORM_SIZE`: excedeu limite informado no formulário;
- `UPLOAD_ERR_PARTIAL`: envio incompleto;
- `UPLOAD_ERR_NO_FILE`: nenhum arquivo selecionado.

## 15. Validação de tamanho

```php
$limite = 1024 * 1024;

if ($foto["size"] <= 0 || $foto["size"] > $limite) {
    echo "A imagem deve ter no máximo 1 MB.";
    exit;
}
```

O servidor também possui limites em `php.ini`, como `upload_max_filesize` e `post_max_size`.

## 16. Tipo real do arquivo

Extensão e `$_FILES["type"]` vêm do cliente e podem ser falsificados.

Use Fileinfo:

```php
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($foto["tmp_name"]);

$tiposPermitidos = [
    "image/jpeg" => "jpg",
    "image/png" => "png",
    "image/webp" => "webp"
];

if (!isset($tiposPermitidos[$mime])) {
    echo "Tipo de arquivo não permitido.";
    exit;
}

$extensao = $tiposPermitidos[$mime];
```

Em uma aplicação que realmente processa imagens, também é possível tentar decodificá-las com uma biblioteca apropriada. Validar o tipo não torna qualquer conteúdo seguro para qualquer uso.

## 17. Nome gerado pelo servidor

Não use o nome original como destino.

```php
$nomeSeguro = bin2hex(random_bytes(16)) . "." . $extensao;
```

Isso:

- evita colisões comuns;
- impede que o usuário escolha o caminho;
- não expõe o nome local;
- torna o nome difícil de adivinhar.

Guarde o nome original apenas como metadado quando houver necessidade.

## 18. Movendo o upload

```php
$diretorio = __DIR__ . "/uploads";
$destino = $diretorio . "/" . $nomeSeguro;

if (!is_dir($diretorio) || !is_writable($diretorio)) {
    echo "Diretório de upload indisponível.";
    exit;
}

if (!move_uploaded_file($foto["tmp_name"], $destino)) {
    echo "Não foi possível salvar o arquivo.";
    exit;
}
```

`move_uploaded_file()` verifica se a origem veio de um upload HTTP válido.

## 19. Endpoint de upload em JSON

```php
header("Content-Type: application/json; charset=utf-8");

// Validações anteriores...

if (!move_uploaded_file($foto["tmp_name"], $destino)) {
    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => "Não foi possível salvar a imagem."
    ]);

    exit;
}

echo json_encode([
    "status" => "OK",
    "result" => [
        "filename" => $nomeSeguro
    ],
    "message" => "Imagem enviada."
]);
```

Não devolva o caminho interno completo do servidor.

## 20. Onde armazenar uploads

Quando possível:

- mantenha uploads fora da pasta pública;
- sirva arquivos por um endpoint que verifique autorização;
- se precisarem ser públicos, desabilite execução de scripts no diretório;
- defina permissões mínimas;
- limite tipos e tamanho;
- remova arquivos órfãos quando o cadastro falhar;
- não permita que o nome forme subdiretórios.

Aceitar somente imagens não significa que o diretório pode executar PHP enviado pelo usuário.

## 21. Consistência entre arquivo e banco

No cadastro de produto com foto:

1. validar campos;
2. validar upload;
3. mover o arquivo;
4. inserir o registro no banco;
5. se o `INSERT` falhar, remover o arquivo que ficou sem registro.

Outra estratégia é gravar primeiro em uma área temporária e confirmar depois. O ponto principal é não ignorar falhas parciais.

## 22. Downloads

Ao entregar um arquivo protegido:

```php
header("Content-Type: application/pdf");
header('Content-Disposition: attachment; filename="relatorio.pdf"');
header("Content-Length: " . filesize($caminho));
readfile($caminho);
```

Antes disso, valide sessão, autorização e o caminho escolhido pelo servidor.

## 23. Relação com as práticas do repositório

### Upload introdutório

Pasta: [`exemplos/ex11.1`](../exemplos/ex11.1/)

Mostra `$_FILES`, códigos de erro, limite, extensões e `move_uploaded_file()`. Use-o como base histórica e acrescente validação de MIME nos projetos atuais.

## 24. Exercícios propostos

- [Importador de Merenda em CSV](./importador-merenda-csv/README.md): valida cabeçalho e linhas e separa registros aceitos de rejeitados.
- [Diário de Bordo](./diario-bordo/README.md): acrescenta eventos com bloqueio e filtra somente na leitura.
- [Catálogo JSON com Escrita Segura](./catalogo-json/README.md): usa arquivo temporário e cópia de segurança em um CRUD.
- [Galeria de Imagens Segura](./galeria-segura/README.md): valida o arquivo real e compensa falha na gravação dos metadados.
- [Exportador de Frequência](./exportador-frequencia/README.md): gera um CSV para download sem misturar HTML.

## 25. Erros comuns

- depender de um caminho relativo imprevisível;
- abrir com `w` e apagar o conteúdo sem perceber;
- usar `while (!feof())` e processar uma linha inválida;
- concatenar CSV manualmente;
- chamar `json_decode()` e não verificar o resultado;
- escrever um cadastro sem considerar concorrência;
- esquecer `multipart/form-data`;
- confiar em `accept`, extensão ou `$_FILES["type"]`;
- não verificar `UPLOAD_ERR_*`;
- usar o nome original como destino;
- salvar arquivo executável em pasta pública;
- mover a foto e ignorar a falha posterior no banco.

## 26. Boas práticas

- use `__DIR__` para caminhos internos;
- confira o retorno das operações de arquivo;
- use funções próprias para CSV e JSON;
- aplique bloqueio quando houver escrita simples concorrente;
- valide erro, tamanho e MIME do upload;
- gere o nome no servidor;
- restrinja permissões e execução;
- mantenha uploads fora da pasta pública quando possível;
- trate a consistência entre arquivo e registro;
- nunca exponha caminhos internos em mensagens.

## 27. Resumo final

Os pontos centrais desta seção são:

- arquivos permitem persistência simples no servidor;
- funções diretas leem ou gravam o conteúdo inteiro;
- `fopen()` oferece controle por ponteiro e modo;
- `fgetcsv()` e `fputcsv()` tratam registros delimitados;
- JSON conecta texto a arrays PHP;
- uploads chegam em `$_FILES`;
- extensão e MIME informado pelo cliente não são confiáveis;
- upload seguro exige validação, nome gerado, destino controlado e permissões adequadas;
- banco de dados é mais apropriado quando concorrência e consultas ficam complexas.
