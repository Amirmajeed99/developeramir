//DEFINE UI VARIABLES
const form = document.querySelector('form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//LOAD ALL EVENT LISTENERS
loadEventListeners();

//LOAD ALL EVENT LISTENERS
function loadEventListeners() {
    //DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded',getTasks);
    //ADD TASK EVENT
    form.addEventListener('submit', addTask);
    //REMOVE TASK EVENT
    taskList.addEventListener('click', removeTask);
    //CLEAR TASK EVENT
    clearBtn.addEventListener('click',clearTasks);
    //FILTER TASK EVENT
    filter.addEventListener('keyup',filterTasks);

}

//GET TASKS FROM LOCAL STORAGE
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(task){
            //creat DOM element

            //CREAT LI ELEMENT
    const li = document.createElement('li');
    //add class name
    li.className = 'collection-item';
    //creat text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a')
    //add class name
    link.className = 'delete-item secondary-content';
    link.style.cursor = 'pointer';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li;
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    //console.log(taskList);

        })
    }
}

// ADD TASK
function addTask(e) {

    if (taskInput.value === '') {
        alert('add a task');
    }

    //CREAT LI ELEMENT
    const li = document.createElement('li');
    //add class name
    li.className = 'collection-item';
    //creat text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    li.style.height='40px';
    //create new link element
    const link = document.createElement('a')
    //add class name
    link.className = 'delete-item secondary-content';
    link.style.cursor = 'pointer';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li;
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    //console.log(taskList);

    //STORE IN LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);

    //clear the value
    taskInput.value = '';



    e.preventDefault();
}

//STORE TASK
function storeTaskInLocalStorage(task){
 let tasks;
 if(localStorage.getItem('tasks')===null){
     tasks=[];
 }else{
     tasks=JSON.parse(localStorage.getItem('tasks'));
 }
 tasks.push(task);
 localStorage.setItem('tasks', JSON.stringify(tasks));
}

//REMOVE TASK
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        //console.log(e.target);
        if (confirm('Are you sure you want to remove this item')) {
            e.target.parentElement.parentElement.remove();

            //REMOVE FROM LOCAL STORAGE
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//REMOVE FROM LOCALSTORAGE
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
      if(taskItem.textContent===task){
          tasks.splice(index,1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//CLEAR TASKS
function clearTasks(){
// console.log('you clicked on clear tasks btn');
if(confirm('Are you sure you want to clear all tasks')){
    // taskList.innerHTML='';one way to do
    //through loop which is faster than above
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
}
//CLEAR TASK FROM LOCAL STORAGE
clearTasksFromLocalStorage();
}

//CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//FILTER TASKS
function filterTasks(e){
const text=e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
        task.style.display='block';
    }
    else{
        task.style.display='none';
    }
})
}