import { useState, useRef, useEffect } from 'react';
const ToDoList = () => {
	const rTask = useRef();
	const [tasks, setTasks] = useState([]);	
	const [newTask, setNewTask] = useState({
		title: "",
		description: "",
		priority: "medium",
		completed: false,
	});

	const handleNewTaskChange = (event) => {
		const {name, value} = event.target;	
		
		setNewTask({
			...newTask,
			[name]: value,
		});
		
	}

	const handleAddTask = (event) => {
		event.preventDefault();
		setTasks(t=> [...t, newTask]);
		alert("Task details added successfully");
		setNewTask({
			title: "",
			description: "",
			priority: "medium",
			completed: false,

		});

		rTask.current.focus();

	}
	
	useEffect(()=>rTask.current.focus(),[]);

	const handleDeleteTask = (index) => {
		const updatedTasks = tasks.filter((_, i) => i!==index);
		setTasks(updatedTasks);
		alert('Task delete successfully!!!');
	}

	const handleToggleButton = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks[index].completed = ! updatedTasks[index].completed;
		setTasks(updatedTasks);
	
	}
	
	const handleUpdateTask = (index, updatedTask) => {
		const update = [...tasks];
		update[index] = updatedTask;
		setTasks(update);
		alert("task updated successfully");
	}

	const moveTaskUp = (index) => {
		if(index > 0) {
			let updatedTasks = [...tasks];
			[updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
			setTasks(updatedTasks);
		}

	}

	const moveTaskDown = (index) => {
		if(index < tasks.length - 1){
			let updatedTasks = [...tasks];
			[updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]]
			setTasks(updatedTasks);
		}
			

	}
	return(
		<>
			<center>
				<h1>
					To do list application
				</h1>
				<form onSubmit = {handleAddTask}>
					<input className = "task-title" type = "text" placeholder = "Enter your task for today" 
						name="title" value={newTask.title} onChange = {handleNewTaskChange} ref={rTask}		/>
					<textarea className = "task-desc" rows = {10} cols={50} placeholder = "Enter the description 						for your task" name="description" value={newTask.description} onChange = {handleNewTaskChange}	/>
					<select className="drop-down-list" name="priority" value={newTask.priority} onChange = {handleNewTaskChange}	>
						<option name="high">High</option>
						<option name="medium">Medium</option>
						<option name="low">Low</option>

					</select>
					<button className='add-button' type="submit">Add task</button>

				</form>

				<ul>
					{
						tasks.map((task, index)=>(
							<li key={index}>
								<h2 style={
									{textDecoration: task.completed ? "line-through" : "none"}

								}>{task.title}</h2>
								<p><span>{task.description}</span></p>
								<h4><span>{task.priority}</span></h4>
								<div className='btn-container'>
									<button className="toggle-btn" onClick={()=>handleToggleButton(index)}>{task.completed ? 'Mark as Incomplete':'Mark as complete'}</button>			
									<button onClick = {()=>{
										if(window.confirm('Are you sure???'))
											handleDeleteTask(index);
									}} className="delete-button">Delete</button>
									<button onClick = {()=>{
										let updatedTask = prompt('Enter the title'); 
										if(updatedTask){
											handleUpdateTask(index, {
												...task,
												title: updatedTask,
											})

										}
			
							}} className="edit-button">Edit</button>

									<button onClick={()=>moveTaskUp(index)} className="up-button">⬆️</button>
									<button onClick={()=>moveTaskDown(index)} className="down-button">⬇️</button>
								</div>
							</li>	
							
						))
		

					}

				</ul>

			</center>
		</>
	);

}

export default ToDoList;