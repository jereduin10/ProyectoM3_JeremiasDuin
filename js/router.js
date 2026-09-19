import { initChat } from "./chat.js";


const routes = {
 "/home": `
  <section class="home">
    <div class="home-content">

      <div class="character-image">
        <img 
          src="/assets/homero.png" 
          alt="Homero Simpson"
        >
      </div>

      <div class="home-info">
        <span class="badge">PERSONAJE IA</span>

        <h1>¡D'oh!</h1>

        <h2>Chateá con Homero Simpson</h2>

        <p>
          Hablá con Homero sobre Springfield, la familia,
          el trabajo, la comida o cualquier cosa que se te ocurra.
        </p>

        <a href="/chat" data-link class="btn-chat">
          Empezar a chatear
        </a>
      </div>

    </div>
  </section>
`,

  "/chat": `
  <section class="chat-page">

    <div class="chat-header">
      <img src="/assets/homero.png" alt="Homero Simpson">
      <div>
        <h1>Homero Simpson</h1>
        <span>En línea</span>
      </div>
    </div>

    <div id="chat-messages" class="chat-messages"></div>

    <form id="chat-form" class="chat-form">
      <input
        id="chat-input"
        type="text"
        placeholder="Escribí un mensaje..."
        autocomplete="off"
      >

      <button type="submit">Enviar</button>
    </form>

  </section>
`,

  "/about": `
  <section class="about-page">
    <div class="about-content">

      <span class="badge">SOBRE EL PROYECTO</span>

      <h1>ComicSansCon</h1>

      <p>
        ComicSansCon es una aplicación web que te permite
        chatear con tu personaje favorito utilizando
        inteligencia artificial.
      </p>

      <h2>¿Cómo funciona?</h2>

      <p>
        Escribís un mensaje y la aplicación lo envía a una
        función de Vercel, que se comunica de forma segura
        con Google Gemini.
      </p>

      <h2>Tecnologías utilizadas</h2>

      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>Vercel Functions</li>
        <li>Google Gemini</li>
        <li>Vitest</li>
      </ul>

      <h2>Sobre Homero</h2>

      <p>
        En este proyecto Homero Simpson es el personaje
        elegido para demostrar cómo una aplicación web
        puede interactuar con inteligencia artificial
        manteniendo una personalidad definida.
      </p>

    </div>
  </section>
`
};

export function router() {
  const path = window.location.pathname;

  const view = routes[path] || routes["/home"];

  document.querySelector("#app").innerHTML = view;

  if (path === "/chat") {
  initChat();
}
}

export function navigate(event, link) {
  event.preventDefault();

  const url = link.href;

  history.pushState({}, "", url);

  router();
}