//DOM element variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//TaskHandler Function
var createTaskHandler = function (event) { //pass event so that page doesn't refresh
    event.preventDefault(); //stops page from refreshing on submit
    
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give new div class name
    taskInfoEl.className = "task-info";
    //add HTML content to new div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl)

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    console.dir(listItemEl)
};

formEl.addEventListener("submit", createTaskHandler);


