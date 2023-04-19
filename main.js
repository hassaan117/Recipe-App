// Navbar mobile view
const menu = document.querySelector(".left-text");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburgericon");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);
menuItems.forEach( 
    function(menuItem) { 
      menuItem.addEventListener("click", toggleMenu);
    }
 )



// Search Input
const searchInput = document.getElementById("search");
const searchSuggestions = document.getElementById("search-suggest");

document.addEventListener("click", function(event) {
  // hide Search suggestions ifclicked outside of Searchinput or search suggestions
  if (event.target !== searchInput && event.target !== searchSuggestions) {
    searchSuggestions.style.display = "none";
  }
});
  // hide if no Search results
searchInput.addEventListener("input", function() {
  if (searchInput.value.trim() === "" || searchSuggestions.childNodes.length === 0) {
    searchSuggestions.style.display = "none";
  } else {
    searchSuggestions.style.display = "block";
  }
});

