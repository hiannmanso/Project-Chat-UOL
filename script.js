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
function choicePerson(){

}

function choiceVisibilit(person){
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
        `<div class="user-sidebar">
            <ion-icon class="icon all" name="people-sharp"></ion-icon>
            <div class="name-user-sidebar">
                <p >${usersGlobais[index].name}</p>
                <ion-icon class="checkbox hidden " name="checkmark-outline"></ion-icon>
            </div>
        </div>`
        
    }
 }
