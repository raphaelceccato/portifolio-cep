async function getCEPInfo(cep) {
    let info = {result: "ok"}

    cep = cep.replace(/\D/g, "");
    if (cep.length != 8) {
        info.result = "error";
        info.error = "CEP inválido";
        return info;
    }

    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => { return response.json();})
    .then(data => {
        if (data.erro)
            info.result = "error";
        else
            info.data = data;
    })
    .catch(error => {
        info.result = "error";
        info.error = error;
    });

    return info;
}


async function showCEP(cep) {
    let p = document.getElementById("resultado");

    let info = await getCEPInfo(cep);
    if (info.result == "ok") {
        p.innerText = `CEP: ${info.data.cep}\nLogradouro: ${info.data.logradouro}\nBairro:${info.data.bairro}\nCidade:${info.data.localidade}\nEstado:${info.data.uf}`;
    } else if (info.result == "error") {
        p.innerText = "Erro: " + (info.error ?? "API retornou erro");
    }
}