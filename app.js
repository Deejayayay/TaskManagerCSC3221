//3rd party modules
const express = require("express");
const app = express();
//custom module
const fm = require("./filemgr");

//express http server


app.use(express.static("./Client"));
app.use(express.json());

/*---------------------------------------*/
//routes for requests
app.get("/", async (req,res) => {
    const data = await fm.ReadData();
    console.log(data);
    res.json(data)
});

app.post("/", async (req,res) => {
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

