const card = document.querySelectorAll(".card");

card.forEach(function(card){

const cardInner = card.querySelector(".card-inner");
const personagem = card.querySelector(".personagem");

card.addEventListener("mousemove", function (event) {

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centroX = rect.width / 2;
    const centroY = rect.height / 2;

    const rotateY = ((x - centroX) / centroX) * 15;
    const rotateX = ((centroY - y) / centroY) * 15;

    cardInner.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const movimentoX = ((x - centroX) / centroX) * 12;
const movimentoY = ((y - centroY) / centroY) * 12;

personagem.style.transform =
    `translateZ(70px)
     translate(${movimentoX}px, ${movimentoY}px)`;

});

card.addEventListener("mouseleave", function () {

    cardInner.style.transform =
        "rotateX(0deg) rotateY(0deg)";

    personagem.style.transform =
    "translateZ(70px) translate(0px, 0px)";

});
});

 fetch('./dados/personagens.json')
 .then(response =>{
    if (!response.ok){
        throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
 })
 .then(dados => {
    console.log(dados);
    console.log(dados[0].nome);
    console.log(dados[0].poder);
    console.log(dados[0].nivelPoder);
 })
 .catch(erro => console.error('Erro:', erro));
