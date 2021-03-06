let user = ''
let messageTo = 'Todos'
let textMsg = ''
let typemessage = 'message'
let usersGlobais = []
let listMsgs = ''
let lastMsg = listMsgs[listMsgs.length - 1]
let input = document.getElementById("inputText");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("inputSend").click();
    }
});

inputInfos()
function inputInfos() {
    let inputText = document.querySelector('.send-mesage-footer h1')
    if (typemessage != 'message') {
        inputText.innerHTML = `Enviando para ${messageTo} (reservadamente)`
    } else {
        inputText.innerHTML = `Enviando para ${messageTo}`
    }

}
function showSideBar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.remove('hidden')
    const complementSidebar = document.querySelector('.complement-sidebar')
    complementSidebar.classList.remove('hidden')

}
function closeSideBar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.add('hidden')
    const complementSidebar = document.querySelector('.complement-sidebar')
    complementSidebar.classList.add('hidden')
}
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
function loginUser() {
    let inputValue = document.querySelector('.inputUser')
    
    user = inputValue.value
    if(user != ''){
        let loading = document.querySelector('.loading')
        let hiddeButton = document.querySelector('.buttonEnter')
        hiddeButton.classList.add('hidden')
        inputValue.classList.add('hidden')
        loading.classList.remove('hidden')
        sendUser(user)
    }
}
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
        loginScreen.style.display = 'none'
        Toastify({
            text: `Seja bem vindo ${user.toUpperCase()}!`,
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast()
        getInfoUsers()
        setInterval(isStillLogged, 5000)
        setInterval(showMessages, 3000)
        showMessages()
    }).catch(() => {
        let inputValue = document.querySelector('.inputUser')
        let loading = document.querySelector('.loading')
        inputValue.classList.remove('hidden')
        loading.classList.add('hidden')
        Toastify({

            text: `J?? possui um usu??rio conectado com esse nome ${user},tente novamente com outro.`,
            duration: 5000,
            style: {
                background: 'red',
            }
        }).showToast()
    })
}
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

        })
}
function getInfoUsers() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/participants'

    axios({
        method: 'get',
        url: url,
    }).then(item => {
        //pega as informa????es de users e joga tentro de usersGlobais
        for (let cont = 0; cont < item.data.length; cont++) {
            usersGlobais[cont] = item.data[cont]

        }
        showUsersSideBar()
    }).catch(error => {
        console.log(error);
    })
}
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
function showMessages() {
    let url = 'https://mock-api.driven.com.br/api/v4/uol/messages'
    let containerMsgs = document.querySelector('.container-mesage')
    axios({
        method: 'get',
        url: url,
    }).then((response) => {
        let itemInMsg =response.data
        let length =itemInMsg.length - 1
        if (listMsgs == '') {
            listMsgs = response.data[99]
            renderMessages(response.data, 0)
        //response.data[response.data.length - 1] !== listMsgs
        } else if (itemInMsg[length].from !== listMsgs.from || itemInMsg[length].to !== listMsgs.to || itemInMsg[length].type !== listMsgs.type || itemInMsg[length].text !== listMsgs.text || itemInMsg[length].time !== listMsgs.time) {
            console.log(itemInMsg[length].from);
            console.log(listMsgs.from);
            console.log('');
            newMessages(itemInMsg)
        }else{
            console.log(itemInMsg[length].from+'      '+listMsgs.from);
        }
    })

    function newMessages(allMsgs) {
        for (let index = 0; index < allMsgs.length; index++) {
            let wayMsg = allMsgs[index]
            if (wayMsg.from == listMsgs.from && wayMsg.to == listMsgs.to && wayMsg.text == listMsgs.text && wayMsg.type == listMsgs.type && wayMsg.time === listMsgs.time) {
                let start = index;
                listMsgs = allMsgs[99]
                renderMessages(allMsgs, start)
                break;
            } else {

            }
        }
    }

    function renderMessages(response, start) {
        for (let index = start; index < response.length; index++) {
            let caminhoMsg = response[index]
            let containerMessages = document.querySelector(".container-mesage")
            if (caminhoMsg.type == 'private_message' && (caminhoMsg.from == user || caminhoMsg.to == user)) {
                containerMessages.innerHTML +=
                    `<div class="mesage privatemsg" data-identifier="message">
                    <h1> <span class ='timer'> (${caminhoMsg.time})</span> <b>${caminhoMsg.from}</b> reservadamente para <b>${caminhoMsg.to} 
                    </b>: ${caminhoMsg.text}</h1>
                </div>`
            } else if (caminhoMsg.type == 'status') {
                containerMessages.innerHTML +=
                    `<div class="mesage status" data-identifier="message">
                    <h1><span class ='timer'> (${caminhoMsg.time})</span> <b>${caminhoMsg.from}</b> para <b>${caminhoMsg.to} 
                    </b>: ${caminhoMsg.text}</h1>
                </div>`
            } else if (caminhoMsg.type == "message") {
                containerMessages.innerHTML +=
                    `<div class="mesage msg" data-identifier="message">
                <h1><span class ='timer'> (${caminhoMsg.time})</span> <b>${caminhoMsg.from}</b> para <b>${caminhoMsg.to} 
                </b>: ${caminhoMsg.text}</h1>
            </div>`
            }
        }
        containerMsgs.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
}
function sendMessage() {

    let url = 'https://mock-api.driven.com.br/api/v4/uol/messages'
    let msg = document.querySelector('.input-msg')
    if(msg.value != ''){
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
                text: `mensagem enviada para ${messageTo.toUpperCase()}!`,
                duration: 3000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast()
            showMessages
    
            msg.value = ''
        }).catch(() => {
            window.location.reload()
        })
    }


}