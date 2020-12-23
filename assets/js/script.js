//DOM element variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//TaskHandler Function
var createTaskHandler = function (event) { //pass event so that page doesn't refresh
    event.preventDefault(); //stops page from refreshing on submit
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
    console.log(event);

}

formEl.addEventListener("submit", createTaskHandler);


