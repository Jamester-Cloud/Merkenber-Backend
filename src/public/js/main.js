const socket = io();


Notification.requestPermission().then(function(result) {
  console.log(result);
});

function notifyMe(message='hi There!') {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

socket.on('IncomingMessage', data=>{
	notifyMe("Nuevo mensaje Recibido");


	const messagesList = document.getElementById('messages');
	console.log("New message");

	const li = document.createElement('li');
	li.classList='list-group-item list-group-item-action list-group-item-warning';
	const body = document.createElement('p');
	body.appendChild(document.createTextNode(data.body));

	data.From.replace(/[0-9]/g, 'x');
	const froms = document.createElement('span');
	froms.appendChild(document.createTextNode(data.From));

	const _id = document.createElement('span');
	_id.appendChild(document.createTextNode(data._id));

	const _createdAt = document.createElement('span');
	_createdAt.appendChild(document.createTextNode(timeago.format(data.createdAt)));

	li.appendChild(body);
	li.appendChild(_id)
	li.appendChild(froms);
	li.appendChild(_createdAt);
	messagesList.prepend(li);



})

