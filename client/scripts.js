const http = new coreHttp;

let List = [];

//selectors and listeners
const result = document.querySelector(".result");
const input = document.querySelector("#input-box");
const addBtn = document.querySelector(".add");
const delBtn = document.querySelector(".delete");

addBtn.addEventListener("click", httpPost);
delBtn.addEventListener("click", httpDelete);

//shows the list to the list
function ShowList() {
    let html = "<ul>";
    console.log(List);
    for (const itm of List) {
        html += `<li>${itm}</li>`;
    }
    html += "</ul>"
    result.innerHTML = html;
}

//gets list 
async function GetList() {
    try {
        const response = await http.get("http://localhost:8080/api");
        List = await response;
        ShowList();
      } catch (error) {
        console.error(error);
      } 
}

async function WriteTasks() {
    try {
        const res = await http.post("http://localhost:8080/api", List);
    } catch (error) {
        console.error(error);
    }
}

//post to the server/db
async function httpPost(e) {
    e.preventDefault();
    List.push(input.value);
    ShowList();
    await WriteTasks();
}

function httpDelete(e) {
    let index = List.indexOf(input.value);
    
    if(index !== -1) {
        List.splice(index, 1);
        ShowList();
        WriteTasks();
        return;
    } else {
        console.log("Item not found")
    }
}

// Loading functions
function Loading() {
    result.innerHTML = "Loading...";
}
  
async function main() {
    addBtn.disabled = true;
    delBtn.disabled = true;
    Loading();
  
    await GetList();
  
    addbtn.disabled = false;
    delBtn.disabled = false;
}
  
main();
//<button type="submit" class="delete"><box-icon name='trash-alt' type='solid' ></box-icon></button>