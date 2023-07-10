var datosGuardados = JSON.parse(localStorage.getItem('datosSocios')) || []; // Obtener los datos almacenados en el localStorage

// Función para mostrar el formulario de edición con los datos del afiliado seleccionado
function mostrarFormularioEdicion(indice) {
  var datos = datosGuardados[indice];
  var formulario = document.getElementById('formularioEdicion');
  formulario.style.display = 'block'; // Mostrar el formulario
  // Llenar el formulario con los datos del afiliado seleccionado
  formulario.elements['nombre'].value = datos.nombre;
  formulario.elements['apellido'].value = datos.apellido;
  formulario.elements['telefono'].value = datos.telefono;
  formulario.elements['email'].value = datos.email;
  formulario.elements['categoria'].value = datos.categoria;
  formulario.elements['mensualidad'].value = datos.mensualidad || '';
  formulario.dataset.indice = indice; // Guardar el índice del afiliado en el formulario

  var accesoSwitch = document.getElementById('accesoSwitch');
  accesoSwitch.checked = datosGuardados[indice].permisoAcceso;
}

// Función para actualizar los datos del afiliado en la tabla y en el localStorage
function editarDatos() {
  var formulario = document.getElementById('formularioEdicion');
  var indice = parseInt(formulario.dataset.indice);

  // Obtener los valores del formulario
  var nombre = formulario.elements['nombre'].value;
  var apellido = formulario.elements['apellido'].value;
  var telefono = formulario.elements['telefono'].value;
  var email = formulario.elements['email'].value;
  var categoria = formulario.elements['categoria'].value;
  var mensualidad = formulario.elements['mensualidad'].value;

  // Actualizar los datos en el array
  datosGuardados[indice].nombre = nombre;
  datosGuardados[indice].apellido = apellido;
  datosGuardados[indice].telefono = telefono;
  datosGuardados[indice].email = email;
  datosGuardados[indice].categoria = categoria;
  datosGuardados[indice].mensualidad = mensualidad;

  // Actualizar los datos en el localStorage
  localStorage.setItem('datosSocios', JSON.stringify(datosGuardados));

  // Actualizar la fila correspondiente en la tabla
  var fila = document.getElementById('fila-' + indice);
  fila.cells[0].textContent = nombre;
  fila.cells[1].textContent = apellido;
  fila.cells[3].textContent = categoria;
  fila.cells[4].textContent = mensualidad || '';

  formulario.style.display = 'none'; // Ocultar el formulario de edición
}

// Recorrer los datos y mostrarlos en la tabla
for (var i = 0; i < datosGuardados.length; i++) {
  var datos = datosGuardados[i];
  var fila = document.createElement('tr');
  fila.id = 'fila-' + i;

  var celdaNombre = document.createElement('td');
  celdaNombre.textContent = datos.nombre;
  fila.appendChild(celdaNombre);

  var celdaApellido = document.createElement('td');
  celdaApellido.textContent = datos.apellido;
  fila.appendChild(celdaApellido);

  var celdaPermitirAcceso = document.createElement('td');
  var interruptor = document.createElement('input');
  interruptor.type = 'checkbox';
  interruptor.checked = datos.permisoAcceso;
  interruptor.addEventListener('change', function(indice) {
    return function() {
      cambiarPermisoAcceso(indice, this.checked);
    };
  }(i));
  celdaPermitirAcceso.appendChild(interruptor);
  fila.appendChild(celdaPermitirAcceso);

  var celdaCategoria = document.createElement('td');
  celdaCategoria.textContent = datos.categoria;
  fila.appendChild(celdaCategoria);

  var celdaMensualidad = document.createElement('td');
  celdaMensualidad.textContent = datos.mensualidad || '';
  fila.appendChild(celdaMensualidad);

  var celdaAcciones = document.createElement('td');
  var botonEditar = document.createElement('button');
  botonEditar.textContent = 'Editar';
  botonEditar.addEventListener('click', function(indice) {
    return function() {
      mostrarFormularioEdicion(indice);
    };
  }(i));
  celdaAcciones.appendChild(botonEditar);
  fila.appendChild(celdaAcciones);

  document.querySelector('tbody').appendChild(fila);
}
// Función para cambiar el permiso de acceso
function cambiarPermisoAcceso(indice, valor) {
  datosGuardados[indice].permisoAcceso = valor;
  localStorage.setItem('datosSocios', JSON.stringify(datosGuardados));
}
function descargarDatosPDF() {
  // Crear un nuevo documento PDF
  var doc = new jsPDF.default();

  // Obtener los datos almacenados en el localStorage
  var datosGuardados = JSON.parse(localStorage.getItem('datosSocios')) || [];

  // Configurar las opciones de estilo del texto
  var options = {
    align: 'left',
    fontSize: 12,
    lineHeight: 15
  };

  // Generar el contenido del PDF con los datos del array
  var contenido = '';
  for (var i = 0; i < datosGuardados.length; i++) {
    var datos = datosGuardados[i];
    contenido += 'Nombre: ' + datos.nombre + '\n';
    contenido += 'Apellido: ' + datos.apellido + '\n';
    contenido += 'Teléfono: ' + datos.telefono + '\n';
    contenido += 'Permiso de acceso: ' + datos.permisoAcceso + '\n';
    contenido += 'Categoría: ' + datos.categoria + '\n';
    contenido += 'Mensualidad: ' + (datos.mensualidad || '') + '\n';
    contenido += '\n';
  }

  // Agregar el contenido al documento PDF
  doc.text(contenido, options.align, options.fontSize, options);

  // Descargar el archivo PDF
  doc.save('datos.pdf');
}
