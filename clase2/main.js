//Diferentes actualizaciones de ECMAScript


//ECMAScript 7 - Antes

let datoEncontrado= "";

let array = ["dato1", "dato2", "dato3"];

array.forEach(element => {
    if (element == "dato2") {
        datoEncontrado = element;
    }
})

console.log(datoEncontrado);

//ECMAScript 7 - Ahora


if (array.includes("dato2")) {
    console.log("Dato encontrado")
}


//ECMAScript 8 - Se agrego las asinctonizmos y metodos para trabajar con objetos. 

const persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 28,
    poscicion: "Desarrollador",
    direccion: {
        calle: "Av. Siempreviva",
        ciudad: "Montevideo",
        pais: "Uruguay"
    }
};

console.log(Object.entries(persona)) //Devuelve un array con las propiedades del objeto

console.log(Object.keys(persona)) //Devuelve un array con las keys del objeto

const valor = Object.values(persona) //Devuelve un array con los valores del objeto, sirve para comprar si hay algo dentro del objeto.

if (valor.includes("Perez")) {
    console.log("Dato encontrado, el apellido es Perez")
}


//ECMAScript 9 


const empleado = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 28,
    poscicion: "Desarrollador",
    hola1: "chau1"

};

const empleado2 = {
    nombre: "Micaela",
    apellido: "Marrero",
    edad: 28,
    poscicion: "Desarrollador",
    hola: "chau"

};

const resultado = {...empleado, ...empleado2}

console.log("Aca va todo junto: " + JSON.stringify(resultado, null, 2));

const {nombre, ...resto} = empleado;

console.log(nombre)
console.log(resto)


//ECMAScript 10

//trim
const texto = "        hola mundo        ";
console.log(texto.trim());
console.log(texto.trimStart());
console.log(texto.trimEnd());



//flat - Agrega un nivel de profundidad
 
const array = [1, [1,2,3,4] , [5,6,7,8] , 9, [10,11], 12]

console.log(array.flat(3)) //nivel de profundidad.

//ECMAScript 11

const esSoltero = false;
let mensaje = esSoltero || "Texto por defecto" 
console.log(mensaje)

let mensaje2 = esSoltero ?? "Texto por defecto" //SI EL VALOR ES 0 O UN FALSE, IGUAL ME DEVUELVE EL VALOR VERDADERO. SI ES FALSE O 0, JS INTERPRETA QUE ES NULL. 
console.log(mensaje2)


const persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 28,
    poscicion: "Desarrollador",
};


const newPersona = {
    nombre: "Micaela",
    apellido: undefined,
    edad: 29,
    poscicion: undefined
}


//SI es undefined, le agrega el segundo valor. 

const updatePersona = {
    nombre: newPersona.nombre ?? persona.nombre,
    apellido: newPersona.apellido ?? persona.apellido,
    edad: newPersona.edad ?? persona.edad,
    poscicion: newPersona.poscicion ?? persona.poscicion    
}

console.log(updatePersona)