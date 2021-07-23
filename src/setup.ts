import dotenv from "dotenv";

const path:string = (() => {
  switch (process.env.NODE_ENV) {
    case "test":
      return "./.env.test";
    case "dev":
      return "./.env";
    case "production":
      return null;
  }
})();

if (path){
  dotenv.config({ path });
}
