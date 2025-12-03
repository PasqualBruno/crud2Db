import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// ===== 1. Conexão com MongoDB =====
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("🔵 MongoDB conectado!"))
  .catch((err) => console.error("❌ Erro no Mongo:", err));

// ===== 2. Schema =====
const DishSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const Dish = mongoose.model("Dish", DishSchema);

// ===== 3. Rotas =====

// CREATE
app.post("/dishes", async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.json(dish);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar prato" });
  }
});

// READ
app.get("/dishes", async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// UPDATE
app.put("/dishes/:id", async (req, res) => {
  const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
app.delete("/dishes/:id", async (req, res) => {
  await Dish.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ===== 4. Start =====
app.listen(3000, () => {
  console.log("🚀 API rodando na porta 3000");
});
