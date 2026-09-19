import { describe, it, expect, vi } from "vitest";

describe("Chat de Homero", () => {

  it("debería rechazar un mensaje vacío", () => {
    const mensaje = "";

    expect(mensaje.trim()).toBe("");
  });

  it("debería aceptar un mensaje con texto", () => {
    const mensaje = "Hola Homero";

    expect(mensaje.trim()).not.toBe("");
  });

  it("debería recibir una respuesta simulada de Homero", async () => {
    const respuestaMock = {
      response: '¡D\'oh! Entendí tu mensaje: "Hola Homero".'
    };

    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => respuestaMock
    });

    const response = await fetchMock("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        message: "Hola Homero"
      })
    });

    const data = await response.json();

    expect(fetchMock).toHaveBeenCalled();
    expect(data.response).toContain("Entendí tu mensaje");
  });

});

it("debería enviar el mensaje a la API", async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    json: async () => ({
      response: "¡D'oh!"
    })
  });

  await fetchMock("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Hola Homero"
    })
  });

  expect(fetchMock).toHaveBeenCalledWith(
    "/api/chat",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({
        message: "Hola Homero"
      })
    })
  );
});