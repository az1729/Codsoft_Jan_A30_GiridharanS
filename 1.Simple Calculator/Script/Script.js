let otp = document.getElementById("otp");

let botoesNumericos = document.querySelectorAll(".numero");
botoesNumericos.forEach(function (button) {
    button.addEventListener("click", function () {

        if (otp.value === "0") {
            otp.value = ""
        }
        otp.value += button.innerText.trim();
    });
});

let botaoPonto = document.querySelectorAll(".ponto");
botaoPonto.forEach(function (botao) {
    botao.addEventListener("click", function () {

        if (otp.value.includes(".")) {
            return;
        }
        otp.value += botao.innerText.trim();
    });
});

let botoesOperando = document.querySelectorAll(".operando");
botoesOperando.forEach(function (botao) {
    botao.addEventListener("click", function () {

        if (otp.value === "0") {
            otp.value = ""
        }

        let ultimoCaractere = otp.value.slice(-1);
        let ultimoCaractereEOperador = "+-x÷".includes(ultimoCaractere);

        if (!ultimoCaractereEOperador) {
            otp.value += botao.innerText.trim();
        }
        else {
            otp.value = otp.value.substring(0, otp.value.length - 1);
            otp.value += botao.innerText.trim();
        }
    });
});

let limparotp = document.getElementById("botaoClean");
limparotp.addEventListener("click", limpar);

function limpar() {
    otp.value = "0"
};

let apagarNumero = document.getElementById("botaoBack");
apagarNumero.addEventListener("click", apagar);

function apagar() {
    otp.value = otp.value.substring(0, otp.value.length - 1);

    if (otp.value === "") {
        otp.value = "0"
    }
};

let calcularNumero = document.getElementById("botaoResultado");
calcularNumero.addEventListener("click", calcular);

function calcular() {
    let otp = document.getElementById("otp").value;
    let novaString1 = otp.replace(/x/g, "*");
    let novaString2 = novaString1.replace(/÷/g, "/");
    let novaStringFinal = novaString2;

    try {
        let calcular = new Function('return ' + novaStringFinal);
        let resultado = calcular();
        document.getElementById("otp").value = resultado;

        let resultadoString = resultado.toString();

        if (resultadoString.length > 10) {
            let resultadoEmNumero = resultado
            let resultadoFormatado = resultadoEmNumero.toFixed(2);
            let resultadoFinal = document.getElementById("otp");
            resultadoFinal.value = resultadoFormatado
        }
    } catch (error) {
        let otp = document.getElementById("otp");
        otp.value = otp.value.substring(0, otp.value.length - 1);
        
        if (otp.value === "") {
            otp.value = "0"
        }
    }
};
