import { promises as fs } from "fs";

async function main () {
    try {
        const nombreArchivo = "usuario.txt"

        const usuario = [{
            nombre : "Micaela",
            edad: 28,
            profesion: "Desarrolladora"
        }, 
        {
            nombre : "Juan",
            edad: 30,
            profesion: "Desarrollador"
        },
        {
            nombre : "Luis",
            edad: 35,
            profesion: "Desarrollador"
        }]

        const usuarioJson = JSON.stringify(usuario, null, 2);

        await fs.writeFile(nombreArchivo, `${usuarioJson}`, (error) => {
            if (error) return console.error("Hugo un error al escribir el archivo: ", error);
        })
        
        let usuarioDatos = await fs.readFile(nombreArchivo, 'utf-8');

        await fs.appendFile(nombreArchivo, "\nHasta luego nuevos usuarios")
   
        usuarioDatos = await fs.readFile(nombreArchivo, "utf-8");


        // await fs.unlink(nombreArchivo, (error) => {
        //     if (error) return console.error("Hugo un error al eliminar el archivo: ", error);
        // })

    }catch(error) {
        console.error(`Hugo un error al leer el archivo: ${error.message}`, error);
    }

}

main();