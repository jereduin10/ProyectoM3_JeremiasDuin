const STORAGE_KEY = "homero-chat";

export function initChat() {
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#chat-input");
  const messages = document.querySelector("#chat-messages");

  let isLoading = false;

  if (!form || !input || !messages) return;

  cargarMensajes(messages);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isLoading) return;

    const text = input.value.trim();

    if (!text) return;

    isLoading = true;

    input.disabled = true;
    form.querySelector("button").disabled = true;

    const history = obtenerHistorial();

    mostrarMensaje("Vos", text, messages);
    input.value = "";

    mostrarMensaje("Homero", "Escribiendo...", messages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history
        })
      });

      const data = await response.json();

const typing = document.querySelector("#typing");

if (typing) {
  if (!response.ok || !data.response) {
    typing.innerHTML = `
      <strong>Homero:</strong>
      <p>¡D'oh! No pude responderte. Probá de nuevo.</p>
    `;
  } else {
    typing.innerHTML = `
      <strong>Homero:</strong>
      <p>${data.response}</p>
    `;

  }

  typing.removeAttribute("id");
}

messages.scrollTop = messages.scrollHeight;

      guardarMensaje("Homero", data.response);

      messages.scrollTop = messages.scrollHeight;

    } catch (error) {
      console.error(error);

      const typing = document.querySelector("#typing");

      if (typing) {
        typing.innerHTML = `
          <strong>Homero:</strong>
          <p>¡D'oh! Algo salió mal.</p>
        `;

        typing.removeAttribute("id");
      }

    } finally {
      isLoading = false;

      input.disabled = false;
      form.querySelector("button").disabled = false;

      input.focus();
    }
  });
}

function mostrarMensaje(autor, texto, container, guardar = true) {
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

  if (texto !== "Escribiendo..." && guardar) {
  guardarMensaje(autor, texto);
}
}

function guardarMensaje(autor, texto) {
  const mensajes = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || "[]"
  );

  mensajes.push({
    autor,
    texto
  });

  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(mensajes)
  );
}

function cargarMensajes(container) {
  const mensajes = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || "[]"
  );

  mensajes.forEach((mensaje) => {
  mostrarMensaje(
    mensaje.autor,
    mensaje.texto,
    container,
    false
  );
});

  if (mensajes.length === 0) {
    mostrarMensaje(
      "Homero",
      "¡Hola! ¿Qué querés?",
      container
    );
  }
}

function obtenerHistorial() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY) || "[]"
  );
}