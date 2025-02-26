import { useState } from "react";
import './todo.css'

type Task = {
	id: number,
	title: string,
	done: boolean
}

function Todo() {
	const initialTasks = [
		{id: 1, title: 'Помыть машину', done: false},
		{id: 2, title: 'Сходить за водой', done: true},
		{id: 3, title: 'Сделать эксельку по проектированию', done: false},
		{id: 4, title: 'Сходить в мфц', done: true},
		{id: 5, title: 'Получить справку по состоянию здоровья', done: true},
		{id: 6, title: 'Оформить стипендию', done: false},
		{id: 7, title: 'Подписать все профбилеты', done: false},
	];

	const [tasks, setTasks] = useState(initialTasks);
	const [addTask, setAddTask] = useState('')

	const [editingTask, setEditingTask] = useState<number | null>(null);
	const [editedTask, setEditedTask] = useState('');

	const handleChangeDone = (taskId: number) => {
		setTasks(tasks.map(task => 
			task.id === taskId ? {...task, done: !task.done} : task
		))
	}

	const handleAddTask = (e: React.FormEvent) => {
		e.preventDefault();
		if (addTask === '') return;
		
		const newTask = {
			id: tasks.length + 1,
			title: addTask,
			done: false
		}

		setTasks([...tasks, newTask]);
		setAddTask('');
	}

	const handleDeleteTask = (taskId: number) => {
		setTasks(tasks.filter((task) => task.id !== taskId))
	}

	const handlePersonalNumber = (task: Task) => {
		return tasks.indexOf(task) + 1
	} 

	const handleEditTask = (taskId: number) => {
		const changingTask = tasks.find((task) => task.id === taskId);
		
		if (!changingTask) return
		setEditedTask(changingTask.title)
		setEditingTask(taskId)
	}

	const handleSaveTask = (taskId: number) => {
		if (!editedTask) return;
		const changingTask = tasks.find((task) => task.id === taskId);
		if (!changingTask) return
		const taskIndex = tasks.indexOf(changingTask);

		tasks[taskIndex].title = editedTask;
		setEditingTask(null);
		setEditedTask('')
	}

	return (
		<>
			<div className="todoContainer">
				<h2>Ваши дела</h2>
				<form className="addTaskForm" onSubmit={handleAddTask}>
					<input className="addTaskInput" placeholder="Добавить дело" value={addTask} onChange={(event) => setAddTask(event.target.value)} />
					<button className="addTaskBtn" type="submit">Добавить</button>
				</form>
				
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							<div className="idDiv">{handlePersonalNumber(task)}</div>
							{editingTask !== task.id ? (
								<>
									<div className="titleDiv">{task.title}</div>
									<div className="doneDiv"><input className="checkbox" type="checkbox" checked={task.done} onChange={() => handleChangeDone(task.id)} /></div>
									<div className="editDiv"><button className="editBtn" onClick={() => handleEditTask(task.id)}>Изменить</button></div>
									<div className="deleteDiv"><button className="deleteBtn" onClick={() => handleDeleteTask(task.id)}>Удалить</button></div>
								</>
							) : (
								<>
									<div className="titleDiv"><input className="editInput" type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)}/></div>
									<div className="editDiv"><button className="editBtn" onClick={() => handleSaveTask(task.id)}>Сохранить</button></div>
									<div className="deleteDiv"><button className="deleteBtn" onClick={() => handleDeleteTask(task.id)}>Удалить</button></div>
								</>
								
							)} 
							
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default Todo