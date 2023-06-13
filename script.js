async function getCEPInfo(cep) {
    let info = {result: "ok"}

    cep = cep.replace(/\D/g, "");
    if (cep.length != 8) {
        info.result = "error";
        info.error = "CEP inválido";
        return info;
    }

    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => { return response.json(); })
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
    p.classList.add("border", "border-muted", "bg-white", "rounded-2", "p-3");
    if (info.result == "ok") {
        p.innerHTML = `<b>CEP:</b> ${info.data.cep}<br><b>Logradouro:</b> ${info.data.logradouro}<br><b>Bairro:</b> ${info.data.bairro}<br><b>Cidade:</b> ${info.data.localidade}<br><b>Estado:</b> ${info.data.uf}`;
    } else if (info.result == "error") {
        p.innerHTML = "<b>Erro:</b> " + (info.error ?? "API retornou erro");
    }
}