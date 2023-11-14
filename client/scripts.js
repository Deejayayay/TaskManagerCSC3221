const http = new coreHTTP;

let List = [];

//selectors and listeners
const result = document.querySelector(".result");
const input = document.getElementById("input-box");
const addBtn = document.getElementById("add");

addBtn.addEventListener("click", httpPost);

function ShowList() {
    let html = `<ul class="list">`;
    console.log(List);
    for (const itm of List) {
        console.log(itm)
        html += `<li class="itm">${itm.name}

        <button type="submit" class="done" onclick="finishTask()">
            <box-icon name='checkbox' ></box-icon>
        </button>

        <button type="submit" class="del" onclick="httpDelete()">
            <box-icon name='trash' type='solid'></box-icon>
        </button>
        
        </li>`;
    }
    html += "</ul>";
    
    result.innerHTML = html;
}


//gets list 
async function GetList() {
    try {
        const response = await http.get("http://localhost:8080/api/tasks");
        List = await response.task;
        ShowList();
      } catch (error) {
        console.log(error);
      } 
}

async function WriteTasks() {
    try {
        const res = await http.post("http://localhost:8080/api/tasks", List);
    } catch (error) {
        console.log(error);
    }
}

//post to the server/db
async function httpPost(e) {
    e.preventDefault();
    List.push(input.value);
    ShowList();
    await WriteTasks();
}

function httpDelete(e,index) { 
    let i = document.getElementById(index);
    console.log('delete index:' + index);
    List.splice (i,1);
    ShowList();
    WriteTasks();
}

//change check box
function finishTask() {

}
  
async function main(){
    await GetList();
}

main();