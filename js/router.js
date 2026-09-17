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
    <h1>About</h1>
    <p>Información sobre el proyecto.</p>
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

export function navigate(event) {
  event.preventDefault();

  const url = event.currentTarget.href;

  history.pushState({}, "", url);

  router();
}