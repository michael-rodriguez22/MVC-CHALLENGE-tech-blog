const searchInput = document.getElementById("searchbar")

document
  .getElementById("search-title")
  .addEventListener(
    "click",
    () =>
      searchInput.value !== "" &&
      document.location.replace(`/posts?title=${searchInput.value.trim()}`)
  )

document
  .getElementById("search-author")
  .addEventListener(
    "click",
    () =>
      searchInput.value !== "" &&
      document.location.replace(`/posts?author=${searchInput.value.trim()}`)
  )
