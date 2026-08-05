import dotenv from "dotenv";

const result = dotenv.config({
  path: ".env.test",
});

if (result.error) {
    console.error("Load Env Test:", result.error);
    process.exit(1);
}

console.log("Load Env Test Successful:");
console.info(result);
