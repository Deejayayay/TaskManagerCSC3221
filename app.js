//modules
const express = require("express");
const connectDB = require("./connect.js");

//server
const app = express();

app.use(express.static("./Client"));
app.use(express.json());

//data model
const tasks = require("./task.js");
/*---------------------------------------*/
//routes for requests
app.get("/api/tasks", async (req,res) => {
    try {
        const task = await tasks.find();
        res.status(200).json({task});
    } catch {
        res.status(418).json({msg: error});
    }
});

//put request
app.put("/api/tasks/:name", async (req,res) => {
    try {
        const task = await tasks.findOne({name: req.params.name});
        if(!task) {
            return res.status(404).json({msg: "Task not found"});
        }

        if(req.body.completed === undefined) {
            return res.status(400).json({msg: "Missing 'completed' field in request body"});
        }
        
        task.completed = req.body.completed;
        await task.save();
        res.status(200).json({task});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: error});
    }
});


app.post("/api/tasks", async (req,res) => {
    console.log(req.body.name);
    const newTask = {
        name: req.body.name,
        completed: false
    };

    const newTasks = new tasks(newTask);
    try {
        const savedTask = await newTasks.save();
        res.status(200).json(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
});

app.delete("/api/tasks/:name", async (req,res) => {
    try {
        const task = await tasks.deleteOne({name: req.params.name});
        console.log(task);
        res.status(200).json({task});
    } catch (error) {
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
