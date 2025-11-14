export function setupModals() {
  const cards = document.querySelectorAll(".card-with-modal");

  cards.forEach((card) => {
    if (card instanceof HTMLElement) {
      if (card.dataset.modalSetup === "true") return;

      const openBtn = card.querySelector(
        ".open-modal-btn"
      ) as HTMLElement | null;
      const closeBtn = card.querySelector(
        ".close-modal-btn"
      ) as HTMLElement | null;
      const dialog = card.querySelector(
        "dialog.art-card-dialog"
      ) as HTMLDialogElement | null;

      if (!dialog || !openBtn || !closeBtn) return;

      // Abrir modal
      openBtn.addEventListener("click", () => {
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          alert("Tu navegador no soporta modales nativos.");
        }
      });

      // Cerrar modal con botón
      closeBtn.addEventListener("click", () => dialog.close());

      // Cerrar modal al hacer click fuera
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
      });

      // Marcar como configurado
      card.dataset.modalSetup = "true";
    }
  });
}

// Auto-inicializar
document.addEventListener("DOMContentLoaded", setupModals);

// Para navegación SPA de Astro
document.addEventListener("astro:page-load", setupModals);
