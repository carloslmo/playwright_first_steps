import Fastify from "fastify";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const fastify = Fastify({ logger: true });

// Ruta absoluta al archivo
const reportPath = path.join(process.cwd(), "playwright-report", "index.html");

// Lista blanca de scripts permitidos
const scripts = {
  privateTracker: ["npm", ["run", "test:privateTracker"]],
  demo: ["npm", ["run", "test:demo"]], //npm run test:demo
};

fastify.get("/status", async (request, reply) => {
    return { message: "La API responde correctamente" };
});

fastify.get("/report", async (request, reply) => {
  try {
    const html = fs.readFileSync(reportPath, "utf-8");

    reply
      .type("text/html")
      .send(html);
  } catch (error) {
    reply.code(404).send({ error: "No se encontró el reporte" });
  }
});

fastify.post("/run-script", async (request, reply) => {
  const { script } = request.body;

  if (!scripts[script]) {
    return reply.code(400).send({ error: "Script no permitido" });
  }

  const [command, args] = scripts[script];

  return new Promise((resolve, reject) => {
    const process = spawn(command, args);

    let output = "";
    let errorOutput = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    process.on("close", (code) => {
      resolve({
        code,
        output,
        errorOutput,
      });
    });
  });
});

fastify.delete("/report", async (request, reply) => {
  try {
    if (!fs.existsSync(reportPath)) {
      return reply.code(404).send({ message: "No existe el reporte" });
    }

    fs.rmSync(reportPath, { recursive: true, force: true });

    return { message: "Reporte eliminado correctamente" };
  } catch (error) {
    reply.code(500).send({
      message: "Error al eliminar el reporte",
      error: error.message,
    });
  }
});


fastify.listen({ port: 3122, host: "0.0.0.0" }); //El host se debe cambiar por el que tenga la maquina que ejecutamos