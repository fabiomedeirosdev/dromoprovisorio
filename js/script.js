// =========================================================
// UFOFORUM — SCRIPT.JS
// =========================================================


// =========================================================
// ELEMENTOS
// =========================================================

const form = document.getElementById("interest-form");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const whatsappInput = document.getElementById("whatsapp");

const messageInput = document.getElementById("message");

const formMessage = document.getElementById("form-message");


// =========================================================
// MÁSCARA DO WHATSAPP
// =========================================================

whatsappInput.addEventListener("input", function () {

    let value = this.value.replace(/\D/g, "");

    value = value.substring(0, 11);

    if (value.length <= 2) {

        this.value = value
            ? `(${value}`
            : "";

    } else if (value.length <= 7) {

        this.value =
            `(${value.substring(0, 2)}) ` +
            value.substring(2);

    } else {

        this.value =
            `(${value.substring(0, 2)}) ` +
            `${value.substring(2, 7)}-` +
            `${value.substring(7, 11)}`;

    }

});


// =========================================================
// ENVIO DO FORMULÁRIO
// =========================================================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const whatsapp =
        whatsappInput.value.trim();

    const message =
        messageInput.value.trim();


    // =====================================================
    // VALIDAÇÃO
    // =====================================================

    if (!name || !email || !whatsapp) {

        formMessage.textContent =
            "Preencha nome, e-mail e WhatsApp.";

        formMessage.style.color =
            "#ff7777";

        return;
    }


    // =====================================================
    // VALIDAÇÃO DO E-MAIL
    // =====================================================

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(email)) {

        formMessage.textContent =
            "Digite um e-mail válido.";

        formMessage.style.color =
            "#ff7777";

        emailInput.focus();

        return;
    }


    // =====================================================
    // DADOS DO INTERESSADO
    // =====================================================

    const interessado = {

        nome: name,

        email: email,

        whatsapp: whatsapp,

        mensagem: message,

        data:
            new Date().toLocaleString(
                "pt-BR"
            )

    };


    // =====================================================
    // TEMPORÁRIO
    //
    // Por enquanto mostramos os dados no console.
    // Depois vamos substituir isso pelo envio para
    // seu backend/banco de dados.
    // =====================================================

    console.log(
        "Novo interessado:",
        interessado
    );


    // =====================================================
    // MENSAGEM PARA O USUÁRIO
    // =====================================================

    formMessage.textContent =
        "Obrigado! Seu interesse foi registrado. " +
        "Em breve entraremos em contato.";

    formMessage.style.color =
        "#55e5b0";


    // =====================================================
    // LIMPA O FORMULÁRIO
    // =====================================================

    form.reset();

});