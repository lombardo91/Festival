const {src, dest, watch, parallel} = require('gulp');
//requiere: extraer toda la funcionalidad de gulp 
//gulp: dependencia en el package.json 

// CSS------
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes -----
const cache = requiere('gulp-cache'); // npm i --save-dev gulp-cache
const imagemin = requiere('gulp-imagemin'); // npm i --save-dev gulp-imagemin@7.1.0
const webp = require('gulp-webp');

clearImmediate
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

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }

    src('src/scss/img/**/*.{png,jpg}')
    .pipe( cache ( imagenes(opciones)))
    .pipe(dest("build/img"))

    done();
}

function versionWebp(done) {
    // Webp: toma opciones, vajamos la calidad de 100 a 50
    const opciones = {
        quality: 50   
    };

    src('src/scss/img/**/*.{png,jpg}') // {.....} ==> Busca, los formatos que le indique dentro de esas {}
        .pipe( webp(opciones))
        .pipe( dest("build/img"))

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)
    // watch, deja siempre escuchando el archivo para detectar si sufre cambios

    done();
}


exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes, versionWebp, dev);  // parallel: ejecuta funciones en simultaneo



//DEsde aca llamamos a las funciones con : npx gulp nombreDeLaFuncion
// Si lo llamo desde el package.json utilizo : npm run nombreDeLaFuncion
