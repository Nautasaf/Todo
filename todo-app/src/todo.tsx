import { useCallback, useRef, useState } from 'react';
import './todo.css';

type Task = {
  id: number;
  title: string;
  done: boolean;
};

let idCounter = 0;

const generateId = () => {
  idCounter += 1;
  return idCounter;
};

function Todo() {
  const inputNewTaskRef = useRef<HTMLInputElement>(null);

  const generateInitialTasks = () => {
    // 1. как часто будут генерироваться задачи?
    const initialTasks = [
      { id: generateId(), title: 'Помыть машину', done: false },
      { id: generateId(), title: 'Сходить за водой', done: true },
      {
        id: generateId(),
        title: 'Сделать эксельку по проектированию',
        done: false,
      },
      { id: generateId(), title: 'Сходить в мфц', done: true },
      {
        id: generateId(),
        title: 'Получить справку по состоянию здоровья',
        done: true,
      },
      { id: generateId(), title: 'Оформить стипендию', done: false },
      { id: generateId(), title: 'Подписать все профбилеты', done: false },
    ];
    return initialTasks;
  };

  const [tasks, setTasks] = useState(generateInitialTasks);

  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState('');

  const handleChangeDone = useCallback(
    (taskId: number) => {
      // Локально меняем состояние дела
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task,
        ),
      );
      // 2. на каждый Change Done асинхроно обращаемся к серверу
      // сымитируем это с помощью setTimeout
      setTimeout(() => {
        // Тогда операции в БД будем прописывать тут
      }, 1000);
    },
    [tasks],
  );

  const handlePersonalNumber = (task: Task) => {
    return tasks.indexOf(task) + 1;
  };

  const handleAddTask = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const addTask = inputNewTaskRef.current?.value.trim();
      if (!addTask) return;

      const newTask = {
        id: generateId(),
        title: addTask,
        done: false,
      };

      setTasks([...tasks, newTask]);
      if (inputNewTaskRef.current) inputNewTaskRef.current.value = '';
    },
    [tasks],
  );

  const handleDeleteTask = useCallback(
    (taskId: number) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks],
  );

  const handleEditTask = useCallback(
    (taskId: number) => {
      const changingTask = tasks.find((task) => task.id === taskId);

      if (!changingTask) return;
      setEditedTask(changingTask.title);
      setEditingTask(taskId);
    },
    [tasks],
  );

  const handleSaveTask = useCallback(
    (taskId: number) => {
      if (!editedTask) return;
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, title: editedTask } : task,
        ),
      );

      setEditingTask(null);
      setEditedTask('');
    },
    [editedTask, tasks],
  );

  console.log(tasks);

  return (
    <>
      <div className="todoContainer">
        <h2>Ваши дела</h2>
        <form className="addTaskForm" onSubmit={handleAddTask}>
          <input
            className="addTaskInput"
            placeholder="Добавить дело"
            ref={inputNewTaskRef}
          />
          <button className="addTaskBtn" type="submit">
            Добавить
          </button>
        </form>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div className="idDiv">{handlePersonalNumber(task)}</div>
              {editingTask !== task.id ? (
                <>
                  {task.done ? (
                    <div className="titleDiv checked">{task.title}</div>
                  ) : (
                    <div className="titleDiv">{task.title}</div>
                  )}
                  <div className="doneDiv">
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={task.done}
                      onChange={() => handleChangeDone(task.id)}
                    />
                  </div>
                  <div className="editDiv">
                    <button
                      className="editBtn"
                      onClick={() => handleEditTask(task.id)}
                    >
                      Изменить
                    </button>
                  </div>
                  <div className="deleteDiv">
                    <button
                      className="deleteBtn"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="titleDiv">
                    <input
                      className="editInput"
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                    />
                  </div>
                  <div className="editDiv">
                    <button
                      className="editBtn"
                      onClick={() => handleSaveTask(task.id)}
                    >
                      Сохранить
                    </button>
                  </div>
                  <div className="deleteDiv">
                    <button
                      className="deleteBtn"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
