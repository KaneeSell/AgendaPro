// Ao Carregar a Página
localStorage.setItem('edit', false)
if(!(JSON.parse(localStorage.getItem('eventos')))){localStorage.setItem('eventos', JSON.stringify([]))}
window.onload = function () {
    atualizarEventos();
    atualizarData();
}
setInterval(() => {
    atualizarData()
  }, 1000)
function atualizarData() {
    const data = new Date()
    const inputData = document.getElementById('data-atual')
    const inputHora = document.getElementById('hora-atual')
    const dia = data.getDate() < 10? `0${data.getDate()}`: `${data.getDate()}`
    const mes = data.getMonth()+1 < 10? `0${data.getMonth()+1}`: `${data.getMonth()+1}`
    const ano = data.getFullYear()
    const hora = data.getHours() < 10? `0${data.getHours()}`:`${data.getHours()}`
    const minuto = data.getMinutes() < 10? `0${data.getMinutes()}`:`${data.getMinutes()}`
    const segundo = data.getSeconds() < 10? `0${data.getSeconds()}`:`${data.getSeconds()}`
    const ampm = data.getHours() < 12? `am`:`pm`
    inputData.innerText = `${dia}/${mes}/${ano}`
    inputHora.innerText = `${hora}:${minuto}:${segundo} ${ampm}`
}
// modal - novo
const modal = document.getElementById("add-modal");
const btnNovo = document.getElementById("btn-add-modal");
const btnAtualizar = document.getElementById("btn-atualizar");
const h2Novo = document.getElementById("h2-novo");
const h2Edit = document.getElementById("h2-edit");
const btnClose = document.getElementsByClassName("add-close")[0];
const btnSalvar = document.getElementsByClassName("add-salvar")[0];
btnNovo.onclick = function(event) {
    event.preventDefault();
    localStorage.setItem('edit', false)
    modal.style.display = "block";
    h2Edit.style.display = "none";
    h2Novo.style.display = "block";
    document.getElementById('nome-evento').focus()
}
function limparTudo() {
    let limparTudo = prompt(`Se deseja limpar todos os eventos escreva LIMPAR TUDO`)
    if(limparTudo){
        limparTudo = limparTudo.toUpperCase()
    }
    if(limparTudo == `LIMPAR TUDO`){
        localStorage.setItem('edit', false)
        localStorage.setItem('eventos', JSON.stringify([]))
        atualizarEventos();
        alert('Registro de eventos foi Limpo!')
    }
}
btnClose.onclick = function(event) {
    event.preventDefault();
    document.getElementById('nome-evento').value = ''
    document.getElementById('descricao-evento').value = ''
    h2Edit.style.display = "none";
    h2Novo.style.display = "block";
    modal.style.display = "none";
    document.getElementsByClassName('alert-sucesso')[0].style.display = 'none'
    document.getElementsByClassName('alert-modal')[0].style.display = 'none'
    document.getElementsByClassName('alert-valido')[0].style.display = 'none'
}
window.onclick = function(event) {
    if (event.target == modal) {
        document.getElementById('nome-evento').value = ''
        document.getElementById('descricao-evento').value = ''
        h2Edit.style.display = "none";
        h2Novo.style.display = "block";
        modal.style.display = "none";
        document.getElementsByClassName('alert-sucesso')[0].style.display = 'none'
        document.getElementsByClassName('alert-modal')[0].style.display = 'none'
        document.getElementsByClassName('alert-valido')[0].style.display = 'none'
    }
}
btnAtualizar.onclick = function(event) {
    event.preventDefault();
    atualizarEventos();
}
// LocalStorage
function verificarEvento(nome){
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    if(eventos.length == 0){
        return true
    }
    for(let i = 0; i < eventos.length; i++){
        if(eventos[i].nome == nome && eventos[i].ativo == true){
            return false
        }
        if(i == eventos.length - 1){
            return true
        }
    }
}
function atualizaStorage(nome, descricao){
    let eventos = JSON.parse(localStorage.getItem("eventos"))
    let edit = JSON.parse(localStorage.getItem("edit"))
    let id
    const ativo = true
    if(h2Edit.style.display != 'none'){
        id = edit
        eventos[id] = {'id': id,'nome': nome, 'descricao': descricao, 'ativo': ativo};
    } else{
        id = eventos.length
        eventos.push({'id': id,'nome': nome, 'descricao': descricao, 'ativo': ativo});
    }
    localStorage.setItem("eventos", JSON.stringify(eventos));
}
function salvarEvento(e){
    e.preventDefault();
    let nome = document.getElementById('nome-evento').value
    let descricao = document.getElementById('descricao-evento').value
    if(verificarEvento(nome) || h2Edit.style.display != 'none'){
        atualizaStorage(nome, descricao)
        nome = ''
        descricao = ''
        document.getElementById('nome-evento').focus()
        document.getElementsByClassName('alert-sucesso')[0].style.display = 'flex'
        document.getElementsByClassName('alert-valido')[0].style.display = 'none'
        atualizarEventos();
    } else{
        document.getElementsByClassName('alert-sucesso')[0].style.display = 'none'
        document.getElementsByClassName('alert-modal')[0].style.display = 'flex'
        document.getElementsByClassName('alert-valido')[0].style.display = 'none'
        document.getElementById('nome-evento').focus()
    }
}
function consultarNome(){
    document.getElementsByClassName('alert-sucesso')[0].style.display = 'none'
    const nome = document.getElementById('nome-evento').value
    if(verificarEvento(nome)){
        document.getElementsByClassName('alert-valido')[0].style.display = 'flex'
        document.getElementsByClassName('alert-modal')[0].style.display = 'none'
    } else{
        document.getElementsByClassName('alert-modal')[0].style.display = 'flex'
        document.getElementsByClassName('alert-valido')[0].style.display = 'none'
    }
    if(h2Edit.style.display != 'none'){
        document.getElementsByClassName('alert-valido')[0].style.display = 'none'
        document.getElementsByClassName('alert-modal')[0].style.display = 'none'
    }
}

