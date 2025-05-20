const problems = [
    {
        "title": "Soma Simples",
        "description": "Leia dois valores inteiros, no caso para cada valor informado o programa deverá imprimir a soma dos dois valores.",
        "input": "1 2",
        "output": "SOMA = 3"
    },
    {
        "title": "Média 1",
        "description": "Leia N, que indica a quantidade de números que serão lidos, em seguida leia os N valores e calcule a média, com 1 casa decimal.",
        "input": "4 10 25 30 20",
        "output": "21.2"
    },
    {
        "title": "Maior e Posição",
        "description": "Leia um vetor com 100 posições, e encontre o maior elemento e sua posição no vetor.",
        "input": "2 113 45 78 90 23 56 12 34 67 89 10 32 54 76 98 21 43 65 87 9 31 53 75 97 20 42 64 86 8 30 52 74 96 19 41 63 85 7 29 51 73 95 18 40 62 84 6 28 50 72 94 17 39 61 83 5 27 49 71 93 16 38 60 82 4 26 48 70 92 15 37 59 81 3 25 47 69 91 14 36 58 80 2 24 46 68 90 13 35 57 79 1 23 45 67 89 12 34 56 78 0 22 44 66 88 11 33 55 77",
        "output": "Maior valor: 113\nPosição: 1"
    },
    {
        "title": "Preenchimento de Vetor I",
        "description": "Leia um valor X e preencha um vetor com 10 posições com os múltiplos de X.",
        "input": "5",
        "output": "N[0] = 5\nN[1] = 10\nN[2] = 15\nN[3] = 20\nN[4] = 25\nN[5] = 30\nN[6] = 35\nN[7] = 40\nN[8] = 45\nN[9] = 50"
    },
    {
        "title": "Contagem de Cédulas",
        "description": "Leia um valor inteiro. A seguir, calcule o menor número de notas possíveis (cédulas) no qual o valor pode ser decomposto.",
        "input": "576",
        "output": "576\n5 nota(s) de R$ 100,00\n1 nota(s) de R$ 50,00\n1 nota(s) de R$ 20,00\n0 nota(s) de R$ 10,00\n1 nota(s) de R$ 5,00\n0 nota(s) de R$ 2,00\n1 nota(s) de R$ 1,00"
    },
    {
        "title": "Sequência Lógica 2",
        "description": "Escreva um programa que leia um valor inteiro N. Este N é a quantidade de linhas de saída que serão apresentadas na execução do programa.",
        "input": "7",
        "output": "1 2 3 PUM\n5 6 7 PUM\n9 10 11 PUM\n13 14 15 PUM\n17 18 19 PUM\n21 22 23 PUM\n25 26 27 PUM"
    },
    {
        "title": "Área do Círculo",
        "description": "A fórmula para calcular a área de uma circunferência é: area = π . raio². Considerando para este problema que π = 3.14159",
        "input": "2.00",
        "output": "A=12.5664"
    },
    {
        "title": "Tempo de Jogo com Minutos",
        "description": "Leia a hora inicial, minuto inicial, hora final e minuto final de um jogo. A seguir calcule a duração do jogo.",
        "input": "7 8 9 10",
        "output": "O JOGO DUROU 2 HORA(S) E 2 MINUTO(S)"
    },
    {
        "title": "Intervalo",
        "description": "Você deve fazer um programa que leia um valor qualquer e apresente uma mensagem dizendo em qual dos seguintes intervalos ([0,25], (25,50], (50,75], (75,100]) este valor se encontra.",
        "input": "25.01",
        "output": "Intervalo (25,50]"
    },
    {
        "title": "Média 2",
        "description": "Leia 3 valores, no caso, variáveis A, B e C, que são as três notas de um aluno. A seguir, calcule a média do aluno, sabendo que a nota A tem peso 2, a nota B tem peso 3 e a nota C tem peso 5.",
        "input": "6.0 4.0 8.0",
        "output": "MEDIA = 5.4"
    },
];