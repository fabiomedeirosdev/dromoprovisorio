// =========================================================
// UFOFORUM — SCRIPT.JS
// =========================================================


// =========================================================
// CONFIGURAÇÃO — GOOGLE APPS SCRIPT
// =========================================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyEfPAmBUpHcYVosG0qJ0-jfOZX_IbfRBy6vQCqd7pkQ2eXZwCv1-es3V7G9cxpjs92/exec";


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

form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // =====================================================
    // PEGA OS DADOS
    // =====================================================

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const whatsapp = whatsappInput.value.trim();
    const message = messageInput.value.trim();


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
        data: new Date().toLocaleString("pt-BR")

    };


    // =====================================================
    // MENSAGEM DE ENVIO
    // =====================================================

    formMessage.textContent =
        "Enviando...";

    formMessage.style.color =
        "#ffffff";


    // =====================================================
    // ENVIO PARA GOOGLE SHEETS
    // =====================================================

    try {

        await fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(interessado)

        });


        // =================================================
        // SUCESSO
        // =================================================


formMessage.innerHTML =
    "✅ <strong>Interesse enviado com sucesso!</strong><br>" +
    "Obrigado pelo cadastro. Entraremos em contato quando o UFOFORUM estiver disponível.";

formMessage.style.color = "#55e5b0";
formMessage.style.marginTop = "15px";
formMessage.style.lineHeight = "1.6";

form.reset();

        
        // =================================================
        // LIMPA O FORMULÁRIO
        // =================================================

        form.reset();


    } catch (erro) {

        console.error(
            "Erro ao enviar formulário:",
            erro
        );

        formMessage.textContent =
            "Não foi possível enviar seus dados. " +
            "Tente novamente.";

        formMessage.style.color =
            "#ff7777";

    }

});