
let dropList = document.querySelectorAll("form select");
let deCurrency = document.querySelector(".de select");
let paraCurrency = document.querySelector(".para select");
let icon = document.querySelector(".img-seta-de-reverso");
let trocaTextoPorValor = document.querySelector(".resultado");
let obterButton = document.querySelector(".convert-button");


//adicionando tag de opção de moedas
for(let i=0; i < dropList.length; i++){
    for(let currency_code in Country_list){
        let selected= 
            i == 0 
                ? currency_code == "BRL" 
                    ? "selected" 
                    : "" 
                : currency_code == "USD" 
                    ? "selected" 
                    : "";
        let optionTag = `<option value="${currency_code}"  ${selected}> ${currency_code} </option>`;

        dropList[i].insertAdjacentHTML("beforeend", optionTag);

        dropList[i].addEventListener("change", (e) =>{
            loadFlag(e.target);
        })
    }

}

function loadFlag(element){
    for(let code in Country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector(".img-flag");
            imgTag.src = `https://flagcdn.com/48x36/${Country_list[
                code
            ].toLowerCase()}.png`;
        }
    }
}

obterButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeValue();

})


function getExchangeValue(){
    const quantidade = document.querySelector("form .input-currency");
    let  quantidadeValue = quantidade.value;
    if(quantidadeValue == "" || quantidadeValue == "0"){
        quantidade.value = "1";
        quantidadeValue = 1;
    }

    trocaTextoPorValor.innerText = "Obtendo taxa de câmbio...";
    let url = `https://v6.exchangerate-api.com/v6/03195df4b8af2259d5a1f8ab/latest/${deCurrency.value}`;
    fetch(url).then(Response => Response.json())
    .then(result => {
        let exchangerate = result.conversion_rates[paraCurrency.value];
        let total = (quantidadeValue * exchangerate).toFixed(2);
        trocaTextoPorValor.innerText = `${quantidadeValue} ${deCurrency.value} = ${total} ${paraCurrency.value}`;
    })
}