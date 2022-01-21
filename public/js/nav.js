// handle mobile nav open / close
const overlay = document.getElementById("nav-menu")
const overlayToggleIcon = document.getElementById("overlay-toggle")
overlayToggleIcon.addEventListener("click", handleToggle)

function handleToggle() {
  overlayToggleIcon.firstElementChild.className === "fas fa-bars"
    ? openOverlay()
    : closeOverlay()
}

function openOverlay() {
  overlayToggleIcon.firstElementChild.className = "fas fa-times"
  overlay.classList.add("open")
}

function closeOverlay() {
  overlayToggleIcon.firstElementChild.className = "fas fa-bars"
  overlay.classList.remove("open")
}

// update active nav item every time a page is rendered
window.addEventListener("load", () => {
  const navItems = Array.from(document.querySelectorAll(".nav-item"))
  const path = window.location.pathname
  if (path === "/") return navItems[0].classList.add("active")
  else {
    navItems.forEach(item => {
      const href = item.attributes.href.value
      const re = new RegExp(path + "/?[.+]?")
      href.match(re) && item.classList.add("active")
    })
  }
})

// scroll to top
document
  .getElementById("scroll-icon")
  .addEventListener("click", () => (document.body.scrollTop = 0))
