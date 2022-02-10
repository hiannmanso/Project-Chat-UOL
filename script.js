let user = ''
let usersGlobais = []

function showSideBar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('hidden')
    const complementSidebar = document.querySelector('.complement-sidebar')
    complementSidebar.classList.remove('hidden')

}
function closeSideBar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('hidden')
    const complementSidebar = document.querySelector('.complement-sidebar')
    complementSidebar.classList.add('hidden')
}
function choicePerson(personChoiced){
    let persons = document.querySelectorAll('.user-sidebar')
    let hiddenCheckboxs= document.querySelectorAll('.user-sidebar .top')
    for (let index = 0; index < persons.length; index++) {
        hiddenCheckboxs[index].classList.add('hidden')
    }
    personChoiced.querySelector('.user-sidebar .top').classList.remove('hidden')
}

function choiceVisibilit(person){
    let closeAllPadLocks = document.querySelectorAll('.choice-visibilit .icon')
    let hiddenAllCheckBox = document.querySelectorAll('.name-user-sidebar .bottom')
    for (let index = 0; index < closeAllPadLocks.length; index++) {
        closeAllPadLocks[index].setAttribute('name','lock-closed-outline')
        hiddenAllCheckBox[index].classList.add('hidden')
        
    }
    let padlock = person.querySelector('.padlock') 
    padlock.setAttribute('name','lock-open-outline')
    let checkbox = person.querySelector('.checkbox')
    checkbox.classList.remove('hidden')
}


loginUser()
function loginUser(){
    user = prompt('seu nome pf:')
    sendUser(user)
}

sendUser()
//envia o usuário que você decidiu logar
function sendUser(){
    //verifica se tem alguem logado na API com o seu usuário, 
    //se o status for 200 nao tem se for 400 tem.
    let url = 'https://mock-api.driven.com.br/api/v4/uol/participants ' 
    axios({
        method:'post',
        url: url,
        data:{
            name :user
        }
    }).then((isLogged)=>{
        if (isLogged.status == 200) {
            getInfoUsers()
            setInterval(isStillLogged,5000)
        }
        else{
            loginUser()
        }
    }).catch((error)=>{
        console.log(error);
    })
}
//testa se o usuário aidna está logado
function isStillLogged() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/status'
    axios({
        method:'post',
        url: url,
        data:{
            name :user
        }
    }).then()
    .catch((error)=>{
        console.log(error);
        console.log('something is wrong');
    })
}

//recebe as informações dos usuários
function getInfoUsers() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/participants ' 

    axios({
        method:'get',
        url:url,
    }).then(item=>{
        //pega as informações de users e joga tentro de usersGlobais
        for (let cont = 0; cont < item.data.length; cont++) {
            usersGlobais[cont] =item.data[cont] 
           
        }
        showUsersSideBar()
    }).catch(error=>{
        console.log(error);
    })
}

//coloca os users na sidebar
function showUsersSideBar(){
    for (let index = 0; index < usersGlobais.length; index++) {
        let usersSideBar = document.querySelector('.users-sidebar')
        usersSideBar.innerHTML += 
        `<div class="user-sidebar" onclick='choicePerson(this)'>
            <ion-icon class="icon all" name="people-sharp"></ion-icon>
            <div class="name-user-sidebar">
                <p >${usersGlobais[index].name}</p>
                <ion-icon class="checkbox hidden top" name="checkmark-outline"></ion-icon>
            </div>
        </div>`
        
    }
 }


 showMessages() 
function showMessages() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/messages'
    axios({
        method:'get',
        url: url
    }).then((itens)=>{
        console.log(itens);
        for (let index = 0; index < itens.length; index++) {
            if (itens.data.type[index] =='status') {
                console.log('mensagem de status');
            }if (itens.data.type =='message') {
                console.log('mensagem');
            }if (itens.data.type =='private_message') {
                console.log('mensagem privada');
            }
            
        }
    })
}