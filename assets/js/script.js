//DOM element variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

//TaskHandler Function
var taskFormHandler = function (event) { //pass event so that page doesn't refresh
    event.preventDefault(); //stops page from refreshing on submit
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();

    // package up data as an object --> easier to create object instead of passing two parameters so just in case of future add-on properties. 
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

};

//function to hold code that creates a new task HTML element, with both task title and type
var createTaskEl = function (taskDataObj) {
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create and set id as a custom attribute for each new list item created with the value derived from taskIDCounter
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give new div class name
    taskInfoEl.className = "task-info";
    //add HTML content to new div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" +
        taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl)

    var taskActionsEl = createTaskActions(taskIdCounter);//to store createTaskactions() DOM element in variable createTaskACtions()
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);


    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];//array so as to add more choices late if needed
    for (var i = 0; i < statusChoices.length; i++) {//if 0 is < the legth of array statusChoices, add 1 to 0
        var statusOptionEl = document.createElement("option");// create option element
        statusOptionEl.textContent = statusChoices[i]; //option text content is set to chosen item [i] in array statusChoices
        statusOptionEl.setAttribute("value", statusChoices[i]);//set attribute "value" to equal the value of the selected [i] item from array statusChoice

        // append option to select element
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

//Event Listerner for submit button
formEl.addEventListener("submit", taskFormHandler);

