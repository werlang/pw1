<?php
/**
 * API de Telemetria das Estações - IFSul
 * 
 * Fornece leituras simuladas de sensores ambientais.
 * Suporta simulação de erro 500 via query string (?falhar=1) para fins didáticos.
 */

header('Content-Type: application/json; charset=utf-8');

// 1. Apenas requisições GET são permitidas
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método não permitido. Utilize GET para consultar a telemetria.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Simulação de falha no servidor para testar resiliência do frontend
if (isset($_GET['falhar']) && $_GET['falhar'] === '1') {
    http_response_code(500);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro interno 500: Central de telemetria temporariamente indisponível.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. Gerador de pequenas variações de medições reais
function variar(float $base, float $amplitude): float {
    $delta = (mt_rand(-100, 100) / 100) * $amplitude;
    return round($base + $delta, 1);
}

// 4. Estações monitoradas com limites de segurança
$estacoes = [
    [
        'id' => 'estacao-cpd',
        'nome' => 'Sala de Servidores (CPD)',
        'local' => 'Bloco 2 - Térreo',
        'temperatura' => variar(21.5, 2.5),
        'limite_temperatura' => 26.0,
        'umidade' => variar(48.0, 5.0),
        'limite_umidade' => 60.0,
        'bateria' => 98,
        'status_operacional' => 'normal'
    ],
    [
        'id' => 'estacao-redes',
        'nome' => 'Laboratório de Redes',
        'local' => 'Bloco 3 - Sala 14',
        'temperatura' => variar(24.0, 2.0),
        'limite_temperatura' => 28.0,
        'umidade' => variar(54.0, 6.0),
        'limite_umidade' => 70.0,
        'bateria' => 86,
        'status_operacional' => 'normal'
    ],
    [
        'id' => 'estacao-estufa',
        'nome' => 'Estufa Didática de Agronomia',
        'local' => 'Área Externa Sul',
        'temperatura' => variar(29.0, 3.0),
        'limite_temperatura' => 35.0,
        'umidade' => variar(78.0, 7.0),
        'limite_umidade' => 85.0,
        'bateria' => 72,
        'status_operacional' => 'normal'
    ],
    [
        'id' => 'estacao-solar',
        'nome' => 'Estação Solar / Pátio Central',
        'local' => 'Pátio Central',
        'temperatura' => variar(26.5, 3.5),
        'limite_temperatura' => 34.0,
        'umidade' => variar(58.0, 8.0),
        'limite_umidade' => 75.0,
        'bateria' => 94,
        'status_operacional' => 'normal'
    ]
];

// 5. Avaliação do status operacional com base nos limites
foreach ($estacoes as &$estacao) {
    if ($estacao['temperatura'] > $estacao['limite_temperatura'] || $estacao['umidade'] > $estacao['limite_umidade']) {
        $estacao['status_operacional'] = 'alerta';
    }
}
unset($estacao);

// 6. Retorno bem-sucedido
http_response_code(200);
echo json_encode([
    'sucesso' => true,
    'servidor_horario' => date('H:i:s'),
    'timestamp' => time(),
    'total_estacoes' => count($estacoes),
    'estacoes' => $estacoes
], JSON_UNESCAPED_UNICODE);
exit;
