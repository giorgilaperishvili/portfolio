document.addEventListener("DOMContentLoaded", () => {
  // Lightbox Functionality with Project-Specific Navigation
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal-content");
  const closeModal = document.querySelector(".close-modal");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentProjectImages = [];
  let currentIndex = 0;

  // Attach click events to all gallery items
  document.querySelectorAll(".project-section").forEach((projectDoc) => {
    const items = projectDoc.querySelectorAll(".gallery-item");
    const images = Array.from(items).map(
      (item) => item.querySelector("img").src,
    );

    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentProjectImages = images;
        currentIndex = index;
        updateModalImage();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });
  });

  const updateModalImage = () => {
    modalImg.src = currentProjectImages[currentIndex];
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (currentProjectImages.length === 0) return;
    currentIndex = (currentIndex + 1) % currentProjectImages.length;
    updateModalImage();
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (currentProjectImages.length === 0) return;
    currentIndex =
      (currentIndex - 1 + currentProjectImages.length) %
      currentProjectImages.length;
    updateModalImage();
  };

  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Scroll Reveal Effect
  const reveal = () => {
    const reveals = document.querySelectorAll(
      ".gallery-item, .file-card, .project-section",
    );
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    });
  };

  // Initial styles for reveal animation
  document
    .querySelectorAll(".gallery-item, .file-card, .project-section")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.8s ease-out";
    });

  window.addEventListener("scroll", reveal);
  reveal(); // Initial check
});
