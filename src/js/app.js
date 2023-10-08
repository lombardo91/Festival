document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();  
});//una funcion, que arranca otras funciones

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');

        }else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const sectionScroll = (e.target.attributes.href.value);

            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({ behavior: "smooth"}); 

        });
    });
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
            mostrarImagen(i);
        }
    
        galeria.appendChild(imagen);
    }
    // Este codigo sirve para crear una galeria de imagenes, cuando las imagenes tenga su nuombre bum consecutivos
}
// accion rapida comnetario    Ctrl+}
function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML= 
    `
    <source srcset="build/img/grande/${id}.webp"    type="imagen/webp">      
    <source srcset="build/img/grande${id}.avif"    type="imagen/avif">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen vocalista">
    `;
    //Crear el Overlay con imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = function() {
        const body = document.querySelector('body');
         body.classList.remove('fijar-body')
         overlay.remove();
    }

    // Boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    //añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')
}