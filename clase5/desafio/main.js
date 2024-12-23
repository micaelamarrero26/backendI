import fs from "fs";

const fechaActual = `Fecha Actual: ${new Date().toLocaleString()}`;
const archivo = "fecha.txt"

fs.writeFile(archivo, fechaActual, (error) => {
    if (error) return console.error("Error al escribir el archivo", error);

    fs.readFile(archivo, "utf-8", (error, fechaActual) => {
        if (error) return console.error("Error al leer el archivo", error);
        console.log(fechaActual);
    });
});
