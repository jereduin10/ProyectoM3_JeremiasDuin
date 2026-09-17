const STORAGE_KEY = "homero-chat";

export function initChat() {
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#chat-input");
  const messages = document.querySelector("#chat-messages");

  if (!form || !input || !messages) return;

  cargarMensajes(messages);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    mostrarMensaje("Vos", text, messages);

    input.value = "";

    mostrarMensaje("Homero", "Escribiendo...", messages);

    fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: text
  })
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Respuesta de la API:", data);
    const typing = document.querySelector("#typing");

    if (!typing) return;

    typing.innerHTML = `
  <strong>Homero:</strong>
  <p>${data.response}</p>
`;

typing.removeAttribute("id");

messages.scrollTop = messages.scrollHeight;
  })
  .catch((error) => {
    console.error(error);

    const typing = document.querySelector("#typing");

    if (!typing) return;

    typing.innerHTML = `
      <strong>Homero:</strong>
      <p>¡D'oh! Algo salió mal.</p>
    `;

    typing.removeAttribute("id");
  });
  });
}

function mostrarMensaje(autor, texto, container) {
  const clase = autor === "Vos"
    ? "user-message"
    : "character-message";

  const id = texto === "Escribiendo..." ? 'id="typing"' : "";

  container.innerHTML += `
    <div ${id} class="message ${clase}">
      <strong>${autor}:</strong>
      <p>${texto}</p>
    </div>
  `;

  container.scrollTop = container.scrollHeight;
}

function cargarMensajes(container) {
  const mensajes = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || "[]"
  );

  if (mensajes.length === 0) {
    mostrarMensaje(
      "Homero",
      "¡Hola! ¿Qué querés?",
      container
    );
  }
}