/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sectionList = document.getElementsByTagName("section"),
navBar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Helper function developed using code from https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
function inViewport(element) {
    const rectObject = element.getBoundingClientRect();
    return(
        (rectObject.top <= 0) &&
        rectObject.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rectObject.bottom > 0
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function navBuild() {
    for (let i = 0; i < sectionList.length; i++) {
        navBar.innerHTML += "<li id=\"nav" + sectionList[i].dataset.nav.split(" ")[1] + "\"><a href=#" + sectionList[i].id + " class=\"menu__link\">" + sectionList[i].dataset.nav + "</a></li>";
    }
}

// Add class 'active' to section when near top of viewport
function activeClass(event) {
    for (let i = 0; i < sectionList.length; i++) {
        if (inViewport(sectionList[i])) {
            sectionList[i].className = "activeSection";
            document.getElementById(`nav${i+1}`).classList.add("activeMenu");
        } else {
            sectionList[i].removeAttribute("class");
            document.getElementById(`nav${i+1}`).classList.remove("activeMenu");
        }
    }
        
}

// Scroll to anchor ID using scrollTO event
function anchorScroll(event) {
    event.preventDefault();
    const section = document.getElementById(this.getAttribute("href").slice(1)),
    xCoord = section.offsetLeft,
    yCoord = section.offsetTop;
    window.scrollTo({top:yCoord, left:xCoord, behavior: "smooth"});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navBuild();
// Scroll to section on link click
const anchors = document.querySelectorAll("li > a");
for (const anchor of anchors) {
    anchor.addEventListener("click", anchorScroll);
}
// Set sections as active
document.addEventListener("scroll", activeClass);

