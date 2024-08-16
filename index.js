import express from "express";

const app = express();
app.use(express.json());

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
];

app.post("/plant", (req, res) => {
  const { name, category, image, price, description } = req.body;

  if (!name) {
    return res.json({
      sucess: false,
      data: null,
      message: "name cannot be empty",
    });
  }

  if (!category) {
    res.json({
      sucess: false,
      data: null,
      message: "category cannot be empty",
    });
  }

  if (!image) {
    res.json({
      sucess: false,
      data: null,
      message: "image cannot be empty",
    });
  }

  if (!price) {
    res.json({
      sucess: false,
      data: null,
      message: "price cannot be empty",
    });
  }

  if (!description) {
    res.json({
      sucess: false,
      data: null,
      message: "description cannot be empty",
    });
  }

  const randomId = Math.round(Math.random() * 1000);

  const newPlant = {
    id: randomId,
    name: name,
    category: category,
    image: image,
    price: price,
    description: description,
  };

  plants.push(newPlant);

  res.json({
    success: true,
    data: newPlant,
    message: "new plant added successfully.",
  });
});

app.get("/plants", (req, res) => {
  res.json({
    sucess: true,
    data: plants,
    message: "All plnts fetched sucessfully",
  });
});

app.put("/plant/:id", (req, res) => {
  const { name, category, image, price, description } = req.body;
  const { id } = req.params;

  let index = -1;

  plants.forEach((plant, i) => {
    if (plant.id == id) {
      index = i;
    }
  });

  const newObj = {
    id,
    name,
    category,
    image,
    price,
    description,
  };

  if (index == -1) {
    res.json({
      sucess: false,
      data: null,
      message: `plant not found for id ${id}`,
    });
  } else {
    plants[index] = newObj;

    res.json({
      sucess: true,
      data: newObj,
      message: `plant updated successfully`,
    });
  }
});

app.delete("/plant/:id",(req,res)=>{
  const {id}= req.params

  let index=-1

  plants.forEach((plant,i)=>{
  if(plant.id==id){
    index= i
  }
  })

  if(index==-1){
  res.json({
    success:false,
    messsage:`Plant not found id ${id}`,
    data:null
  })
}

plants.splice(index,1)

  res.json({
    success:true,
    messsage:`Plant deleted successfully`,
    data:null
  })
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
