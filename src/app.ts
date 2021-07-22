import express from "express";
import cors from "cors";
import connection from './database';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", async (req, res) => {
  const recommendations = await connection.query(`select * from recommendations`);
  console.log(recommendations.rows)
  res.send("OK!");
});

export default app;
