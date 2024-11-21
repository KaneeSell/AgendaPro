// Ao Carregar a Página
localStorage.setItem('edit', false)
window.onload = function () {
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    if(eventos){
    } else{
        localStorage.setItem("eventos", JSON.stringify('[]'));
    }
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
loadAjust()
function loadAjust(){
    const caracterNome = localStorage.getItem('caracterNome')
    const caracterDescricao = localStorage.getItem('caracterDescricao')
    if(caracterNome){
    } else{
        localStorage.setItem('caracterNome', 20)
    }
    if(caracterDescricao){
    } else{
        localStorage.setItem('caracterDescricao', 300)
    }
}



document.getElementById('h2-eventos').style.display = 'block';
// modal
const modal = document.getElementById("add-modal");
const modalVisualizar = document.getElementById("add-modal-visualizar");
const modalConfig = document.getElementById("add-modal-config");
const modalLimparTudo = document.getElementById("confirm-limpar-tudo");
const modalLimpoMsg = document.getElementById("msg-tudo-limpo");
const btnNovo = document.getElementById("btn-add-modal");
const btnAtualizar = document.getElementById("btn-atualizar");
const btnConfig = document.getElementById("btn-config");
const conteudoVisualizar = document.getElementById("conteudo-visualizar");
const h2Novo = document.getElementById("h2-novo");
const h2Edit = document.getElementById("h2-edit");
const limparTudoConfig = document.getElementById('limpar-tudo-config')
const btnClose = document.getElementsByClassName("add-close")[0];
const btnCloseVisualizar = document.getElementsByClassName("add-close")[1];
const btnCloseConfig = document.getElementsByClassName("add-close")[2];
const btnCloseLumparTudo = document.getElementsByClassName("add-close")[3];
const btnCloseLimpoMsg = document.getElementsByClassName("add-close")[4];
const btnSalvar = document.getElementsByClassName("add-salvar")[0];
const formEvent = document.getElementById('formAgenda')
btnNovo.onclick = function(event) {
    event.preventDefault();
    localStorage.setItem('edit', false)
    modal.style.display = "block";
    formEvent.style.display = "flex";
    h2Edit.style.display = "none";
    h2Novo.style.display = "block";
    modalVisualizar.style.display = "none";
    modalConfig.style.display = "none";
    document.getElementById('nome-evento').focus()
}

btnClose.onclick = function(event) {
    fecharModal()
}
btnCloseVisualizar.onclick = function(event) {
    event.preventDefault();
    fecharModal()
}
btnCloseConfig.onclick = function(event) {
    event.preventDefault();
    fecharModal()
}
btnCloseLumparTudo.onclick = function(event) {
    event.preventDefault();
    fecharModal()
}
btnCloseLimpoMsg.onclick = function(event) {
    event.preventDefault();
    fecharModal()
}
limparTudoConfig.onclick = function(event) {
    event.preventDefault();
    fecharModal()
    modal.style.display = "block";
    modalLimparTudo.style.display = "block"
}

function limparTudo(event) {
    event.preventDefault();
    const confirm = (document.getElementById('confirm').value).toUpperCase()
    if(confirm == 'LIMPAR TUDO'){
        console.log('uer')
        localStorage.setItem('edit', false)
        localStorage.setItem('eventos', JSON.stringify([]))
        atualizarEventos();
        fecharModal()
        modal.style.display = "block";
        modalLimpoMsg.style.display = "block"
        document.getElementById('p-msg-limpo').style.display = "block"
        document.getElementById('p-msg-nao-limpo').style.display = "none"
    } else{
        console.log('uer else')
        fecharModal()
        modal.style.display = "block";
        modalLimpoMsg.style.display = "block"
        document.getElementById('p-msg-limpo').style.display = "none"
        document.getElementById('p-msg-nao-limpo').style.display = "block"
    }
}

function fecharModal() {
        document.getElementById('nome-evento').value = ''
        document.getElementById('descricao-evento').value = ''
        document.getElementById('confirm').value = ''
        h2Edit.style.display = "none";
        h2Novo.style.display = "block";
        modal.style.display = "none";
        formEvent.style.display = "none";
        document.getElementsByClassName('alert-sucesso')[0].style.display = 'none'
        document.getElementsByClassName('alert-modal')[0].style.display = 'none'
        document.getElementsByClassName('alert-valido')[0].style.display = 'none'
        modalConfig.style.display = "none";
        modalVisualizar.style.display = "none";
        conteudoVisualizar.style.display = "none";
        modalLimparTudo.style.display = "none";
        modalLimpoMsg.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        fecharModal()
    }
}
btnConfig.onclick = function(event) {
    event.preventDefault();
    abrirConfig();
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
    const h2eventos = document.getElementById('h2-eventos')
    const ativo = true
    if(h2Edit.style.display != 'none' || h2eventos.style.display == 'none'){
        id = edit
        eventos[id] = {'id': id,'nome': nome, 'descricao': descricao, 'ativo': ativo};
    } else{
        id = eventos.length
        eventos.push({'id': id,'nome': nome, 'descricao': descricao, 'ativo': ativo});
    }
    localStorage.setItem("eventos", JSON.stringify(eventos));
}
function salvarEvento(e = ''){
    if(e != ''){
        e.preventDefault();
    }
    let nome = document.getElementById('nome-evento').value
    let descricao = document.getElementById('descricao-evento').value
    if(verificarEvento(nome) || h2Edit.style.display != 'none'){
        atualizaStorage(nome, descricao)
        if(h2Edit.style.display == 'none'){
            document.getElementById('nome-evento').value = ''
            document.getElementById('descricao-evento').value = ''
        }
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
    const h2eventos = document.getElementById('h2-eventos')
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    document.getElementById('eventos-painel').style.display = 'none'
    for(let i = 0; i < eventos.length; i++){
        if(eventos.length > 0){
            if(eventos[i].ativo && h2eventos.style.display == 'block'){
                console.log(eventos[i].ativo + ', ' + h2eventos.style.display)
                document.getElementById('eventos-painel').style.display = 'flex'
                criarDivEvento(eventos[i].nome, eventos[i].descricao, eventos[i].id)
            }
            else if(eventos[i].ativo == false && h2eventos.style.display == 'none'){
                document.getElementById('eventos-painel').style.display = 'flex'
                criarDivhistorico(eventos[i].nome, eventos[i].descricao, eventos[i].id)
            }
        }
    }
}
function criarDivEvento(nome, descricao, id){
    document.getElementById('eventos-painel').style.display = 'flex'
    const eventosPainel = document.getElementById('eventos-painel')
    eventosPainel.innerHTML += `
                    <div id="evento-ativo">
                        <div id="nome-descricao" onclick="visualizarEvento(${id})">
                            <h4>${nome}</h4>
                            <p>${descricao}</p>
                        </div>
                        <div id="edit-del">
                            <button id="edit" onclick="editarEvento(${id})">Editar</button>
                            <button id="del" onclick="desativarEvento(${id})">Deletar</button>
                        </div>
                    </div>
                            `
}
function criarDivhistorico(nome, descricao, id){
    document.getElementById('eventos-painel').style.display = 'flex'
    const eventosPainel = document.getElementById('eventos-painel')
    eventosPainel.innerHTML += `
                    <div id="evento-ativo">
                        <div id="nome-descricao" onclick="visualizarEvento(${id})">
                            <h4>${nome}</h4>
                            <p>${descricao}</p>
                        </div>
                        <div id="edit-del">
                            <button id="res" onclick="restaurarEvento(${id})">Restaurar</button>
                        </div>
                    </div>
                            `
}
function visualizarEvento(id){
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    localStorage.setItem('edit', false)
    modalVisualizar.style.display = "block";
    modal.style.display = "block";
    formEvent.style.display = "none";
    conteudoVisualizar.style.display = "block";
    conteudoVisualizar.innerHTML = `<h3>${eventos[id].nome}</h2>
                    <p>${eventos[id].descricao}</p>`
}
function editarEvento(id){
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    fecharModal()
    modal.style.display = "block";
    h2Edit.style.display = "block";
    h2Novo.style.display = "none";
    formEvent.style.display = "flex";
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
function abrirConfig(){
    modal.style.display = "block";
    modalVisualizar.style.display = "none";
    formEvent.style.display = "none";
    conteudoVisualizar.style.display = "none";
    modalConfig.style.display = "block"
    const NomeStorag = localStorage.getItem('caracterNome')
    document.getElementById('caracteresNome').value = `${NomeStorag}`
    const DescricaoStorag = localStorage.getItem('caracterDescricao')
    document.getElementById('caracteresDescricao').value = `${DescricaoStorag}`
}
function historicoEventos(event){
    event.preventDefault();
    document.getElementById('eventos-painel').innerHTML = ''
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    document.getElementById('h2-historico').style.display = 'block';
    document.getElementById('h2-eventos').style.display = 'none';
    atualizarEventos()
}
function eventosAtivos(event){
    event.preventDefault();
    document.getElementById('eventos-painel').innerHTML = ''
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    document.getElementById('h2-historico').style.display = 'none';
    document.getElementById('h2-eventos').style.display = 'block';
    atualizarEventos()
}
function restaurarEvento(id){
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    localStorage.setItem(`edit`, id)
    atualizaStorage(eventos[id].nome, eventos[id].descricao)
    atualizarEventos();
}
function configCaracterNome(){
    const ajustCaracterNome = document.getElementById('caracteresNome').value
    let caracterNome = document.getElementById('nome-evento')
    caracterNome.maxLength = `${ajustCaracterNome}`
    localStorage.setItem('caracterNome', ajustCaracterNome)
}
function configCaracterDesc(){
    const ajustCaracterDesc = document.getElementById('caracteresDescricao').value
    let caracterDescricao = document.getElementById('descricao-evento')
    caracterDescricao.maxLength = `${ajustCaracterDesc}`
    localStorage.setItem('caracterDescricao', ajustCaracterDesc)
}
