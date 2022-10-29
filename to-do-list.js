window.addEventListener("load",()=>{
    todos = JSON.parse(localStorage.getItem('todos'))||[];
    let nameInput = document.getElementById("name");
    const inputDiv = document.getElementById("input-div");
    const submitButton = document.getElementsByClassName("submitButton")[0];
    const newTask = document.getElementById("newTask");

    nameInput.addEventListener("focus",()=>{
        nameInput.parentElement.style.backgroundColor = "pink";
    })

    nameInput.addEventListener("blur",()=>{
        nameInput.parentElement.style.backgroundColor = "white";
    })

    newTask.addEventListener("focus",()=>{
        newTask.parentElement.style.backgroundColor = "pink";
        submitButton.style.backgroundColor = "lightskyblue";
    })

    newTask.addEventListener("blur",()=>{
        newTask.parentElement.style.backgroundColor = "white";
        submitButton.style.backgroundColor = "white";
    })

    nameInput.value = localStorage.getItem('username') || '';

    nameInput.addEventListener('change',e=>{
        localStorage.setItem('username',e.target.value);
    })

    submitButton.addEventListener("click",()=>{
        const date = new Date();

        const todotask = {
            content:newTask.value,
            date:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        }

        todos.push(todotask);

        localStorage.setItem('todos',JSON.stringify(todos));

        newTask.value="";

        TodosShow();
    })
    TodosShow();
})

function TodosShow(){
    const mainToDoList = document.getElementById("main-tasks-div");
    mainToDoList.innerHTML = "";
    todos.forEach(todo=>{
        const newtodo = document.createElement("div");


        newtodo.classList.add("todo-task");

        const content = document.createElement("input");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        content.setAttribute("type","text");
        content.value = todo.content;
        content.setAttribute("readonly","true");
        content.classList.add("content-task");

        editButton.classList.add("edit-button");
        editButton.innerHTML = "EDIT";

        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML="DELETE";

        newtodo.appendChild(content);
        newtodo.appendChild(editButton);
        newtodo.appendChild(deleteButton);

        mainToDoList.appendChild(newtodo);

        editButton.addEventListener("click",(e)=>{
            content.parentElement.style.backgroundColor = "pink";
            content.removeAttribute("readonly");
            content.focus();
            content.addEventListener("blur",(e)=>{
                content.parentElement.style.backgroundColor = "white";
                content.setAttribute("readonly","true");
                todo.content = e.target.value;
                localStorage.setItem('todos',JSON.stringify(todos));
                TodosShow();
            })

        })

        deleteButton.addEventListener("click",(e)=>{
            todos = todos.filter(t=>t!==todo);
            localStorage.setItem('todos',JSON.stringify(todos));
            TodosShow();
        })
    })
}