---
marp: true
theme: ifsul
header: ' '
footer: 'Instituto Federal Sul-rio-grandense | Campus Charqueadas'
---

<!-- _class: lead -->

# Programação Web I
## Arquivos e Upload no PHP

Prof. Pablo Werlang
pablowerlang@ifsul.edu.br

---

# Arquivos no PHP
## Persistência fora da memória

<div class="grid grid-cols-2 gap-6 h-full">
<div>

- Texto para dados simples
- CSV para linhas e colunas
- JSON para estruturas
- Upload para documentos e imagens
- Banco para consultas e concorrência maiores

</div>
<div class="media mx-auto">
    <img class="placeholder" alt="Prompt de IA: arquivo físico, planilha CSV, ficha JSON e fotografia chegando a um servidor organizado, composição didática leve e memorável">
</div>
</div>

---

# Arquivos no PHP
## Quando usar?

- Configuração pequena
- Importação e exportação
- Registro simples de aula
- Documento ou imagem enviada

Cadastros concorrentes e relações complexas pedem banco de dados.

---

# Arquivos no PHP
## Caminho previsível com `__DIR__`

```php
$caminho = __DIR__ . "/dados/config.json";
```

- `__DIR__` aponta para a pasta do arquivo atual
- Evita depender do diretório de execução
- O servidor escolhe a pasta permitida

Nunca abra diretamente um caminho recebido do usuário.

---

<!-- _class: divider -->

# Leitura e Escrita

---

# Arquivos no PHP
## Ler o conteúdo inteiro

```php
$conteudo = file_get_contents(
    __DIR__ . "/mensagem.txt"
);

if ($conteudo === false) {
    exit("Falha na leitura");
}
```

É simples e adequado para arquivos pequenos.

---

# Arquivos no PHP
## Escrever ou acrescentar

```php
file_put_contents(
    __DIR__ . "/registro.log",
    "Nova linha\n",
    FILE_APPEND | LOCK_EX
);
```

- Sem `FILE_APPEND`, o conteúdo é substituído
- `LOCK_EX` reduz conflito entre gravações
- Sempre confira o retorno

---

# Arquivos no PHP
## Ponteiro com `fopen()`

```php
$arquivo = fopen(__DIR__ . "/dados.txt", "r");

while (($linha = fgets($arquivo)) !== false) {
    echo htmlspecialchars($linha);
}

fclose($arquivo);
```

O ponteiro permite processar o arquivo aos poucos.

---

# Arquivos no PHP
## Escolha o modo antes de abrir

| Modo | Comportamento |
| :--- | :--- |
| `r` | lê; precisa existir |
| `w` | escreve; apaga ou cria |
| `a` | acrescenta; cria |
| `x` | cria; falha se existir |

O modo `w` pode apagar tudo que já estava no arquivo.

---

<!-- _class: divider -->

# CSV

---

# CSV
## Linhas, colunas e delimitador

```text
nome;turma;media
Ana;2AT;8.4
Bruno;2AM;6.8
```

- Cada linha representa um registro
- O delimitador separa colunas
- Ponto e vírgula evita conflito com vírgula decimal

---

# CSV
## Lendo com `fgetcsv()`

```php
$arquivo = fopen(__DIR__ . "/alunos.csv", "r");
$cabecalho = fgetcsv($arquivo, null, ";");

while (($linha = fgetcsv($arquivo, null, ";")) !== false) {
    $alunos[] = $linha;
}

fclose($arquivo);
```

Teste o retorno da leitura, não apenas `feof()`.

---

# CSV
## Escrevendo com `fputcsv()`

```php
$arquivo = fopen(__DIR__ . "/alunos.csv", "a");

if ($arquivo !== false) {
    fputcsv($arquivo, ["Carla", "2AT", 9.1], ";");
    fclose($arquivo);
}
```

A função cuida de delimitadores e aspas.

---

<!-- _class: divider -->

# JSON

---

# JSON
## Texto estruturado

```php
$texto = file_get_contents(
    __DIR__ . "/config.json"
);

$config = json_decode($texto, true);
```

- `true` pede array associativo
- Verifique se a estrutura recebida é válida
- JSON conecta arquivo, PHP e JavaScript

---

# JSON
## Gravando de forma legível

```php
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

---

# JSON
## Erro precisa ser visível

```php
try {
    $dados = json_decode(
        $texto,
        true,
        512,
        JSON_THROW_ON_ERROR
    );
} catch (JsonException $error) {
    exit("JSON inválido");
}
```

Não sobrescreva o arquivo quando a conversão falhar.

---

# JSON
## Fluxo de cadastro simples

1. Ler o arquivo
2. Converter para array
3. Validar a estrutura
4. Alterar os dados em memória
5. Converter novamente
6. Gravar e conferir o resultado

Muitos usuários gravando ao mesmo tempo pedem banco de dados.

---

<!-- _class: divider -->

# Upload

---

# Upload
## Formulário com codificação própria

```html
<form action="upload.php" method="POST"
    enctype="multipart/form-data">
    <input name="foto" type="file"
        accept=".jpg,.png,.webp">
    <button type="submit">Enviar</button>
