// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// YouTube embeds: <div class="video" data-youtube="VIDEO_ID">
document.querySelectorAll(".video").forEach((box) => {
  const id = box.dataset.youtube.trim();
  if (!id) {
    box.innerHTML = `<div class="placeholder">VIDEO: ${box.dataset.label}<br>paste the YouTube ID in data-youtube</div>`;
    return;
  }
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}`;
  iframe.title = box.dataset.label || "Video";
  iframe.loading = "lazy";
  iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  box.appendChild(iframe);
});

// Missing images: show the expected file path instead of a broken icon
function showPlaceholder(img) {
  const ph = document.createElement("div");
  ph.className = "placeholder " + img.className;
  ph.textContent = img.getAttribute("src");
  img.replaceWith(ph);
}

document.querySelectorAll("main img, .hero img").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) showPlaceholder(img);
  else img.addEventListener("error", () => showPlaceholder(img));
});

// Lightbox: click any project/certificate/community image to enlarge
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

document.querySelector("main").addEventListener("click", (e) => {
  const img = e.target.closest("img");
  if (!img) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.hidden = false;
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
}
lightbox.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});
