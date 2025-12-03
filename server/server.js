import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com Mongo Atlas
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro no MongoDB", err));

// CRUD
const DishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});
const Dish = mongoose.model("Dish", DishSchema);

// Rotas
app.get("/", (req, res) => res.send("API ONLINE"));

app.get("/dishes", async (req, res) => {
  const r = await Dish.find();
  res.json(r);
});

app.post("/dishes", async (req, res) => {
  const r = await Dish.create(req.body);
  res.json(r);
});

app.delete("/dishes/:id", async (req, res) => {
  await Dish.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Porta dinâmica do Render
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API rodando na porta " + port));
