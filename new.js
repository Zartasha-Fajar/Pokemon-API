const poke_container = document.getElementById("poke-container");

const pokemon_count = 1250;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5", 
};

const main_types = Object.keys(colors);  // we are converting the keys of object into an array.
// console.log("main_types: ", main_types);


const fetchPokemon = async () => {    
  for (let i = 1; i < pokemon_count; i++) {
    await getPokemon(i);
  }
};

// async function fetchPokemon() {
//   for (let i = 1; i < pokemon_count; i++) {
//     await getPokemon(i)  // "i" is working as an argument.
//   }
// }


// const getPokemon = async (id) => {
async function getPokemon(id) {

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log("data Pokemon: ", data);
  showData(data);
};

function showData(data) {
  let pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const name = data.name[0].toUpperCase() + data.name.slice(1);    // venusaur
  const id = data.id.toString().padStart(3, "0");

  const typeMap = data.types.map((types) => types.type.name);
// console.log("typeMap: ", typeMap);

      // types: [
      //   {
      //     slot: 1,
      //     type: {
      //       name: "water",
      //       url: "https://pokeapi.co/api/v2/type/11/"
      //     }  

      //   },
      //   {
      //     slot: 2,
      //     type: {
      //       name: "ground",
      //       url: "https://pokeapi.co/api/v2/type/5/"
      //     }  

      //   }
      // ] 
 
  const type = main_types.find((type1) => typeMap.indexOf(type1) > -1);

  // console.log("type: ", type);
  const color = colors[type];
  // console.log(color);

  pokemonEl.style.backgroundColor = color;

  const pokeInnerHtml = `
  <div class="img-container">
    <img src="${data.sprites.front_shiny}" alt="">
  </div>
  <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span> </small>
  </div>`;
  pokemonEl.innerHTML = pokeInnerHtml;
  poke_container.append(pokemonEl);
}

fetchPokemon();