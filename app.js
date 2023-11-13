//3rd party modules
const express = require("express");
//server
const app = express();
//custom module
const fm = require("./filemgr");

app.use(express.static("./Client"));
app.use(express.json());

/*---------------------------------------*/
//routes for requests
app.get("/api", async (req,res) => {
    const data = await fm.ReadData();
    console.log(data);
    res.json(data)
});

app.post("/api", async (req,res) => {
    await fm.WriteData(req.body);
    res.send();
});
/*---------------------------------------*/

//error
app.all("*", (req,res) => {
    res.status(404).send("<h1>Page Not Found...</h1>");
  });

/*---------------------------------------*/
//create server
const appName = "Task List";
const port = 8080;
app.listen(port, () => {
    console.log(`App ${appName} is running on port ${port}`);
});

