const dashboardToggles = document.querySelectorAll(".dashboard-toggle")
const editInfoForm = document.querySelector(".edit-info-form")
const createPostForm = document.querySelector(".create-post-form")

dashboardToggles.forEach(button =>
  button.addEventListener("click", e => handleDashboardToggle(e))
)

const handleDashboardToggle = e => {
  if (e.target.id === "edit-info-toggle") {
    // do stuff
    editInfoForm.classList.toggle("active")
  } else if (e.target.id === "create-post-toggle") {
    // do stuff
    createPostForm.classList.toggle("active")
  } else return

  e.target.classList.toggle("active")
}
