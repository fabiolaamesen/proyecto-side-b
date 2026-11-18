/* Inicializando variables */
const nombreActual = "fabs"; /* Nombre y usuario de la persona que publica */
const usuarioActual = "@vm.fabss";
const clavePublicaciones = "sideb_publicaciones"; /* Como se guardan las publicaciones en el navegador */
const publicacionesIniciales = [
{
    id: 1,
    nombre: "matt",
    usuario: "@halleymatt",
    texto: "HIT ME HARD AND SOFT albúm sin skips. 10/10. Lo mejor que ha creado Billie Eilish. period.",
    categoria: "Reseña de álbum",
    likes: 70,
    numComentarios: 6,
    comentarios: []
},
{
    id: 2,
    nombre: "Fabi N ⚜",
    usuario: "@fnaranjo_26",
    texto: "Body and Blood de Ghost me da muchas vibras góticas y el ritmo es tranquilo, en mi opinión, me hace sentir como Morticia Adams",
    categoria: "Reseña de canción",
    likes: 46,
    numComentarios: 15,
    comentarios: []
},
{
    id: 3,
    nombre: "mari",
    usuario: "@m.moritaa_",
    texto: "el nuevo albúm de Olivia Rodrigo es aoty sin duda. Mi favorita es the cure, amo las vibras que transmite y como Olivia logra hacerte sentir tanto con una canción",
    categoria: "Recomendación",
    likes: 100,
    numComentarios: 67,
    comentarios: []
},
{
    id: 4,
    nombre: "gabriel🖤",
    usuario: "@gab_.chava",
    texto: "EL ÚLTIMO TOUR DEL MUNDO de Bad Bunny es de mis favoritos porque, más allá de la música, resuena directo con mi forma de pensar, de ver las cosas y de transformar los momentos díficiles y experiencias en algo valioso. Me demuestra que no hay límites para seguir creando",
    categoria: "Reseña de álbum",
    likes: 69,
    numComentarios: 38,
    comentarios: []
},
{
    id: 5,
    nombre: "Fabi",
    usuario: "@fabssmarin",
    texto: "'Paraiso' de Mora suena como estar en el paraiso",
    categoria: "Reseña de álbum",
    likes: 103,
    numComentarios: 90,
    comentarios: []
},
{
    id: 6,
    nombre: "Ax",
    usuario: "@axl._047",
    texto: "Nadie me va a sacar de la cabeza que Frank Sinatra es un rom+antico (se inspiró de mí)",
    categoria: "Discusión",
    likes: 20,
    numComentarios: 106,
    comentarios: []
},
{
    id: 7,
    nombre: "mel",
    usuario: "@16.va_l",
    texto: "El nuevo álbum de Rawayana es de los mejores que ha hecho, llevenme al concierto de él",
    categoria: "Reseña de álbum",
    likes: 500,
    numComentarios: 98,
    comentarios: []    
},
{
    id: 8,
    nombre: "alvarito diaz",
    usuario: "@alvar0dayzz",
    texto: "escuchen omakase #aoty",
    categoria: "Reseña de álbum",
    likes: 15000,
    numComentarios: 506,
    comentarios: []
}
];
//Guarda lista de publicaciones
function guardarPublicaciones(lista){
    localStorage.setItem(clavePublicaciones, JSON.stringify(lista));
}
//Lee las publicaciones guardadas, las lee y las devuelve
function leerPublicaciones(){
    const guardado = localStorage.getItem(clavePublicaciones);

    if (guardado === null){
        guardarPublicaciones(publicacionesIniciales);
        return publicacionesIniciales;
    }
    return JSON.parse(guardado);
}
//Dibujar publicaciones
const iconoCorazon = '<svg class="corazon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
const iconoComentario = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle preview-icon"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>';

