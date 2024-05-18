import http, { Server } from "http";
import app from "./app/app";

let server: Server = http.createServer(app);
const PORT: number = 5000;

async function main() {
  server = server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
}

main();
