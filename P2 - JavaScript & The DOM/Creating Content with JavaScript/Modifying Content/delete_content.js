const cardContainer = document.querySelector('.hero__module');
// undefined

cardContainer.firstChild;
// #text

cardContainer.firstElementChild;
// <div class=​"hero__module--container">​…​</div>​

const firstCard = cardContainer.firstElementChild;
// undefined

cardContainer.removeChild(firstCard);
// <div class=​"hero__module--container">​…​</div>​