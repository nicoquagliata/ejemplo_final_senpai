function recon() {
  let formData = new FormData();

  let fileField = document.querySelector('#inputImage');
  let divRespuesta = document.querySelector('#respuestaWatsonVisualRecognition');

  formData.append('imagen', fileField.files[0]);

  fetch('/api/v1/classify/image', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(async response => {
      console.log('Respuesta reconocer():', response);
      mostrarImagen(fileField);
      let persona = response.images[0].classifiers[0].classes[0].class;
      let datos = await buscarDiscovery(persona);

      divRespuesta.innerHTML =`
      <h2>Datos de ${persona}</h2>
      <p>${datos.text}</p>
      `
    })
    .catch(error => console.error('Error:', error));
}

function mostrarImagen(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    let imagenPreview = document.querySelector('#imagenPreview');
    reader.onload = function(e) {
      imagenPreview.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function buscarDiscovery(textoBusqueda){
  // let input = document.querySelector('#inputSearchDiscovery');
  // let texto = input.value;

  console.log(`Texto busqueda: ${textoBusqueda}`);

  return new Promise ((resolve, reject) => {
    fetch('/api/v1/search/discovery', {
        method: 'POST',
        body: JSON.stringify ({text: textoBusqueda}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        resolve(response.results[0]);

      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      })

  });
}





//respuesta funcion recon vieja

// console.log('Success:', response)
// mostrarImagen(fileField);
// divRespuesta.innerHTML = JSON.stringify(response, null, 2);
//
// let respuestaClasesDefault = "";
// let respuestaClasesCustom = "";
//
// response.images[0].classifiers[0].classes.forEach(
//   clase => {
//     respuestaClasesDefault += `
//              <li> Clase: ${clase.score} - ${clase.class}</li>
//          `
//   });
//
// response.images[0].classifiers[1].classes.forEach(clase => {
//   console.log(clase);
//   buscarDiscovery(clase.class);
//   respuestaClasesCustom += `
//           <li>Clase: ${clase.class} - Score: ${clase.score}</li>
//           `
// });
//
//
//
// divRespuesta.innerHTML = `
//       <h2>Resultados</h2>
//       <br/>
//       <br/>
//       <h3>Modelo Default: </h3>
//       <ul>
//           ${respuestaClasesDefault}
//       </ul>
//       <br/>
//       <h3>Modelo Custom</h3>
//       <ul>
//       ${respuestaClasesCustom}
//       </ul>
//       `;