</form>
```

`accept` ajuda o usuário, mas não protege o servidor.

---

# Upload
## O arquivo chega em `$_FILES`

```php
$foto = $_FILES["foto"] ?? null;
```

| Campo | Informação |
| :--- | :--- |
| `name` | nome original |
| `tmp_name` | arquivo temporário |
| `size` | tamanho em bytes |
| `type` | tipo informado pelo cliente |
| `error` | resultado do upload |

---

# Upload
## Ordem de validação

1. O campo existe?
2. `error` é `UPLOAD_ERR_OK`?
3. O tamanho é permitido?
4. O MIME real é aceito?
5. O nome seguro foi gerado?
6. O destino está disponível?

Só depois o arquivo é movido.

---

# Upload
## Primeiro verifique o erro

```php
if (!isset($_FILES["foto"])) {
    exit("Nenhum arquivo recebido");
}

$foto = $_FILES["foto"];

if ($foto["error"] !== UPLOAD_ERR_OK) {
    exit("Upload não concluído");
}
```

---

# Upload
## Limite de tamanho

```php
$limite = 1024 * 1024;

if ($foto["size"] <= 0 ||
    $foto["size"] > $limite) {
    exit("Máximo: 1 MB");
}
```

O servidor também possui limites no `php.ini`.

---

# Upload
## Extensão não prova o conteúdo

```php
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($foto["tmp_name"]);

$permitidos = [
    "image/jpeg" => "jpg",
    "image/png" => "png",
    "image/webp" => "webp"
];
```

`$_FILES["type"]` e o nome vêm do cliente.

---

# Upload
## MIME permitido?

```php
if (!isset($permitidos[$mime])) {
    exit("Tipo não permitido");
}

$extensao = $permitidos[$mime];
```

O servidor escolhe a extensão a partir do tipo verificado.

---

# Upload
## Nome gerado no servidor

```php
$nomeSeguro =
    bin2hex(random_bytes(16)) .
    "." .
    $extensao;
```

- Evita sobrescrita comum
- Não aceita caminho escolhido pelo usuário
- Não expõe o nome local
- Dificulta adivinhação

---

# Upload
## Movendo para o destino

```php
$destino = __DIR__ . "/uploads/" . $nomeSeguro;

if (!move_uploaded_file(
    $foto["tmp_name"],
    $destino
)) {
    exit("Falha ao salvar");
}
```

`move_uploaded_file()` confirma que a origem é um upload HTTP.

---

# Upload
## Onde guardar?

- Fora da pasta pública, quando possível
- Em diretório sem execução de PHP
- Com permissões mínimas
- Atrás de autorização quando o arquivo é privado
- Sem devolver o caminho interno do servidor

“Aceita imagem” não significa “pode executar qualquer arquivo”.

---

# Upload
## Arquivo e banco precisam concordar

No cadastro de produto:

1. Validar campos e imagem
2. Mover o arquivo
3. Inserir o registro no banco
4. Se o `INSERT` falhar, remover o arquivo órfão

Falhas parciais também precisam de tratamento.

---

<!-- _class: divider -->

# Hora de Praticar

---

# Arquivos no PHP
## Exemplo de upload

- Ler `$_FILES`
- Conferir código de erro e limite
- Mover o arquivo recebido
- Reconhecer por que MIME e nome exigem cuidado adicional

Pasta: `exemplos/ex11.1/`

---

# Arquivos no PHP
## Exercícios: importar e persistir

- **Importador de Merenda:** valida linhas e registra rejeições  
  `12-php-arquivos/importador-merenda-csv/`
- **Diário de Bordo:** acrescenta eventos com bloqueio  
  `12-php-arquivos/diario-bordo/`
- **Catálogo JSON:** arquivo temporário e cópia de segurança  
  `12-php-arquivos/catalogo-json/`

---

# Upload
## Exercícios: upload e download

- **Galeria Segura:** MIME, nome gerado e metadados JSON  
  `12-php-arquivos/galeria-segura/`
- **Exportador de Frequência:** CSV enviado diretamente para download  
  `12-php-arquivos/exportador-frequencia/`

Um recebe arquivo; o outro produz arquivo. Os fluxos não são equivalentes.

---

# Arquivos e Upload
## Erros comuns

- Depender de caminho relativo imprevisível
- Abrir com `w` e apagar o conteúdo
- Não conferir retorno de leitura ou escrita
- Esquecer `multipart/form-data`
- Confiar em extensão ou `type`
- Usar o nome original como destino

---

# Arquivos e Upload
## O que precisa ficar

- `__DIR__` torna caminhos previsíveis
- CSV e JSON possuem funções próprias
- Escrita precisa tratar falhas e concorrência
- Upload chega em `$_FILES`
- Erro, tamanho e MIME são validados
- Nome e destino são controlados pelo servidor
