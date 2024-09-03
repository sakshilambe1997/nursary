import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors"


const app = express();
app.use(cors())
app.use(express.json());

const DbConnection = async (req, res) => {
  const conn = await mongoose.connect(process.env.MONGO_URL);

  if(conn){
    console.log("MongoDB Connected Successfully")
  }
  else{
    console.log("MongoDB  Not Connected")
  }
};
DbConnection();


import { getHealth } from "./src/controllers/health.js";
import {
  postPlant,
  getPlants,
  getPlantId,
  putPlantId,
  deletePlantId,
} from "./src/controllers/plant.js";
import { handlePageNotFound404 } from "./src/controllers/errors.js";

const plants = [
  {
    id: 1,
    name: "Bamboo",
    category: "indoor",
    image:
      "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121&width=750",
    price: "1500",
    description: "Lucky Bamboo Plant - 3 Layer",
  },

  {
    id: 2,
    name: "Hibiscus",
    category: "indoor",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Hibiscus_flower_TZ.jpg",
    price: "250",
    description: "The Hibiscus plant",
  },

  {
    id: 3,
    name: "Rose",
    category: "outdoor",
    image:
      "https://media.istockphoto.com/id/1256125259/photo/pink-roses-in-garden.jpg?s=1024x1024&w=is&k=20&c=kkc2SYt14-gmJ5Lb068DlnKS5q5A7H-SYmM9OeSV26o=",
    price: "2000",
    description: "Lucky Rose Plant - 6 Layer",
  },

  {
    id: 3,
    name: "flower",
    category: "outdoor",
    image:
      "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121&width=750",
    price: "1000",
    description: "Lucky Sunflower Plant",
  },
];

app.get("/health", getHealth);

app.post("/plant", postPlant);

app.get("/plants", getPlants);

app.get("/plant/:id", getPlantId);

app.put("/plant/:id", putPlantId);

app.delete("/plant/:id", deletePlantId);

app.use("*", handlePageNotFound404);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
