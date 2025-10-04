# Exercício 9: Curtir/Descurtir Posts

## Objetivo

Praticar toggle de estado com POST.

## Tema

Rede Social Simples

## Descrição

Liste posts e permita curtir/descurtir. O botão alterna entre "❤️ Curtir" e "💔 Descurtir".

## API

- **URL**: `/api/post/toggle-like.php`
- **Método**: `POST`
- **Body**: FormData com `post_id` e `action` ('like' ou 'unlike')

## Resposta
```json
{
    "liked": true,
    "likes": 42
}
```

## Tarefa

Implemente toggle, atualize contador e texto do botão baseado na resposta.
