//DOM element variables
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content")
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var tasks = [];

//TASK FORM HANDLER 
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

    var isEdit = formEl.hasAttribute("data-task-id");
    //console.log(isEdit);

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);//calls completedEditTask() only if isEdit is true
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = { // package up data as an object --> easier to create object instead of passing two parameters so just in case of future add-on properties. 
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

        createTaskEl(taskDataObj); //calls createTaskEl() only if isEdit is false, if user is not in edit mode
    }
};

//CREATE TASK FUNCTION 
var createTaskEl = function (taskDataObj) { //holds code that creates a new task HTML element, with both task title and type
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create and set id as a custom attribute for each new list item created with the value derived from taskIDCounter
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true"); //adds dragable attribute to task

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    //give new div class name
    taskInfoEl.className = "task-info";
    //add HTML content to new div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl)

    var taskActionsEl = createTaskActions(taskIdCounter);//to store createTaskactions() DOM element in variable createTaskACtions()

    listItemEl.appendChild(taskActionsEl);

    taskDataObj.id = taskIdCounter;//add task object id value to taskDataObj variable argument

    tasks.push(taskDataObj);//add taskDaraObj to end of task array as means to store

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

//CREATE TASK ACTIONS FUNCTION
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

//TASK DELETE/EDIT BUTTON HANDLER 
var taskButtonHandler = function (event) {//passing the event object
    //get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//DELETE TASK FUNCTION
var deleteTask = function (taskId) {
    //console.log("delete task #" + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
};

//EDIT TASK FUNCTION
var editTask = function (taskId) {
    //console.log("editing task #" + taskId);
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //console.log(taskName);
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //console.log(taskType);
    document.querySelector("select[name='task-type']").value = taskType;

    //changes add task button text to save task text when in edit Mode
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);//set attribute so we can reference to save correct task
};

//COMPLETE TASK FUNCTION
var completeEditTask = function (taskName, taskType, taskId) {
    //console.log(taskName, taskType, taskId);

    // find the matching task list item. to update selectd item instead of creting new updated item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {//check if individual tasks id property matches taskId argument that's passed thru completeEditTask. Covert to interger
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");//remove the attribute to allow user to create new tasks and edit tasks
    document.querySelector("#save-task").textContent = "Add Task";
};

//TASK STATUS CHANGE HANDLER
var taskStatusChangeHandler = function (event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
};

//TASK DRAG START HANDLER
var dragTaskHandler = function (event) {
    var taskId = event.target.getAttribute("data-task-id");
    //console.log("Task ID:", taskId);
    event.dataTransfer.setData("text/plain", taskId);//this will store the taskID in the dataTransfer property
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
}

//TASK DROP ZONE HANDLER
var dropZoneDragHandler = function (event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        //styling attribute to highlight drop zone when list item is dragged over
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
};
//TASK DROP HANDLER
var dropTaskHandler = function (event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    //console.log(draggableElement);
    //console.dir(draggableElement);
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;

    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.removeAttribute("style");//removes attribute styling of drop zone when list item is dropped
    dropZoneEl.appendChild(draggableElement);//apend draggableElement to new parent dropZoneEl

    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }
};

//EVENT HANDLER FOR LEAVING DRAG EVENT (DRAG OVER STATE)
var dragLeaveHandler = function (event) {
    var taskListEl = event.target.closest(".task-list");//if closest() returns null, the selector was not found in the target element or ancestor, and style attribute will not be removed
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
}

//EVENT LISTENER for LEAVING DRAG EVENT
pageContentEl.addEventListener("dragleave", dragLeaveHandler);

//EVENT LISTENER for SUBMIT TASK BTN
formEl.addEventListener("submit", taskFormHandler);

//EVENT LISTENER for DELETE BTN
pageContentEl.addEventListener("click", taskButtonHandler);

//EVENT LISTENER for CHANGE STATUS
pageContentEl.addEventListener("change", taskStatusChangeHandler);

//EVENT LISTENERS for TAKS DRAG START, DRAG OVER, DROP
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);//no parantheses so it's not called immediately,ONLY when listening event occurs
pageContentEl.addEventListener("drop", dropTaskHandler);