function atualizarEventos(){
    document.getElementById('eventos-painel').innerHTML = ''
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    if(eventos.length < 1){
        document.getElementById('eventos-painel').style.display = 'none'
    }
    else{
        document.getElementById('eventos-painel').style.display = 'none'
        for(let i = 0; i < eventos.length; i++){
            if(eventos[i].ativo){
                document.getElementById('eventos-painel').style.display = 'flex'
                criarDivEvento(eventos[i].nome, eventos[i].descricao, eventos[i].id)
                validador = true
            }
            if(validador == false){
            }
        }
    }
}
function criarDivEvento(nome, descricao, id){
    document.getElementById('eventos-painel').style.display = 'flex'
    const eventosPainel = document.getElementById('eventos-painel')
    eventosPainel.innerHTML += `<div id="evento-ativo">
                        <div id="nome-descricao">
                            <h4>${nome}</h4>
                            <p>${descricao}</p>
                        </div>
                        <div id="edit-del">
                            <button id="edit" onclick="editarEvento(${id})">Edit</button>
                            <button id="del" onclick="desativarEvento(${id})">Del</button>
                        </div>
                    </div>`
}
function editarEvento(id){
    edit = id
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    modal.style.display = "block";
    h2Edit.style.display = "block";
    h2Novo.style.display = "none";
    localStorage.setItem(`edit`, id)
    document.getElementById('nome-evento').value = `${eventos[id].nome}`
    document.getElementById('descricao-evento').value = `${eventos[id].descricao}`
    document.getElementById('nome-evento').focus()
}
function desativarEvento(id){
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    const nome = eventos[id].nome
    const descricao = eventos[id].descricao
    const ativo = false
    eventos[id] = ({ 'id': id,'nome': nome, 'descricao': descricao, 'ativo': ativo});
    localStorage.setItem("eventos", JSON.stringify(eventos));
    atualizarEventos();
}