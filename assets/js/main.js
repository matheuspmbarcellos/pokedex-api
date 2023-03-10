const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.getElementById('content')

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
            
            <div style="max-width: 97%; width: 377px; margin: auto">
                <div>
                    <span class="pagination" style="justify-content: left;">
                    <button id="back" type="button">
                        Back
                    </button>
                    </span>
                </div>
                
                <div>
                    <li class="pokemon ${pokemon.type} ">
                        <span class="name" style="font-size: 2rem;">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                        
                        <div class="detail" style="flex-direction: column;">
                            <ol class="types" style="display: flex; align-self: flex-start" >
                                ${pokemon.types.map((type) => `
                                    <li class="type ${type}" >${type}</li>
                                    `).join('')}
                            </ol>
                            <img
                                src="${pokemon.photo}"
                                alt="${pokemon.name}"
                                style="display: flex; align-self: center; margin-top: 25px; margin-bottom: 25px; height: 190px; "
                            >
                        </div>

                        <div>
                            <div style="display: flex; justify-content: space-between;">
                                <span class="name">HP</span>
                                <span class="name">${pokemon.hp}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span class="name">Attack</span>
                                <span class="name">${pokemon.attack}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span class="name">Defense</span>
                                <span class="name">${pokemon.defense}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span class="name">Sp.Atk</span>
                                <span class="name">${pokemon.specialAttack}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span class="name">Sp.Def</span>
                                <span class="name">${pokemon.specialDefense}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span class="name">Speed</span>
                                <span class="name">${pokemon.speed}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span class="name">Total</span>
                                <span class="name">${pokemon.total}</span>
                            </div>
                        </div>
                    </li>
                </div>
            </div>


        
        `
        pokemonList.innerHTML = newHtmlDetail
        document.getElementById('loadMoreButton').style.display = 'none';
        const back = document.getElementById('back')
        back.addEventListener('click', () => window.location.replace("./"))
        return
    })
}