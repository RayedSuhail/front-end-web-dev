const container = document.createElement('span');
// undefined

container;
// <span><\span>

container.textContent = ', right now!';
// ", right now!"

container;
// <span>, right now!<\span>

const existingELement = document.querySelector('h1');
// undefined

existingELement.appendChild(container);
// <span>​, right now!​</span>

