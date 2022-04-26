import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js'
import deleteIcon from './deleteIcon.js';
import { displayTasks} from './readTasks.js'; 

  export const addTask = (event)=>{
  event.preventDefault();  

  const list = document.querySelector('[data-list]');
  const input = document.querySelector('[data-form-input]');
  const calendar = document.querySelector('[data-form-date]');

  const value = input.value;
  const date = calendar.value;  
  const dateFormat = moment(date).format('DD/MM/YYYY');

  if( value === '' || date === ''){
    return; 
  };
  
  input.value = '';
  calendar.value = '';

  const complete = false;

  const taskObj={
    value,
    dateFormat,
    complete,
    id: uuid.v4()
  };

  list.innerHTML = '';
  
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(taskList));

  displayTasks();
 
};
  
    
  export const createTask = ({value, dateFormat, complete, id}) => {
  const task = document.createElement('li');
        task.classList.add('card');

  const taskContent = document.createElement('div');
  
  const check = checkComplete(id);
  
  if(complete){
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  };

  const titleTask = document.createElement('span');
      titleTask.classList.add('task');
      titleTask.innerText = value;
      taskContent.appendChild(check);
      taskContent.appendChild(titleTask);  

  const dateElement = document.createElement('span');
      dateElement.innerHTML = dateFormat;
      task.appendChild(taskContent);
      task.appendChild(dateElement);
      task.appendChild(deleteIcon(id));
    
  return task;
    
  };

/*

Persistencia con objeto JSON; 

1) Primero debemos crar la constante;   

2) Segundo, procedemos a la creación del JSON;

a) Método sessionStorage: la información SOLO persiste mientras la pestaña del navegador 
esta abierta. Una vez cerrada la información se perderá;

b) Método localStorage: los datos persisten aun cuando se cierre la pestaña activa;
    
*/

