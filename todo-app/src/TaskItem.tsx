import React, { useCallback } from 'react';
import MyInput from './Input';

type TaskProps = {
  id: number;
  title: string;
  done: boolean;
};

type TaskItemProps = {
  task: TaskProps;
  editingTask: number | null;
  editedTask: string;
  handleChangeDone: (taskId: number) => void;
  handleEditTask: (taskId: number) => void;
  handleDeleteTask: (taskId: number) => void;
  handleSaveTask: (taskId: number) => void;
  setEditedTask: (value: string) => void;
  handlePersonalNumber: (task: TaskProps) => number;
};

const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({
    task,
    editingTask,
    editedTask,
    handleChangeDone,
    handleEditTask,
    handleDeleteTask,
    handleSaveTask,
    setEditedTask,
    handlePersonalNumber,
  }) => {
    const handleCheckboxChange = useCallback(() => {
      handleChangeDone(task.id);
    }, [handleChangeDone, task.id]);

    return (
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
              <MyInput
                checked={task.done}
                onChange={handleCheckboxChange}
                taskId={task.id}
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
    );
  },
);

export default TaskItem;
