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

if (navToggle && mainNav) {

    navToggle.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("open");

      navToggle.classList.toggle("active");

      navToggle.setAttribute(
          "aria-expanded",
          isOpen
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
// Bloqueo de scroll de fondo (para modales)
// ===============================
// overflow:hidden en el body no siempre funciona en celulares (iOS Safari
// lo ignora al arrastrar con el dedo). Esta técnica "congela" la página en
// su posición exacta y la restaura al cerrar, funcionando en todos los navegadores.

let scrollLockPosition = 0;

function lockBodyScroll() {

    scrollLockPosition = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockPosition}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

}

function unlockBodyScroll(restoreScrollPosition = true) {

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    if (restoreScrollPosition) {
        requestAnimationFrame(() => {
            window.scrollTo({ top: scrollLockPosition, left: 0, behavior: "instant" });
        });
    }

}


// ===============================
// "Also available" — acordeón de servicios
// ===============================

document.querySelectorAll(".specialized-toggle").forEach(toggle => {

    toggle.addEventListener("click", () => {

        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");

    });

});


// ===============================
// Recent Projects — columnas parejas
// ===============================

const portfolioGridEl = document.querySelector(".portfolio-grid");

if (portfolioGridEl) {

    const totalItems = portfolioGridEl.querySelectorAll(".portfolio-item").length;

    let columns = 3;

    if (totalItems <= 2) {
        columns = totalItems || 1;
    } else if (totalItems === 4) {
        columns = 2;
    } else if (totalItems % 3 === 0) {
        columns = 3;
    } else if (totalItems % 2 === 0) {
        columns = 2;
    }

    portfolioGridEl.style.setProperty("--portfolio-cols", columns);

}


// ===============================
// Recent Projects — detalle por categoría
// ===============================

const portfolioData = {
    "new-construction": {
        title: "New Construction",
        text: "From the first foundation pour to the final walkthrough, we build duplexes, single-family homes and high-quality residences engineered to last — managed by one team, start to finish.",
        images: [
            { src: "images/project-duplex-exterior.jpg", alt: "Finished duplex, South Florida" },
            { src: "images/project-crew-onsite.jpg", alt: "Crew building block wall on site" }
        ]
    },
    "pool-patio": {
        title: "Pool & Patio",
        text: "Custom pools, patios, decks, outdoor kitchens and fire pits — designed and built to turn your backyard into a private retreat, to South Florida code and weather.",
        images: [
            { src: "images/project-pool-finished.jpg", alt: "Finished pool and patio" },
            { src: "images/project-pool-turf.jpg", alt: "Pool with artificial turf backyard" },
            { src: "images/project-pool-progress.jpg", alt: "Pool under construction" }
        ]
    },
    "commercial": {
        title: "Commercial Projects",
        text: "Retail stores, offices, restaurants and warehouses — planned and managed to meet tight deadlines and budgets without cutting corners on quality.",
        images: [
            { src: "images/project-commercial-render.jpg", alt: "Commercial project design render" }
        ]
    },
    "plans-design": {
        title: "Plans & Design",
        text: "Architectural, structural, and MEP (mechanical, electrical, plumbing) plans — engineered and permit-ready, done in-house from the very first sketch.",
        images: [
            { src: "images/project-aerial-foundation.jpg", alt: "Structural and architectural planning" }
        ]
    },
    "renovations & remodeling": {
        title: "Renovations & Remodeling",
        text: "Kitchens, bathrooms, additions and full home remodels — updating outdated spaces into something you'll actually want to live in, without cutting corners on the details.",
        images: [
            { src: "images/project-renovation-kitchen-abroad.jpg.png", alt: "project-renovation-kitchen-abroad" },
            { src: "images/project-renovation-kitchen-finished.png", alt: "project-renovation-kitchen-finished"},
            { src: "images/project-renovation-progress.jpeg", alt: "project-renovation-progress"}
        ]
    }
};

const portfolioButtons = document.querySelectorAll(".portfolio-item[data-category]");
const portfolioDetail = document.getElementById("portfolioDetail");
const portfolioModalBackdrop = document.getElementById("portfolioModalBackdrop");
const portfolioDetailMedia = document.getElementById("portfolioDetailMedia");
const portfolioDetailTitle = document.getElementById("portfolioDetailTitle");
const portfolioDetailText = document.getElementById("portfolioDetailText");
const portfolioDetailClose = document.getElementById("portfolioDetailClose");

let lastPortfolioTrigger = null;

if (portfolioButtons.length && portfolioDetail) {

    function openPortfolioDetail(category, trigger) {

        const data = portfolioData[category];

        if (!data) return;

        lastPortfolioTrigger = trigger || null;

        portfolioDetailTitle.textContent = data.title;
        portfolioDetailText.textContent = data.text;

        portfolioDetailMedia.innerHTML = "";

        data.images.forEach(image => {

            const img = document.createElement("img");

            img.src = image.src;
            img.alt = image.alt;
            img.loading = "lazy";
            img.decoding = "async";

            portfolioDetailMedia.appendChild(img);

        });

        portfolioDetail.hidden = false;
        portfolioDetail.style.height = window.innerHeight + "px";
        lockBodyScroll();

        portfolioButtons.forEach(btn => {
            btn.setAttribute(
                "aria-expanded",
                btn.dataset.category === category ? "true" : "false"
            );
        });

        if (portfolioDetailClose) {
            portfolioDetailClose.focus({ preventScroll: true });
        }

    }

    window.addEventListener("resize", () => {
        if (portfolioDetail && !portfolioDetail.hidden) {
            portfolioDetail.style.height = window.innerHeight + "px";
        }
    });

    function closePortfolioDetail(restoreScrollPosition = true) {

        portfolioDetail.hidden = true;
        unlockBodyScroll(restoreScrollPosition);

        portfolioButtons.forEach(btn => btn.setAttribute("aria-expanded", "false"));

        if (restoreScrollPosition && lastPortfolioTrigger) {
            lastPortfolioTrigger.focus({ preventScroll: true });
            lastPortfolioTrigger = null;
        }

    }

    portfolioButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            const alreadyOpen = btn.getAttribute("aria-expanded") === "true";

            if (alreadyOpen) {
                closePortfolioDetail();
            } else {
                openPortfolioDetail(btn.dataset.category, btn);
            }

        });

    });

    if (portfolioDetailClose) {
        portfolioDetailClose.addEventListener("click", closePortfolioDetail);
    }

    if (portfolioModalBackdrop) {
        portfolioModalBackdrop.addEventListener("click", closePortfolioDetail);
    }

    const portfolioDetailCta = document.getElementById("portfolioDetailCta");

    if (portfolioDetailCta) {
        portfolioDetailCta.addEventListener("click", () => {
            closePortfolioDetail(false);
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !portfolioDetail.hidden) {
            closePortfolioDetail();
        }
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