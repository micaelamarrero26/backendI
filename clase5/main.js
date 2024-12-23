import { promises as fs } from "fs";

// const nombreArchivo = "archivo.txt"
// //sincrono

// //Crear el archivo si no existe y remplazar el contenido
// fs.writeFileSync(nombreArchivo, "hola, como va?");


// if (fs.existsSync(nombreArchivo)) {
//     console.log("El archivo existe");
//     const contenido = fs.readFileSync(nombreArchivo, 'utf-8');

//     console.log(contenido);

//     //agrega contenido al final
//     fs.appendFileSync(nombreArchivo, "\nAdios");
// } else {
//     console.log("El archivo no existe");
// }

// setTimeout(() => {
//     console.log("Proceso finalizado");
//     fs.unlinkSync(nombreArchivo);
// }, 5000);


// --------------------------------------------
// Callbacks
// --------------------------------------------


// fs.writeFile(NOMBRE_ARCHIVO, "Hola mundo desde Node.js", (error) => {
//   if (error) return console.error("Error al escribir el archivo", error);

//   console.log("Archivo creado");

//   fs.readFile(NOMBRE_ARCHIVO, "utf-8", (error, contenido) => {
//     if (error) return console.error("Error al leer el archivo", error);

//     console.log(contenido);

//     fs.appendFile(
//       NOMBRE_ARCHIVO,
//       "\nHasta luego mundo desde Node.js",
//       (error) => {
//         if (error)
//           return console.error("Error al agregar contenido al archivo", error);

//         console.log("Contenido agregado");
//         fs.readFile(NOMBRE_ARCHIVO, "utf-8", (error, contenido) => {
//           if (error) return console.error("Error al leer el archivo", error);

//           console.log(contenido);

//           fs.unlink(NOMBRE_ARCHIVO, (error) => {
//             if (error)
//               return console.error("Error al eliminar el archivo", error);

//             console.log("Archivo eliminado");
//           });
//         });
//       }
//     );
//   });


//ASINCRONO - PROMESAS

async function main () {
    try {
        const nombreArchivo = "archivo.txt"

        await fs.writeFile(nombreArchivo, "Hola mundo desde Node.js", (error) => {
            if (error) return console.error("Hugo un error al escribir el archivo: ", error);
        })
        
        let contenido = await fs.readFile(nombreArchivo, 'utf-8');

        console.log(contenido);

        await fs.appendFile(nombreArchivo, "\nHasta luego mundo desde Node.js")
   

        contenido = await fs.readFile(nombreArchivo, "utf-8");

        console.log(contenido);

        await fs.unlink(nombreArchivo, (error) => {
            if (error) return console.error("Hugo un error al eliminar el archivo: ", error);
        })

    }catch(error) {
        console.error(`Hugo un error al leer el archivo: ${error.message}`, error);
    }

}

main();