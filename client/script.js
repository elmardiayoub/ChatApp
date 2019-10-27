var socket = io();

var form = document.querySelector('form');

const name = prompt('what is your name ?');
appendMessage('You joined');
socket.emit('new-user',name);

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var input = document.querySelector('#message');
  var text = input.value;
  appendMessage('You : '+text);
  socket.emit('send-chat-message', text);
  input.value = '';
});


socket.on('chat-message',data => {
    appendMessage(`${data.name} : ${data.message}`);
});

socket.on('user-connected',name => {
    if(name != null)
    appendMessage(`${name} is connected`);
});

socket.on('user-disconnected',name => {
    if(name != null)
    appendMessage(`${name} is disconnected`);
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


    var seperator = document.createElement('br');
    container.appendChild(seperator);

    container.scrollTop = container.scrollHeight;

}