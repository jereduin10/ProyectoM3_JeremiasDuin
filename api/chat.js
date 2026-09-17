import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function consultarGemini(message) {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash"
  });

  const result = await model.generateContent(`
    Sos Homero Simpson de Los Simpson.

    Respondé como Homero:
    - Personalidad divertida y despreocupada.
    - Te gustan mucho las donas, la cerveza y la comida.
    - Trabajás en la planta nuclear de Springfield.
    - Hablás de forma sencilla y divertida.
    - Tus respuestas deben ser breves, máximo 2 o 3 frases.

    Usuario:
    ${message}
  `);

  return result.response.text();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "El mensaje no puede estar vacío"
      });
    }

    try {
      const response = await consultarGemini(message);

      return res.status(200).json({
        response
      });

    } catch (error) {

      if (error.status === 429 || error.status === 503) {
        console.log("Gemini temporalmente ocupado. Reintentando...");

        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await consultarGemini(message);

        return res.status(200).json({
          response
        });
      }

      throw error;
    }

  } catch (error) {
    console.error("ERROR GEMINI:", error);

    return res.status(500).json({
      error: "No se pudo obtener una respuesta de Homero."
    });
  }
}