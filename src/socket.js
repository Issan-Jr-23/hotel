import {socket} from 'socket.io';

 function initSocket(server) {
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('Cliente conectado');

   // Enviar la lista de usuarios a los clientes cuando se conectan
   socket.emit('users', users);

   // Manejar la edición y eliminación de usuarios
   socket.on('editUser', ({ userId, editedName }) => {
     // Lógica para editar el usuario en la base de datos
     // ...
 
     // Después de editar el usuario, emite la lista actualizada a todos los clientes
     io.emit('users', users);
   });
 
   socket.on('deleteUser', (userId) => {
     // Lógica para eliminar el usuario de la base de datos
     // ...
 
     // Después de eliminar el usuario, emite la lista actualizada a todos los clientes
     io.emit('users', users);
   });
 
   socket.on('disconnect', () => {
     console.log('Cliente WebSocket desconectado');
   });
    });
}

export default initSocket
