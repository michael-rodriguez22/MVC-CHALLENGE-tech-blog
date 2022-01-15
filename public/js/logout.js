document.getElementById("logout").addEventListener("click", logout)

async function logout(e) {
  e.preventDefault()
  await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  })

  alert("You have logged out.")
  document.location.replace("/")
}
