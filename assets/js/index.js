const form = document.querySelector('form');
const cardSection = document.getElementById('cards');
const valor = document.getElementById('cidadeInput');
let contador = 0;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(valor.value.length === 0){
        alert('Please select a city');
        form.reset();
    }
    else chamarApi();
})

const buscarNomeCidade = async (nomeDaCidade) => {
    const url = 'http://api.weatherapi.com/v1';
    const key = 'ab970fb46f55404f8da235513232003';
    const metodo = "/current.json";

    const dadosCidade = await fetch(`${url}${metodo}?q=${nomeDaCidade}&key=${key}&days=5&lang=pt`, 
    { mode: "cors" }).then(response => response.json()).catch((error) => console.log(error));
    return dadosCidade;
}

const cardsInfo = async (element) => {
    const divContainer = document.createElement('div');
    const divContent = document.createElement('div');

    divContainer.classList.add("container");
    divContent.classList.add("content");
    divContainer.innerHTML = `<h2>${element.title}</h2>`
    divContent.innerHTML = `<p>${element.valor}</p>`;

    cardSection.append(divContainer);
    divContainer.append(divContent);
    }


const removeElements = () => {
    cardSection.innerHTML = "";
}


const chamarApi = async () => {
    const informacaoCidade = await buscarNomeCidade(valor.value);

    const elements = [
        { title: 'Nome da cidade:', tag: 'name', valor: informacaoCidade.location.name },
        { title: 'Nome da região:', tag: 'region', valor: informacaoCidade.location.region },
        { title:'Temperatura ºC', tag: 'temp', valor: informacaoCidade.current.temp_c },
    ];
    
    contador++;
    if(contador >= 2){
        removeElements();
    }
    elements.forEach((element) => cardsInfo(element));
}

