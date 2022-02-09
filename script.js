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


let user = ''
function loginUser(){
    user = prompt('seu nome pf:')
    return user
}
loginUser()

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
    }).then((yourUserName)=>{
        console.log(yourUserName);
        console.log(yourUserName.status);
    }).catch(()=>{
        console.log('something is wrong');
    })
}


setInterval(isStillLogged,5000)
function isStillLogged() {
    let url = 'ttps://mock-api.driven.com.br/api/v4/uol/status'
    axios({
        method:'post',
        url: url,
        data:{
            name :user
        }
    }).then((yourUserName)=>{
        console.log(yourUserName);
        console.log(yourUserName.status);
        
    }).catch(()=>{
        console.log(user);
        console.log('something is wrong');
    })
}