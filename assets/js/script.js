//DOM element variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//TaskHandler Function
var taskFormHandler = function (event) { //pass event so that page doesn't refresh
    event.preventDefault(); //stops page from refreshing on submit
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object --> easier to create object instead of passing two parameters so just in case of future add-on properties. 
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

}
//function to hold code that creates a new task HTML element, with both task title and type
var createTaskEl = function (taskDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give new div class name
    taskInfoEl.className = "task-info";
    //add HTML content to new div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; 

    listItemEl.appendChild(taskInfoEl)

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    //console.dir(listItemEl)
}

//Event Listerner for submit button
formEl.addEventListener("submit", taskFormHandler);


