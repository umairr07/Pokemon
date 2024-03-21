let pokemonContainer = document.getElementById('pokemonContainer');

let search = document.getElementById('search');
// console.log(search.value);

let filter = document.getElementById('filter');
let type = document.getElementById('type')
// console.log(type);

let colors = {
    grass: "rgb(22, 171, 22)",
    fire: "rgb(255, 98, 0)",
    water: "rgb(0, 183, 255)",
    bug: "#00ffa6",
    normal: "#ebb5b5",
    poison: "#fe0000",
    electric: "#0033fe",
    ground: "#a52a2a",
    fairy: "#e41165",
    fighting: "#0400ff",
    psychic: "#d4ff00",
    rock: "#ff7300",
    ghost: "#a4a4ff",
    ice: "#74d0f4",
    dragon: "#bc1900"
}


function createPokemonCard(details) {
    let card = document.createElement('div');
    card.classList.add("card");

    card.innerHTML = `
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div class="id">${details.id}</div>
          <img src="${details.sprites.front_default}" alt="" />
        </div>
        <div>${details.name}</div>

        <div class="flip-card-back">
          <img src="${details.sprites.back_default}" />
          <div class="abilities">${details.abilities[0].ability.name}</div>
          <div class="name">${details.name}</div>
        </div>
      </div>
    </div>
    `

    card.querySelector('.flip-card-inner').style.backgroundColor = colors[details.types[0].type.name]
    return card;
}


search.addEventListener('input', () => {
    // console.log(searchval.value);
    let allcard = document.querySelectorAll(".card");
    let pokcards = Array.from(allcard);
    // console.log(pokcards);   
    pokcards.forEach(item => {
        // console.log(item)
        let pokname = item.children[0].children[0].children[0].children[4].innerHTML;
        console.log(pokname);
        if (pokname.startsWith(search.value)) {

            item.style.display = 'block';
        }
        else {
            item.style.display = "none";

        }
    })
})

filter.addEventListener('click', () => {
    let allCards = document.querySelectorAll('.card');
    // console.log(allCards);
    let array = Array.from(allCards);

    array.forEach((element) => {
        let pkType = element.children[0].children[0].children[3].innerText;
        console.log(pkType);

        if (pkType === type.value) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})


async function fetchPokemon(i) {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    let data = await res.json();
    // console.log(data);
    return data;
}


async function fetchData() {
    for (let i = 1; i <= 151; i++) {
        let pokemon = await fetchPokemon(i);
        let card = createPokemonCard(pokemon);
        pokemonContainer.append(card);
    }
}


fetchData();

