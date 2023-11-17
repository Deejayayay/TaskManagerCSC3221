const http = new coreHTTP;

let List = [];

//selectors and listeners
const result = document.querySelector(".result");
const input = document.getElementById("input-box");
const addBtn = document.getElementById("add");

addBtn.addEventListener("click", httpPost);

function ShowList() {
    let html = `<ul class="list">`;
    for (const itm of List) {
        let i = List.indexOf(itm);
        if(itm.completed) {
            html += `
            <li id="item${i}" class="itm-done" name="">
                <button id="CHECKBOX${i}" type="submit" class="done" onclick="finishTask(${i})">
                    <box-icon name='checkbox-checked' type='solid' ></box-icon>
                </button>
            <div id="edit${i}">
                <span id="task${i}" 
                class="editable" 
                ondblclick="editTask(${i})"
                >${itm.name}
                </span>
            </div>
                <button type="submit" class="del" onclick="httpDelete(${i})">
                    <box-icon name='x'></box-icon>
                </button>
            </li>`;
        } else {
            html += `
            <li id="item${i}" class="itm" name="">
                <button id="CHECKBOX${i}" type="submit" class="done" onclick="finishTask(${i})">
                    <box-icon name='checkbox' ></box-icon>
                </button>
            <div id="edit${i}">
                <span id="task${i}"
                class="editable" 
                ondblclick="editTask(${i})"
                >${itm.name}</span>
            </div>
                <button type="submit" class="del" onclick="httpDelete(${i})">
                    <box-icon name='x'></box-icon>
                </button>
            </li>`;
        }
    }
    html += "</ul>";
    
    result.innerHTML = html;
}

//gets list 
async function GetList() {
    try {
        const response = await http.get("http://localhost:8080/api/tasks");
        List = response.task;
        console.log(List);
        ShowList();
      } catch (error) {
        console.log(error);
      } 
}

//post to the server/db
async function httpPost() {
    try {
        console.log(input.value);
        const newData = {
            name: input.value,
            completed: false
        };
        
        console.log(newData);
        const res = await http.post("http://localhost:8080/api/tasks", newData);
        res.task = newData;
        GetList();
        ShowList();
    } catch (error) {
        console.log(error);
    }
}

async function httpDelete(index) { 
    try {
        const res = await http.delete("http://localhost:8080/api/tasks/" + List[index].name);
        GetList();
        ShowList();
    } catch (error) {
        console.log(error);
    }
}

//change check box
async function finishTask(index) {
    try {
        const button = document.getElementById(`CHECKBOX${index}`);
        const item = document.getElementById(`item${index}`);

        const task = List[index];
        const completed = !task.completed;

        const res = await http.put(`http://localhost:8080/api/tasks/${task.name}`, {
            name: task.name,
            completed: completed
        });

        task.completed = completed;

        button.checked = completed;

        if (completed) {
            button.innerHTML = "<box-icon name='checkbox-checked' type='solid' ></box-icon>";
            item.classList.add("itm-done");
            console.log(`Task completed: ${task.name} CompletedStatus: ${task.completed}`);
        } else {
            button.innerHTML = "<box-icon name='checkbox' ></box-icon>";
            item.classList.remove("itm-done");
            item.classList.add("itm");
            console.log(`Task uncompleted: ${task.name} CompletedStatus: ${task.completed}`);
        }
    } catch (error) {
        console.log(error);
    }
    
}
  

async function editTask(index){
    try {
        const task = List[index];
        const edit = document.getElementById(`edit${index}`);
        const currentName = edit.textContent.trim();
        edit.innerHTML = `<input type="text" class="editable" id="taskNew${index}" value="${currentName}"/>`;
        const input = document.getElementById(`taskNew${index}`);
        input.focus();
        input.addEventListener("keyup", async function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                const newName = input.value;
                const res = await http.put(`http://localhost:8080/api/tasks/${task.name}`, {
                    name: newName,
                    completed: task.completed
                });
                console.log(task.name);
                console.log(res);
                
                console.log(input.value);
                console.log(task.name);
                task.name = newName;
                edit.innerHTML = `<span id="task${index}" class="editable" ondblclick="editTask(${index})">${task.name}</span>`;
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function main(){
    await GetList();
}

main();