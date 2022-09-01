// cada indice do array será um tipo
// dentro é um array com cada um dos 4 pokemons
// dentro é um objeto com o pokemon
const pokemon = [
    [
        {
            name: 'Squirtle',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
            description: 'When it retracts its long neck into its shell, it squirts out water with vigorous force.',
        },
        {
            name: 'Lapras',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/131.png',
            description: 'A smart and kindhearted Pokémon, it glides across the surface of the sea while its beautiful song echoes around it.',
        },
        {
            name: 'Starmie',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/121.png',
            description: 'This Pokémon has an organ known as its core. The organ glows in seven colors when it is unleashing its potent psychic powers.',
        },
        {
            name: 'Psyduck',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png',
            description: 'It is constantly beset by headaches. If the Pokémon lets its strange power erupt, apparently the pain subsides for a while.',
        },
    ],
    [
        {
            name: 'Charmander',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
            description: 'It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.',
        },
        {
            name: 'Ninetales',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/038.png',
            description: 'It is said to live 1,000 years, and each of its tails is loaded with supernatural powers.',
        },
        {
            name: 'Growlithe',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/058.png',
            description: 'It has a brave and trustworthy nature. It fearlessly stands up to bigger and stronger foes.',
        },
        {
            name: 'Moltres',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/146.png',
            description: 'It is one of the legendary bird Pokémon. When Moltres flaps its flaming wings, they glimmer with a dazzling red glow.',
        },
    ],
    [
        {
            name: 'Pikachu',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
            description: 'It can generate powerful electricity have cheek sacs that are extra soft and super stretchy.',
        },
        {
            name: 'Jolteon',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/135.png',
            description: 'If it is angered or startled, the fur all over its body bristles like sharp needles that pierce foes.',
        },
        {
            name: 'Electabuzz',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/125.png',
            description: 'Many power plants keep Ground-type Pokémon around as a defense against this Pokémon that come seeking electricity.',
        },
        {
            name: 'Magnemite',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/081.png',
            description: 'At times, It runs out of electricity and ends up on the ground. If you give batteries to a grounded Pokémon of this species, it will start moving again.',
        },
    ],
    [
        {
            name: 'Bulbasaur',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
            description: 'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger',
        },
        {
            name: 'Vileplume',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/045.png',
            description: 'It has the world\'s largest petals. With every step, the petals shake out heavy clouds of toxic pollen.',
        },
        {
            name: 'Scyther',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/123.png',
            description: 'As it fights more and more battles, its scythes become sharper and sharper. With a single slice, it can fell a massive tree.',
        },
        {
            name: 'Bellsprout',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/069.png',
            description: 'Prefers hot and humid places. It ensnares tiny bugs with its vines and devours them.',
        },
    ],
    [
        {
            name: 'Pidgeot',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/018.png',
            description: 'This Pokémon flies at Mach 2 speed, seeking prey. Its large talons are feared as wicked weapons.',
        },
        {
            name: 'Zubat',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png',
            description: 'It emits ultrasonic waves from its mouth to check its surroundings. Even in tight caves, it flies around with skill.',
        },
        {
            name: 'Farfetch\'d',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/083.png',
            description: 'The stalk this Pokémon carries in its wings serves as a sword to cut down opponents. In a dire situation, the stalk can also serve as food.',
        },
        {
            name: 'Aerodactyl',
            img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/142.png',
            description: 'This is a ferocious Pokémon from ancient times. Apparently even modern technology is incapable of producing a perfectly restored specimen.',
        },
    ],
];

let randomPok;
const buttons = document.querySelectorAll('button');
const images = document.querySelector('#images');

buttons.forEach((button, bi) => button.addEventListener('click', () => {
    const type = pokemon[bi];
    randomPok = parseInt(Math.random() * 4);
    
    document.querySelector('#description').innerHTML = type[randomPok].description;

    document.querySelectorAll('#images img').forEach((img, i) => {
        img.src = type[i].img;
    });

    document.querySelectorAll('#images .name').forEach((div, i) => {
        div.innerHTML = type[i].name;
    });

    images.classList.remove('hidden');
}));

let score = 0;
let stage = 0;

images.querySelectorAll('img').forEach((img, i) => img.addEventListener('click', () => {
    if (i == randomPok) {
        score++;
    }

    stage++;

    buttons.forEach(e => e.setAttribute('disabled', true));
    if (stage < buttons.length) {
        buttons[stage].removeAttribute('disabled');
    }

    const result = `<span>Acertos: ${score}</span>`;
    document.querySelector('#result').innerHTML = result;

    images.classList.add('hidden');
}));