function escapar(texto){
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}
//HTML  de una publicacion guardada
function crearComentario(comentario){
    return `<div class="comentario"><strong>${escapar(comentario.usuario)}</strong><span>${escapar(comentario.texto)}</span></div>`;
}
//HTML completo de una publicacion
function crearPublicacion(publicacion){
    const comentarios = publicacion.comentarios.map(crearComentario).join("");
    return `
    <article class="publicacion" data-id="${publicacion.id}">
        <h3>
            ${escapar(publicacion.nombre)} <span class="username">${escapar(publicacion.usuario)}</span>
        </h3>
        <p>
            ${escapar(publicacion.texto)}
        </p>
        <span class="categoria">${escapar(publicacion.categoria)}</span>
        <div class="interacciones">
            <span class="likes">
                <button class="boton-like" type="button" aria-label="Me gusta">
                    ${iconoCorazon}
                </button>
                <span class="contador">${publicacion.likes}</span>
            </span>
            <span class="comentarios">
                <button class="boton-comentar" type="button" aria-label="Comentar">
                    ${iconoComentario}
                </button>
                <span class="contador-comentarios">${publicacion.numComentarios}</span>
            </span>
        </div>
        <div class="seccion-comentarios" hidden>
            <div class="lista-comentarios">${comentarios}</div>
            <form class="form-comentario">
                <input type="text" placeholder="Escribe un comentario..." required>
                <button type="submit">Comentar</button>
            </form>
        </div>
    </article>`;
}
//Lista de publicaciones en contenedor
function mostrarLista(idContenedor, lista){
    const contenedor = document.getElementById(idContenedor);
    if (contenedor === null)
        return;
    if (lista.length === 0){
        contenedor.innerHTML = "<p>Todavía no hay publicaciones.</p>";
        return;
    }
    //Convierte las publicaciones en HTML
    contenedor.innerHTML = lista.map(crearPublicacion).join("<hr>");
}
//Lee publicaciones y las reparte
const todas = leerPublicaciones();

//Muestra solo las 4 mas recientes
mostrarLista("lista-inicio", todas.slice(0, 4));

//Muestra todas las reseñas
mostrarLista("lista-resenas", todas);

//Muestra solo las reseñas del perfil
mostrarLista("lista-perfil", todas.filter(function(publicacion){
    return publicacion.usuario === usuarioActual;
}));
//Crear una publicacion
//Busca el form para crear una publicacion
const formPublicacion = document.getElementById("form-publicacion");
//Se salta la creacion de una publicacion si se ubica en otra pagina
if (formPublicacion !== null){
    formPublicacion.addEventListener("submit", function(evento){

        console.log("Submit detectado");
        //Evita que el form recargue la pagina
        evento.preventDefault();

        //Lee lo que el usuario escribe y la categoria que elige
        const texto = document.getElementById("contenido").value.trim();
        const categoria = document.getElementById("categoria").value;

        //Si el usuario no escribe nada
        if (texto === "")
            return;

        //Arma la nueva publicacion
        const nueva = {
            id: Date.now(),
            nombre: nombreActual,
            usuario: usuarioActual,
            texto: texto,
            categoria: categoria,
            likes: 0,
            numComentarios: 0,
            comentarios: []
        };

        //Pone la publicacion de primera, por ser la mas reciente
        const lista = leerPublicaciones();
        lista.unshift(nueva);
        guardarPublicaciones(lista);

        //Lleva al usuario a reseñas para que vea su publicacion
        window.location.href = "resenas.html";
    })
}
//Likes
const botonesLike = document.querySelectorAll(".boton-like");
//Le dice al boton de like que hacer cuando se le da click}
botonesLike.forEach(function(boton){
    boton.addEventListener("click", function(){
        //Cambia el contador de likes
        const contador = boton.closest(".likes").querySelector(".contador");
        let cantidad = Number(contador.textContent);

        //Funcion para cuando se le da like o se le quita el like a una publicacion
        const activo = boton.classList.toggle("activo");

        if (activo){
            cantidad++;
        } else {
            cantidad--;
        }
        //Muestra la cantidad de likes
        contador.textContent = cantidad;
    });
});
//Abrir y cerrar comentarios
const botonesComentar = document.querySelectorAll(".boton-comentar");
botonesComentar.forEach(function(boton){
    boton.addEventListener("click", function(){
    const publicacion = boton.closest(".publicacion");
    const seccion = publicacion.querySelector(".seccion-comentarios");

    seccion.hidden = !seccion.hidden;

    if (!seccion.hidden){
        seccion.querySelector("input").focus();
    }
    });
});
//Enviar un comentario
const formularios = document.querySelectorAll(".form-comentario");
formularios.forEach(function(form){
    form.addEventListener("submit", function(evento){
        evento.preventDefault();
        const input = form.querySelector("input");
        const texto = input.value.trim();

        if (texto === "")
            return;

        const publicacion = form.closest(".publicacion");
        const lista = publicacion.querySelector(".lista-comentarios");

        const comentario = document.createElement("div");
        comentario.classList.add("comentario");

        const autor = document.createElement("strong");
        autor.textContent = usuarioActual;

        const contenido = document.createElement("span");
        contenido.textContent = texto;

        comentario.appendChild(autor);
        comentario.appendChild(contenido);
        lista.appendChild(comentario);

        input.value = "";

        const contador = publicacion.querySelector(".contador-comentarios");
        contador.textContent = Number(contador.textContent) + 1;
    });
});