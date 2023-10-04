document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();  
});//una funcion, que arranca otras funciones

function iniciarApp(){
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++) {

        const imagen = document.createElement('picture');
        imagen.innerHTML= 
        `
        <source srcset="build/img/thumb/${i}.webp"    type="imagen/webp">      
        <source srcset="build/img/thum${i}.avif"    type="imagen/avif">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen vocalista">
        `;

        imagen.onclick = function() {
            mostrarImagen();
        }
    
        galeria.appendChild(imagen);
    }
    // Este codigo sirve para crear una galeria de imagenes, cuando las imagenes tenga su nuombre bum consecutivos
}
// accion rapida comnetario    Ctrl+}
function mostrarImagen(i) {
    
}