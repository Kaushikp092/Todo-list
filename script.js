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
        
        renderTask(newTask); // Render the new task on the UI

        todoInput.value = ""; // Clear the input field after adding the task

        console.log(tasks);

    });

    function renderTask(task) { //this function take local storage arr tasks and render on the ui
        const li = document.createElement('li');

        li.setAttribute('data-id', 'task.id'); // Setting a data attribute for the task ID

        if(task.completed) li.classList.add('completed'); // Adding completed class if the task is marked as completed

        li.innerHTML = ` 
        <span>${task.text}</span>
        <button>Delete</button> `; // const content = element.innerHTML;

        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON') return;

            task.completed = !task.completed; // Toggle the completed status

            li.classList.toggle('completed'); // Toggle the completed class on the list item

            saveTask(); // Save the updated tasks to local storage
        });


        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up to the li element

            tasks = tasks.filter(t => t.id !== task.id);

            saveTask(); // Save the updated tasks to local storage

            li.remove(); // Remove the task from the UI

        });// Deleting the task from the tasks array

        todoList.appendChild(li); // Appending the new task to the todo list
    }

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));// Saving tasks to local storage 
    }
});
