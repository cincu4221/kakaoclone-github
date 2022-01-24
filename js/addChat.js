

const chatForm = document.getElementById("chat-form");
const chatInput = chatForm.querySelector("input");
const chatList = document.getElementById("chat-list");

const CHATS_KEY = "chats";

let chats = [];


function saveChats() {
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
}

function deleteChat(event) {
    const delChat = event.target.parentElement;
    delChat.remove();
    chats = chats.filter(chat => chat.id !== parseInt(delChat.id));
    saveChats();
}

function createChat(newChat) {
    const newChatTime = document.createElement("span");
    newChatTime.setAttribute("id", "chat-time-span")
    newChatTime.setAttribute("class", "message__time");
    getClock(newChatTime);
    const newChatBox = document.createElement("li");
    newChatBox.id = newChat.id;
    const newSpan = document.createElement("span");
    newSpan.innerText = newChat.text;
    newSpan.setAttribute("class", "message__bubble")
    // 버튼은 일단 미구현
    // const newButton = document.createElement("button");
    // newButton.innerText = "❌";
    // newButton.addEventListener("click", deleteChat);
    newChatBox.appendChild(newChatTime);
    newChatBox.appendChild(newSpan);
    // newChatBox.appendChild(newButton);
    chatList.appendChild(newChatBox);
}

function getClock(span) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    span.innerText = `${hours}:${minutes}`;
}


function addChatBox(event) {
    event.preventDefault();
    const newChat = chatInput.value;
    if(newChat === "" || newChat === null){
        alert("메시지를 입력해주세요.");
    } else {
        chatInput.value = "";
        const newChatObj = {
            text : newChat,
            id : Date.now(),
        }
        chats.push(newChatObj);
        createChat(newChatObj);
        saveChats();
    }
}

chatForm.addEventListener("submit", addChatBox);

const savedChats = localStorage.getItem(CHATS_KEY);

if(savedChats !== null) {
    const parsedChats = JSON.parse(savedChats);
    chats = parsedChats;
    parsedChats.forEach(createChat);
}


