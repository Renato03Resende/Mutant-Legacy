 fetch('./dados/personagens.json')
 .then(response =>{
    if (!response.ok){
        throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
 })
 .then(dados => {
    const container = document.querySelector(".CardHerois");
if(!container){
    throw new Error('Não encontrei a seção .CardHerois');
}
    container.innerHTML = "";

    dados.forEach(personagem =>{
        const card = document.createElement("div");
        card.classList.add("card");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardBg = document.createElement("div");
        cardBg.classList.add("card-bg");
        if(personagem.cor){
            cardBg.style.background = `radial-gradient(
            circle at center,
            ${personagem.cor},
            #07110b 70%,
            #020604 100%
            )`;
        }

        const imagem = document.createElement("img");
        imagem.classList.add("personagem");
        imagem.src = personagem.imagem;
        imagem.alt = personagem.nome;

        const glow = document.createElement("div");
        glow.classList.add("card-glow");
        if(personagem.corGlow){
            glow.style.background = `linear-gradient(
            115deg,
            transparent 20%,
            rgba(255, 255, 255, 0.35) 45%,
            ${personagem.corGlow}40,
            transparent 70%
            )`;
        }

        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");

        const titulo = document.createElement("h2");
        titulo.textContent = personagem.nome;

        // Nome civil
        const linhaNome = document.createElement("div");
        linhaNome.classList.add("info-linha");

        const labelNome = document.createElement("span");
        labelNome.textContent = "NOME:";

        const nomeCivil = document.createElement("span");
        nomeCivil.textContent = personagem.nomeCivil;

        linhaNome.append(labelNome, nomeCivil);

        //Poder
        const linhaPoder = document.createElement("div");
        linhaPoder.classList.add("info-linha");

        const labelPoder = document.createElement("span");
        labelPoder.textContent = "PODER:";

        const poder = document.createElement("span");
        poder.textContent = personagem.poder;

        linhaPoder.append(labelPoder, poder);




        //Estrutura Interna
        cardInfo.append(titulo, linhaNome, linhaPoder);
        cardInner.append(cardBg, imagem, glow, cardInfo);
        card.append(cardInner);
        container.append(card);

    card.addEventListener("mousemove", event =>{
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

    imagem.style.transform =
    `translateZ(70px)
     translate(${movimentoX}px, ${movimentoY}px)`;

});

card.addEventListener("mouseleave", ()=> {

    cardInner.style.transform =
        "rotateX(0deg) rotateY(0deg)";

    imagem.style.transform =
    "translateZ(70px) translate(0px, 0px)";

});
});

 })
 .catch(erro => console.error('Erro:', erro));
