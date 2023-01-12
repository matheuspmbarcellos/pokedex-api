const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {        
        const newHtml= pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="openPokemon('${pokemon.name}')">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                </div>
            </li>
        `).join('')   
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItens(offset, limit)
    }    
})

function openPokemon(name) {
    pokeApi.getPokemon(name).then((pokemon = []) => {
        const newHtmlDetail = `
        <div class="pagination">
            <button id="back" type="button">
                Back
            </button>
        </div>

        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>               

                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>        
        </li>        
        `
        pokemonList.innerHTML = newHtmlDetail
        document.getElementById('loadMoreButton').style.display = 'none';
        const back = document.getElementById('back')
        back.addEventListener('click', () => window.location.replace("./"))
        return
    })
}
