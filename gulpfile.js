const {src, dest, watch} = require('gulp');
//requiere: extraer toda la funcionalidad de gulp 
//gulp: dependencia en el package.json 

// CSS------
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes -----
const webp = require('gulp-webp');


/*
function tarea(done){
    console.log('Hola Mundo');

    done();  //colkack - parafinalizar tarea / quita error en consola al ejecutar npx gulp NombreDeLaFuncion
}

exports.acaPongo = tarea;


//Si llamo la funcion desde aca es npx gulp NombreFuncion
//Si llamo desde package.json es npm run "nombreDelSrcipt"  
// ---> del otro lado del script : gulp NombreFuncion
*/
function css(done) {
    //identificar el archivo de SASS
    src('src/scss/**/*.scss')
        .pipe( plumber()) // evita que se detenga la ejecucion por errores
        //Compilarlo   //El Sass que traigo del package.json
        .pipe(sass() )
        //Almacenar el archivo
        .pipe(dest("build/css"))


    done(); //Callback avisa a Gulp cuando llegamos al final
}

function versionWebp(done) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg, png}')
        .pipe( webp(opciones))
        .pipe( dest('build/img'))
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)
    // watch, deja siempre escuchando el archivo para detectar si sufre cambios

    done();
}


exports.css = css;
exports.dev = dev;
exports.versionWebp = versionWebp;

//DEsde aca llamamos a las funciones con : npx gulp nombreDeLaFuncion
// Si lo llamo desde el package.json utilizo : npm run nombreDeLaFuncion
