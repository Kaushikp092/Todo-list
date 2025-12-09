document.addEventListener("DOMContentLoaded", () => { // Ensures the DOM is fully loaded before running the script using DOMContentLoaded event
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieving tasks from local storage or initializing an empty array

    tasks.forEach(task => renderTask(task));// Rendering each task on the UI

    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim(); // Get the input value and trim whitespace && Grabing input value using todoinput
        if (taskText === "") return;// Prevent adding empty tasks && Nothing happens on empty input

        // if the task is there adding unqiue id 

        const newTask = {
            id: Date.now(), // Unique ID based on timestamp
            text: taskText,
            completed: false
        }

        tasks.push(newTask); // Add the new task to the tasks array
        saveTask();// Save tasks to local storage using localStorage api /* after adding new task to the local storage it's rewrite the whole array tasks*/
        todoInput.value = ""; // Clear the input field after adding the task
        console.log(tasks);

    });

    function renderTask(task) { //this function take local storage arr tasks and render on the ui
        console.log(task);
    }

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));// Saving tasks to local storage 
    }
});
