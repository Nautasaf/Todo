import { useCallback, useMemo, useRef, useState } from 'react';
import './todo.css';
import TaskItem from './TaskItem';

type Task = {
  id: number;
  title: string;
  done: boolean;
};

type AddTaskProps = {
  inputNewTaskRef: React.RefObject<HTMLInputElement | null>;
  setTasks: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        title: string;
        done: boolean;
      }[]
    >
  >;
  tasks: Task[];
};

let idCounter = 0;

const generateId = () => {
  idCounter += 1;
  return idCounter;
};

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

const useHandleAddTask = ({
  inputNewTaskRef,
  setTasks,
  tasks,
}: AddTaskProps) => {
  return (e: React.FormEvent) => {
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
  };
};

function Todo() {
  const inputNewTaskRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState(() => generateInitialTasks());

  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState('');

  const handleChangeDone = useCallback((taskId: number) => {
    setTimeout(() => {
      setTasks((prevState) =>
        prevState.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task,
        ),
      );
    }, 10);
  }, []);

  const handlePersonalNumber = useCallback(
    (task: Task) => {
      return tasks.indexOf(task) + 1;
    },
    [tasks],
  );

  const handleAddTask = useHandleAddTask({ inputNewTaskRef, setTasks, tasks });
  // const handleAddTask = useCallback(
  //   (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const addTask = inputNewTaskRef.current?.value.trim();
  //     if (!addTask) return;

  //     const newTask = {
  //       id: generateId(),
  //       title: addTask,
  //       done: false,
  //     };

  //     setTasks([...tasks, newTask]);
  //     if (inputNewTaskRef.current) inputNewTaskRef.current.value = '';
  //   },
  //   [tasks],
  // );

  const handleDeleteTask = useCallback((taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

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
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, title: editedTask } : task,
        ),
      );

      setEditingTask(null);
      setEditedTask('');
    },
    [editedTask],
  );

  const taskElements = useMemo(() => {
    return tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        editingTask={editingTask}
        editedTask={editedTask}
        handleChangeDone={handleChangeDone}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleSaveTask={handleSaveTask}
        setEditedTask={setEditedTask}
        handlePersonalNumber={handlePersonalNumber}
      />
    ));
  }, [
    tasks,
    editingTask,
    editedTask,
    handlePersonalNumber,
    handleChangeDone,
    handleEditTask,
    handleDeleteTask,
    handleSaveTask,
  ]);

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

        <ul>{taskElements}</ul>
      </div>
    </>
  );
}

export default Todo;
