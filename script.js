async function buscaEndereco(cep) {
    const mensagemErro = document.querySelector('#erro');
    mensagemErro.innerHTML = '';
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var cepConvertido = await consultaCep.json(); // cepConvertido receberá um objeto json
        // erro = true, quando CEP é válido, mas não é existente
        if (cepConvertido.erro) {
            throw Error ('Cep inexistente')
            mensagemErro.innerHTML = `<p>CEP : ${cep} inválido! Tente Novamente.</p>`;
        } else {
            const inputCidade = document.querySelector('#cidade');
            const inputRua = document.querySelector('#bairro');
            const inputEstado = document.querySelector('#estado');
            const inputBairro = document.querySelector('#bairro');

            inputCidade.value = cepConvertido.localidade;
            inputRua.value = cepConvertido.logradouro;
            inputEstado.value = cepConvertido.uf;
            inputBairro.value = cepConvertido.bairro;
        }

    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP : ${cep} inválido! Tente Novamente.</p>`;
        console.log(erro);
    }
}

const inputCep = document.querySelector('#cep');

inputCep.addEventListener('focusout', () => {
    buscaEndereco(inputCep.value);

})

