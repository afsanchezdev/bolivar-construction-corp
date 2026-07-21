console.log("✅ script.js cargado correctamente");

// ===============================
// Año automático en el Footer
// ===============================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// ===============================
// Barra de progreso + Header
// ===============================

const scrollProgress = document.getElementById("scrollProgress");
const siteHeader = document.querySelector(".site-header");

function onScroll() {

    if (scrollProgress) {

        const scrollTop = window.scrollY;

        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const pct = docHeight > 0
            ? (scrollTop / docHeight) * 100
            : 0;

        scrollProgress.style.width = pct + "%";
    }

    if (siteHeader) {
        siteHeader.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    }

}

window.addEventListener("scroll", onScroll, { passive: true });

onScroll();


// ===============================
// Menú móvil
// ===============================

const navToggle = document.getElementById("navToggle");
const mainNav = document.querySelector(".main-nav");

console.log("Botón:", navToggle);
console.log("Menú:", mainNav);

if (navToggle && mainNav) {

    navToggle.addEventListener("click", function () {

        console.log("🍔 CLICK");

        const isOpen = mainNav.classList.toggle("open");

      navToggle.classList.toggle("active");

      navToggle.setAttribute(
          "aria-expanded",
          isOpen
      );

        navToggle.setAttribute(
            "aria-expanded",
            mainNav.classList.contains("open")
        );

    });

    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// ===============================
// Formulario
// ===============================

const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (form) {

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = form.name.value.trim();

        if (!name) return;

        const submitBtn =
            form.querySelector('button[type="submit"]');

        submitBtn.disabled = true;

        formNote.textContent = "Sending...";

        try {

            const response = await fetch(form.action, {

                method: "POST",

                body: new FormData(form),

                headers: {

                    Accept: "application/json"

                }

            });

            if (response.ok) {

                formNote.textContent =
                    `Thanks, ${name}. We'll be in touch soon.`;

                form.reset();

            } else {

                formNote.textContent =
                    "Something went wrong. Please call or email us directly.";

            }

        } catch (error) {

            formNote.textContent =
                "Something went wrong. Please call or email us directly.";

        } finally {

            submitBtn.disabled = false;

        }

    });

}