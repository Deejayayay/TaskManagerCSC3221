//modules
const express = require("express");
const connectDB = require("./connect");

//server
const app = express();

app.use(express.static("./Client"));
app.use(express.json());

//data model
const tasks = require("./task");
const task = require("./task");
/*---------------------------------------*/
//routes for requests
app.get("/api/tasks", async (req,res) => {
    try {
        const task = await tasks.find();
        res.status(200).json({task});
    } catch {
        res.status(500).json({msg: error});
    }
});

app.put("/api/tasks", async (req,res) => {
    try {
        const targetTask = await tasks.find({name: req.params.name});
        if(targetTask === null) {
            throw error;
        }

        const retData = await tasks.updateOne({name: req.params.name}, {$set:{
            name: req.body.name, completed: req.body.completed}
        });

        res.status(200).json({retData});
    } catch (error) {
        res.status(418).json({msg: error});
    }
})

app.post("/api/tasks", async (req,res) => {
    try {
        const tasksExists = await tasks.findOne({name: req.body.name});
        if(tasksExists){
            throw error;
        }

        let taskData = {
            name: req.body.name,
            completed: req.body.completed
        };

        const retData = await tasks.create(taskData);
        res.status(200).json({retData});
    } catch (error) {
        res.status(418).json({msg: error});
    }
});

app.delete("/api/tasks", async (req,res) => {
    try {
        const task = await task.deleteOne({name: req.params.name});
        res.status(200).json({task});
    } catch {
        res.status(418).json({msg: error});
    }
});
/*---------------------------------------*/

//create server
const appName = "Task List";
const port = 8080;

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`${appName} is listening on port ${port}.`)
        });
    } catch (error) {
        console.log(error)
    }
}

start();
