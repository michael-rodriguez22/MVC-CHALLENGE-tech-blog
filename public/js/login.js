async function loginFormHandler(e) {
  e.preventDefault()

  const email = document.getElementById("login-email").value.trim()
  const password = document.getElementById("login-password").value.trim()

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })

    const data = await response.json()

    alert(data.message)
    response.ok && document.location.replace("/")
  }
}

async function signupFormHandler(e) {
  e.preventDefault()

  const username = document.getElementById("signup-username").value.trim()
  const email = document.getElementById("signup-email").value.trim()
  const password = document.getElementById("signup-password").value.trim()

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })

    const data = await response.json()
    console.log(data)
    alert(data.message)
    response.ok && document.location.replace("/dashboard")
  }
}

document
  .getElementById("login-form")
  .addEventListener("submit", loginFormHandler)

document
  .getElementById("signup-form")
  .addEventListener("submit", signupFormHandler)
