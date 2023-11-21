import http from "node:http";

const users = [
  {
    id: 1,
    name: "Dan",
  },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  return res
    .setHeader("Content-type", "application/json")
    .end(JSON.stringify(users));
});

server.listen(3333);
