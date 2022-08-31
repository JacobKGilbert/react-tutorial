import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';

const toggleChecked =
  async ({ _id, isChecked }) => {
    await TasksCollection.updateAsync(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };

const deleteTask =
  async ({ _id }) => TasksCollection.removeAsync(_id);

export const App = () => {
  const tasks = useTracker(async () =>
    await TasksCollection.find({}, { sort: { createdAt: -1 } }).fetchAsync()
  );


  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <ul className="tasks">
          {tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
