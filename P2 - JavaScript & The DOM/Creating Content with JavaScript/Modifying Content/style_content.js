let heading = document.querySelector('h6.text-center');
// undefined

heading.style.color = 'orange';
// "orange"

heading.style.fontSize = '2em';
// "2em"

heading.style;
// CSSStyleDeclaration {0: "color", 1: "font-size", alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}

heading.classList.contains('text-center');
// true

heading.classList.add('ice-cream');
// undefined

heading.classList.remove('ice-cream');
// undefined

heading.classList.toggle('text-center');
// false

heading.classList.toggle('text-center');
// true