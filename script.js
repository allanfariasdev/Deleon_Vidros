// ================================================================
// COLOQUE O WHATSAPP DA DELEON AQUI
//
// Use:
// 55 + DDD + número
//
// Coloque somente números.
//
// Exemplo:
// 5548999999999
// ================================================================

const numeroWhatsApp = "5548996015559";


// ================================================================
// PEGAR OS CARDS DO HTML
// ================================================================

const cards =
  document.querySelectorAll(".produto");

const quantidadeDisponivel =
  document.getElementById(
    "quantidadeDisponivel"
  );

const semResultados =
  document.getElementById(
    "semResultados"
  );


// ================================================================
// MOSTRAR O ESPAÇO DE ESPERA SE A FOTO NÃO EXISTIR
// ================================================================

document
  .querySelectorAll(".produto-foto img")
  .forEach(function (imagem) {

    imagem.addEventListener(
      "error",
      function () {

        imagem.style.display = "none";

        imagem.nextElementSibling.style.display =
          "flex";

      }
    );

    imagem.addEventListener(
      "load",
      function () {

        imagem.style.display = "block";

        imagem.nextElementSibling.style.display =
          "none";

      }
    );

  });


// ================================================================
// PREPARAR OS CARDS DISPONÍVEIS
// ================================================================

let totalDisponiveis = 0;

cards.forEach(function (card) {

  const estaDisponivel =
    card.dataset.disponivel === "true";

  if (!estaDisponivel) {

    card.style.display = "none";

    return;
  }

  totalDisponiveis++;

  const botao =
    card.querySelector(
      ".botao-interesse"
    );

  botao.addEventListener(
    "click",
    function () {

      enviarInteresse(card);

    }
  );

});


// ================================================================
// MOSTRAR A QUANTIDADE DE CARDS
// ================================================================

quantidadeDisponivel.textContent =
  totalDisponiveis;


// ================================================================
// MOSTRAR AVISO CASO NÃO TENHA NENHUM VIDRO
// ================================================================

if (totalDisponiveis === 0) {

  semResultados.hidden = false;

} else {

  semResultados.hidden = true;

}


// ================================================================
// ENVIAR AS INFORMAÇÕES DO CARD PARA O WHATSAPP
// ================================================================

function enviarInteresse(card) {

  const codigo =
    card
      .querySelector(".produto-codigo")
      .textContent
      .trim();

  const descricao =
    card
      .querySelector(".produto-descricao")
      .textContent
      .trim();

  const detalhes =
    card.querySelectorAll(
      ".detalhe strong"
    );

  const espessura =
    detalhes[0]
      .textContent
      .trim();

  const quantidade =
    detalhes[1]
      .textContent
      .trim();

  const largura =
    detalhes[2]
      .textContent
      .trim();

  const altura =
    detalhes[3]
      .textContent
      .trim();

  const preco =
    card
      .querySelector(".preco strong")
      .textContent
      .trim();

  const mensagem = [

    "Olá, DELEON! Tenho interesse neste vidro:",

    "",

    codigo,

    `Descrição: ${descricao}`,

    `Espessura: ${espessura}`,

    `Medidas: ${largura} x ${altura}`,

    `Quantidade: ${quantidade}`,

    `Preço: ${preco}`,

    "",

    "Esta peça ainda está disponível?"

  ].join("\n");

  const link =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(
    link,
    "_blank",
    "noopener,noreferrer"
  );

}


// ================================================================
// ANO AUTOMÁTICO NO RODAPÉ
// ================================================================

document.getElementById(
  "anoAtual"
).textContent =
  new Date().getFullYear();
