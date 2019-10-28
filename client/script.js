var socket = io();

var form = document.querySelector('form');

const name = prompt('what is your name ?');
appendMessage('You joined',3);
socket.emit('new-user',name);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var input = document.querySelector('#message');
  var text = input.value;
  appendMessage(name+ ' : '+text,1);
  socket.emit('send-chat-message', text);
  input.value = '';
});


socket.on('chat-message',data => {
    appendMessage(`${data.name} : ${data.message}`,2);
});

socket.on('user-connected',name => {
    if(name != null)
    appendMessage(`${name} is connected`,2);
});

socket.on('user-disconnected',name => {
    if(name != null)
    appendMessage(`${name} is disconnected`,2);
});


function appendMessage(message)
{
    if (!message) {
        return;
      }
    var container = document.querySelector('section');
    var newMessage = document.createElement('p');
    newMessage.innerText = message;
    container.appendChild(newMessage);
  
    if(number == 1)
    {
        newMessage.style.position = "relative";
        newMessage.style.padding = "10px 20px";
        newMessage.style.color= "white";
        newMessage.style.background= "#0b93f6";
        newMessage.style.borderRadius = "25px";
        newMessage.style.float = "right";
    }
    else if(number == 2)
    {
        newMessage.style.position="relative";
        newMessage.style.padding="10px 20px";
        newMessage.style.background="#e5e5ea";
        newMessage.style.borderRadius="25px";
        newMessage.style.color="black";
        newMessage.style.float="left";
    }

    var seperator = document.createElement('br');
    container.appendChild(seperator);

    container.scrollTop = container.scrollHeight;

}
