

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
        .then(response => {
            console.log('Success:', response)
            mostrarImagen(fileField);
            divRespuesta.innerHTML = JSON.stringify(response, null, 2);
                        
            let respuestaClasesDefault = "";
            let respuestaClasesCustom = "";



            response.images[0].classifiers[0].classes.forEach(
                clase => {
                    respuestaClasesDefault += `
                   <li> Clase: ${clase.score} - ${clase.class}</li>
               `
                });

            response.images[0].classifiers[1].classes.forEach(clase => {
                console.log(clase);
                respuestaClasesCustom += `
                <li>Clase: ${clase.class} - Score: ${clase.score}</li>
                `
            });



            divRespuesta.innerHTML = `
            <h2>Resultados</h2>
            <br/>
            <br/>
            <h3>Modelo Default: </h3>
            <ul>
                ${respuestaClasesDefault}
            </ul>
            <br/>
            <h3>Modelo Custom</h3>
            <ul>
            ${respuestaClasesCustom}
            </ul>
            `;
            

        })
        .catch(error => console.error('Error:', error));
}

function mostrarImagen(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        let imagenPreview = document.querySelector('#imagenPreview');
        reader.onload = function (e) {
            imagenPreview.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}