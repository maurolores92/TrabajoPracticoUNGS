function guardarDatos() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;
    
    var datos = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      email: email,
    };
    

    var datosGuardados = JSON.parse(localStorage.getItem('datosSocios')) || [];     // Obtener los datos almacenados previamente (si los hay)
    datosGuardados.push(datos);   // Agregar los nuevos datos al array
    localStorage.setItem('datosSocios', JSON.stringify(datosGuardados)); // Guardar los datos actualizados en el localStorage
    
    alert('Datos guardados correctamente');
    
    // Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
}

// Obtener los datos almacenados en el localStorage
var datosGuardados = JSON.parse(localStorage.getItem('datosSocios')) || [];
  
// Recorrer los datos y mostrarlos en la tabla
for (var i = 0; i < datosGuardados.length; i++) {
  var datos = datosGuardados[i];
  var fila = document.createElement('tr');

  var celdaNombre = document.createElement('td');
  celdaNombre.textContent = datos.nombre;
  fila.appendChild(celdaNombre);

  var celdaApellido = document.createElement('td');
  celdaApellido.textContent = datos.apellido;
  fila.appendChild(celdaApellido);

  var celdaTelefono = document.createElement('td');
  celdaTelefono.textContent = datos.telefono;
  fila.appendChild(celdaTelefono);

  var celdaEmail = document.createElement('td');
  celdaEmail.textContent = datos.email;
  fila.appendChild(celdaEmail);

  var celdaAcceso = document.createElement('td');
  celdaAcceso.textContent = datos.permisoAcceso ? 'Acceso permitido' : 'Acceso denegado';
  fila.appendChild(celdaAcceso);

  var celdaCategoria = document.createElement('td');
  celdaCategoria.textContent = datos.categoria;
  fila.appendChild(celdaCategoria);

  var celdaMensualidad = document.createElement('td');
  celdaMensualidad.textContent = datos.mensualidad || '';
  fila.appendChild(celdaMensualidad);

  document.querySelector('tbody').appendChild(fila);
}
