import { fileURLToPath } from "url";
import path from "path";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyFormbody from "@fastify/formbody";

const fastify = Fastify({
  logged: true,
});

const __filename = fileURLToPath(import.meta.url);

fastify.register(fastifyStatic, {
  root: path.join(path.dirname(__filename), "public"),
  prefix: "/public/",
  constraints: { host: "localhost" },
});

fastify.register(fastifyFormbody);

fastify.get('/', async (request, reply) => {
	reply.sendFile('index.html')
});

fastify.get("/api/:path", async (request, reply) => {
  const { path } = request.params;
  reply.send({ path });
});

fastify.get("/api/products", async (request, reply) => {
  const products = [
    {
      id: 0,
      name: "Test Product 1",
      price: 62.5,
      currency: "EUR",
      colors: ["brown", "blue"],
    },
    {
      id: 1,
      name: "Test Product 2",
      price: 26.7,
      currency: "TR",
      colors: ["yellow"],
    },
    {
      id: 2,
      name: "Test Product 3",
      price: 10,
      currency: "USD",
      colors: ["black", "white", "purple"],
    },
    {
      id: 3,
      name: "Test Product 4",
      price: 33,
      currency: "Yen",
      colors: ["customPink"],
    },
  ];

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(products);
});

fastify.post("/api/contact", async (request, reply) => {
  const { name, surname, email } = request.body;
  console.log(`Name: ${name}, Surname: ${surname}, Email: ${email}`);
});

const start = async () => {
  const port = 8086;

  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
