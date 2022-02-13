let user = ''
let messageTo = 'Todos'
let textMsg = ''
let typemessage = 'message'
let usersGlobais = []
let listMsgs= []
let lastMsg = listMsgs[listMsgs.length -1]
// Toastify({
//     text:`mensagem enviada para ${messageTo}!`,
//     duration: 3000,
//     style: {
//         background: "linear-gradient(to right, #00b09b, #96c93d)",
//       }
// }).showToast() 

inputInfos()
function inputInfos(){
    let inputText = document.querySelector('.send-mesage-footer h1')
    if (typemessage != 'message') {
        inputText.innerHTML = `Enviando para ${messageTo} (reservadamente)`
    }else{
        inputText.innerHTML = `Enviando para ${messageTo}`
    }
    
}

//abre a sidebar
function showSideBar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('hidden')
    const complementSidebar = document.querySelector('.complement-sidebar')
    complementSidebar.classList.remove('hidden')

}
//fecha a sidebar
function closeSideBar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('hidden')
    const complementSidebar = document.querySelector('.complement-sidebar')
    complementSidebar.classList.add('hidden')
}
//escolhe o destinatário da mensagem
function choicePerson(personChoiced) {
    let persons = document.querySelectorAll('.user-sidebar')
    let hiddenCheckboxs = document.querySelectorAll('.user-sidebar .top')
    for (let index = 0; index < persons.length; index++) {
        hiddenCheckboxs[index].classList.add('hidden')
    }
    messageTo = personChoiced.querySelector('.name-user-sidebar p').innerHTML
    personChoiced.querySelector('.user-sidebar .top').classList.remove('hidden')
    inputInfos()
}
//escolhe se a msg é publica ou dm
function choiceVisibilit(visibilitChoice) {
    let closeAllPadLocks = document.querySelectorAll('.choice-visibilit .icon')
    let hiddenAllCheckBox = document.querySelectorAll('.name-user-sidebar .bottom')
    for (let index = 0; index < closeAllPadLocks.length; index++) {
        closeAllPadLocks[index].setAttribute('name', 'lock-closed-outline')
        hiddenAllCheckBox[index].classList.add('hidden')

    }
    let padlock = visibilitChoice.querySelector('.padlock')
    padlock.setAttribute('name', 'lock-open-outline')
    let checkbox = visibilitChoice.querySelector('.checkbox')
    checkbox.classList.remove('hidden')

    typemessage = visibilitChoice.attributes.name.value
    inputInfos()
}

//loga o user

function loginUser() {
    let inputValue = document.querySelector('.inputUser').value
    user = inputValue
    sendUser(user)
}
//envia o usuário que você decidiu logar
function sendUser() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/participants'
    let loginScreen = document.querySelector('.loginScreen')
    axios({
        method: 'post',
        url: url,
        data: {
            name: user,
        }
    }).then(() => {
        loginScreen.style.display ='none'
        Toastify({
            text:`Seja bem vindo ${user.toUpperCase()}!`,
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              }
        }).showToast() 
        console.log(user);
        getInfoUsers()
        setInterval(isStillLogged, 5000)
        setInterval(showMessages,3000)
        showMessages()
    }).catch((error) => {
        Toastify({
            text:`Já possui um usuário conectado com esse nome ${user},tente novamente com outro.`,
            duration: 5000,
            style: {
                background: 'red',
              }
        }).showToast() 
        
        console.log(error);
    })
}
//testa se o usuário aidna está logado
function isStillLogged() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/status'
    axios({
        method: 'post',
        url: url,
        data: {
            name: user
        }
    }).then()
        .catch((error) => {
            console.log(error);
            console.log('something is wrong');
        })
}

//recebe as informações dos usuários
function getInfoUsers() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/participants'

    axios({
        method: 'get',
        url: url,
    }).then(item => {
        //pega as informações de users e joga tentro de usersGlobais
        for (let cont = 0; cont < item.data.length; cont++) {
            usersGlobais[cont] = item.data[cont]

        }
        showUsersSideBar()
    }).catch(error => {
        console.log(error);
    })
}

//coloca os users na sidebar
function showUsersSideBar() {
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

//render messages na tela
function showMessages() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/messages'
    let containerMsgs = document.querySelector('.container-mesage')
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        if (listMsgs == ''){
            listMsgs = response.data[99]
            renderMessages(response.data,0)
            console.log(listMsgs);
        }else if (response.data[response.data.length -1] != listMsgs){
            newMessages(response.data)
        }
    })
    
function newMessages(allMsgs) {
    for (let index = 0; index < allMsgs.length; index++) {
       let wayMsg = allMsgs[index]
       if(wayMsg.from == listMsgs.from && wayMsg.to == listMsgs.to && wayMsg.text  == listMsgs.text && wayMsg.type == listMsgs.type && wayMsg.time === listMsgs.time){
           let start = index ;
           listMsgs = allMsgs[99]
            renderMessages(allMsgs,start)
           break;
       }else{

       }
   }
}

function renderMessages(response,start) {
    for (let index = start; index < response.length; index++) {
        let caminhoMsg = response[index]
        let containerMessages = document.querySelector(".container-mesage")
        if (caminhoMsg.type == 'private_message' && (caminhoMsg.from == user || caminhoMsg.to == user)) {
            containerMessages.innerHTML +=
                `<div class="mesage privatemsg">
                    <h1> <span class ='timer'> (${caminhoMsg.time})</span> <b>${caminhoMsg.from}</b> reservadamente para <b>${caminhoMsg.to} 
                    </b>: ${caminhoMsg.text}</h1>
                </div>`
        } else if (caminhoMsg.type == 'status') {
            containerMessages.innerHTML +=
                `<div class="mesage status">
                    <h1><span class ='timer'> (${caminhoMsg.time})</span> <b>${caminhoMsg.from}</b> para <b>${caminhoMsg.to} 
                    </b>: ${caminhoMsg.text}</h1>
                </div>`
        } else if (caminhoMsg.type == "message") {
            containerMessages.innerHTML +=
                `<div class="mesage msg">
                <h1><span class ='timer'> (${caminhoMsg.time})</span> <b>${caminhoMsg.from}</b> para <b>${caminhoMsg.to} 
                </b>: ${caminhoMsg.text}</h1>
            </div>`
        }
    }
    containerMsgs.scrollIntoView({ block: 'end', behavior:'smooth'})
}
}

//envia mensagem para a API
function sendMessage() {
    
    let url = 'https://mock-api.driven.com.br/api/v4/uol/messages'
    let msg = document.querySelector('.input-msg')
    axios({
        method: 'post',
        url: url,
        data: {
            from: user,
            to: messageTo,
            text: msg.value,
            type: typemessage,
        }
    }).then(response => {
        Toastify({
            text:`mensagem enviada para ${messageTo.toUpperCase()}!`,
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast()
        
        msg.value = ''
    }).catch(error =>{
        console.log(error);
    })


}


// function verifyNewMessage() {
//     let messages = [...document.querySelectorAll('.mesage')]
//     if (listMsgs == '') {
//         messages.map((item)=>{ 
//             listMsgs.push(item)
//         })
//     }else{
//         filterMsgs(messages)
//         console.log(messages);
//     }
// }

// function filterMsgs(messages) {     
//     for (let index = 0; index < messages.length; index++) {
//         if (messages[index] == lastMsg) {
//             addNewMsgs(index,messages)
//             break
//         }
        
//     }
// }

// function addNewMsgs(lastMsg, messages){
//     for (let index = lastMsg; index < messages.length; index++) {
//        console.log(messages[index]);
//     }
// }