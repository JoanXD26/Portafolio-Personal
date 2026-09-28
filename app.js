document.addEventListener("DOMContentLoaded", () => {
  /* ============================================
         1. MENÚ MÓVIL
         ============================================ */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("is-active");
      navToggle.setAttribute("aria-expanded", String(isActive));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ============================================
    2. TEMA CLARO / OSCURO CON PERSISTENCIA
    ============================================ */
  const THEME_KEY = "theme";
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  };

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      // 1. Lógica del cambio de tema (lo que ya tenías)
      const isDark = root.getAttribute("data-theme") === "dark";
      const nextTheme = isDark ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);

      // 2. Lógica de la animación (Lo nuevo)
      // Cambiar el icono visualmente (opcional, pero queda genial)
      themeToggle.textContent = nextTheme === "dark" ? "☀️" : "🌑";

      // Disparar la animación CSS
      themeToggle.classList.add("is-animating");

      // Quitar la clase después de que termine la animación (300ms)
      // para que el botón pueda volver a animarse en el siguiente clic
      setTimeout(() => {
        themeToggle.classList.remove("is-animating");
      }, 300);
    });

    // Asegurar que el icono coincida con el tema preferido al cargar la página inicial
    themeToggle.textContent = getPreferredTheme() === "dark" ? "☀️" : "🌓";
  }

  /* ============================================
    3. BOTÓN VOLVER ARRIBA
    ============================================ */
  const scrollTopBtn = document.getElementById("btn-scroll-top");
  const SCROLL_THRESHOLD = 300;

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        scrollTopBtn.classList.add("is-visible");
      } else {
        scrollTopBtn.classList.remove("is-visible");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

/* ============================================
4. ANIMACIONES CONTROLADAS (Intersection Observer)
============================================ */

// 1. Seleccionamos todos los elementos con la clase .fade-in
const elementosAnimados = document.querySelectorAll(".fade-in");

if ("IntersectionObserver" in window) {
  const animacionObserver = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          // Si entra en pantalla, le ponemos la clase (se anima hacia arriba)
          entrada.target.classList.add("is-visible");
        } else {
          // Si sale de la pantalla, le quitamos la clase (se reinicia oculto abajo)
          entrada.target.classList.remove("is-visible");
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px", // Cambiado a 0px para que se oculte apenas salga de la vista
    },
  );

  elementosAnimados.forEach((elemento) => {
    animacionObserver.observe(elemento);
  });
} else {
  elementosAnimados.forEach((el) => el.classList.add("is-visible"));
}

/* ============================================
4. VALIDACIÓN DE FORMULARIO DE CONTACTO 
============================================ */
const contactForm = document.querySelector(".form-contacto");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Detiene el envío automático para validar primero
    let isValid = true;

    // Obtener campos y contenedores de error
    const nombreInput = document.getElementById("nombre");
    const correoInput = document.getElementById("correo");
    const mensajeInput = document.getElementById("mensaje");

    const errorNombre = document.getElementById("error-nombre");
    const errorCorreo = document.getElementById("error-correo");
    const errorMensaje = document.getElementById("error-mensaje");

    // Limpiar errores previos
    errorNombre.textContent = "";
    errorCorreo.textContent = "";
    errorMensaje.textContent = "";

    // Validar Nombre
    if (nombreInput.value.trim() === "") {
      errorNombre.textContent = "Por favor, ingresa tu nombre completo.";
      isValid = false;
    }

    // Validar Correo (formato básico)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correoInput.value.trim() === "") {
      errorCorreo.textContent = "El correo electrónico es obligatorio.";
      isValid = false;
    } else if (!emailRegex.test(correoInput.value.trim())) {
      errorCorreo.textContent =
        "Por favor, ingresa un correo electrónico válido.";
      isValid = false;
    }

    // Validar Mensaje
    if (mensajeInput.value.trim() === "") {
      errorMensaje.textContent = "El mensaje no puede estar vacío.";
      isValid = false;
    }

    // Si todo es válido, simular envío
    if (isValid) {
      // Aquí iría el código para enviar los datos (ej. fetch)
      alert("¡Mensaje enviado con éxito! (Simulación)");
      contactForm.reset(); // Limpiar el formulario
    }
  });
}
