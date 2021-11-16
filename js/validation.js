const inputs = document.querySelectorAll('input');
const select = document.querySelector('select');

const message = document.getElementById('message');
const button = document.getElementById('btnSend');

const pergunta1 = document.formulario.pergunta1;
const pergunta2 = document.formulario.pergunta2;
const pergunta3 = document.formulario.pergunta3;
const pergunta4 = document.formulario.pergunta4;
const idade = document.formulario.idade;

let messageError='';

function askValidate(pergunta, msg){
    console.log(pergunta.length);
    let count =0;
    for(let i=0; i<pergunta.length;i++){
        if(!pergunta[i].checked){
            count++;
        };
        if(count==pergunta.length){
            message.classList.remove('d-none');
            messageError += `Resposta não preenchida na ${msg}!<br/>`;
            return false;
        }
    };
};

function selectValidate(select){
    if(select.value == 'Idade'){
        message.classList.remove('d-none');
        messageError += `Campo ${select.name} inválido!<br/>`;
    };
}

function showResult() {
    return (
        parseInt(idade.value) + 
        parseInt(pergunta1.value) + 
        parseInt(pergunta2.value) + 
        parseInt(pergunta3.value) + 
        parseInt(pergunta4.value)
    ) / 3;
}

function togglePage(condition) {
    const formContainer = document.getElementById('formContainer');
    const resultContainer = document.getElementById('resultContainer');
    if(condition) {
        console.log('aqui');
        formContainer.classList.add('d-none');
        formContainer.classList.remove('d-block');
        resultContainer.classList.add('d-block');
        resultContainer.classList.remove('d-none');
    }
    else {
        formContainer.classList.add('d-block');
        formContainer.classList.remove('d-none');
        resultContainer.classList.add('d-none');
        resultContainer.classList.remove('d-block');
    }
}

function resultColor() {
    const result = showResult();
   if(result < 20) {
    return 'text-primary';       
   } else if(result < 30) {
    return 'text-warning';
   } else {
    return 'text-danger';
   }
}


function submit() {
    const nomeResult = document.getElementById('nomeResult');
    const result = document.getElementById('result');
    const nome = document.formulario.nome.value;
    const sobrenome = document.formulario.sobrenome.value;

    console.log('Chamada ao Banco de Dados Aqui!');
    nomeResult.innerHTML= `${nome} ${sobrenome}`;
    result.classList.add(resultColor());
    result.innerHTML = `${showResult().toFixed(1).replace('.',',')}%`;
    togglePage(true);
}

button.addEventListener('click', () => {
    messageError = ''
    inputs.forEach(input => {
        if(input.value == ''){
            message.classList.remove('d-none');
            messageError += `Campo ${input.name} inválido!<br/>`;
        };
    });
    selectValidate(select);
    askValidate(pergunta1, 'Pergunta 1');
    askValidate(pergunta2, 'Pergunta 2');
    askValidate(pergunta3, 'Pergunta 3');
    askValidate(pergunta4, 'Pergunta 4');
    if(messageError==''){
        console.log('result: ', showResult());
        submit();
    } else{
        message.innerHTML = messageError;
    }
});

togglePage(false);