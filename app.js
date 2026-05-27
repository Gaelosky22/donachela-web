const productos = [
    {
        nombre: "Pastel tres leches",
        descripcion: "Un clásico suave, húmedo y perfecto para cualquier celebración.",
        imagen: "imagenes/pastelesImagenes/tresLeches.png",
        categoria: "pasteles"
    },
    {
        nombre: "Pastel de fresa",
        descripcion: "Pastel fresco con un toque frutal y decoración delicada.",
        imagen: "imagenes/pastelesImagenes/pastelFresa.png",
        categoria: "pasteles"
    },
    {
        nombre: "Pastel Milky Way",
        descripcion: "Ideal para los amantes del chocolate y sabores dulces.",
        imagen: "imagenes/pastelesImagenes/milkyWay.png",
        categoria: "pasteles"
    },
    {
        nombre: "Pastel de zanahoria",
        descripcion: "Sabor casero, textura suave y un toque especial.",
        imagen: "imagenes/pastelesImagenes/pastelZanahoria.png",
        categoria: "pasteles"
    },
    {
        nombre: "Pastel Bubulubu",
        descripcion: "Una opción divertida y deliciosa para compartir.",
        imagen: "imagenes/pastelesImagenes/bubulubuGrande.png",
        categoria: "pasteles"
    },
    {
        nombre: "Pastel Snickers",
        descripcion: "Chocolate, crema y sabor intenso para consentirte.",
        imagen: "imagenes/pastelesImagenes/snickers.png",
        categoria: "pasteles"
    },
    {
        nombre: "Chocoflan",
        descripcion: "La combinación perfecta entre pastel de chocolate y flan.",
        imagen: "imagenes/pastelesImagenes/postres/chocoFlan.png",
        categoria: "postres"
    },
    {
        nombre: "Choco queso",
        descripcion: "Postre cremoso con sabor dulce y textura suave.",
        imagen: "imagenes/pastelesImagenes/postres/chocoQueso.png",
        categoria: "postres"
    },
    {
        nombre: "Flan mediano",
        descripcion: "Postre tradicional, suave y perfecto para reuniones.",
        imagen: "imagenes/pastelesImagenes/postres/flanMediano.png",
        categoria: "postres"
    },
    {
        nombre: "Pay de queso",
        descripcion: "Cremoso, dulce y con un sabor casero irresistible.",
        imagen: "imagenes/pastelesImagenes/postres/payQuesoGrande.png",
        categoria: "postres"
    },
    {
        nombre: "Día de las madres",
        descripcion: "Pasteles especiales para celebrar a mamá.",
        imagen: "imagenes/pastelesImagenes/diasFestivos/diaMadres.png",
        categoria: "festivos"
    },
    {
        nombre: "San Valentín",
        descripcion: "Detalles dulces para regalar amor y cariño.",
        imagen: "imagenes/pastelesImagenes/diasFestivos/sanValentin.png",
        categoria: "festivos"
    },
    {
        nombre: "Navidad",
        descripcion: "Pasteles y postres para compartir en familia.",
        imagen: "imagenes/pastelesImagenes/diasFestivos/navidadPasteles.png",
        categoria: "festivos"
    },
    {
        nombre: "Roscas",
        descripcion: "Tradición y sabor para fechas especiales.",
        imagen: "imagenes/pastelesImagenes/diasFestivos/roscas.png",
        categoria: "festivos"
    }
];

const contenedor = document.getElementById("contenedorProductos");
const botonesFiltro = document.querySelectorAll(".filtro");
const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");
const header = document.getElementById("header");

// Overlay para cerrar menú móvil
const overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

function mostrarProductos(categoria) {
    contenedor.innerHTML = "";

    const productosFiltrados = categoria === "todos"
        ? productos
        : productos.filter(p => p.categoria === categoria);

    productosFiltrados.forEach((producto, i) => {
        const card = document.createElement("div");
        card.classList.add("card-producto");
        card.style.animationDelay = `${i * 0.06}s`;
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            <div class="card-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="categoria">${producto.categoria}</span>
            </div>
        `;

        contenedor.appendChild(card);

        // Trigger animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            });
        });
    });
}

// Filtros
botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesFiltro.forEach(btn => btn.classList.remove("activo"));
        boton.classList.add("activo");
        mostrarProductos(boton.getAttribute("data-categoria"));
    });
});

// Menú móvil
function toggleMenu() {
    menu.classList.toggle("activo");
    overlay.classList.toggle("activo");
    document.body.style.overflow = menu.classList.contains("activo") ? "hidden" : "";
}

btnMenu.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// Cerrar menú al hacer clic en un link
menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        if (menu.classList.contains("activo")) toggleMenu();
    });
});

// Header sombra al hacer scroll
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// Inicio
mostrarProductos("todos");