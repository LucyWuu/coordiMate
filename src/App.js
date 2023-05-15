import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

// structures of managing state
// - state gets passed down
// - actions gets passed up

function App() {
  // create app-level state for task list(global, instead of Tasks compoenent level)
  // - because we want to pass this state into other components
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // define getTasks
    const getTasks = async () => {
      // get data from backend
      const tasksFromServer = await fetchTasks();
      // set state
      setTasks(tasksFromServer);
    };

    // call fetchTasks
    getTasks();
    // the [] is where we can add dependencies for this func
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // fetch a single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // set state for whether you're adding new tasks
  // - false by default
  const [showAddTask, setShowAddTask] = useState(false);

  // add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      // convert our task, which is an js object, into JSON
      body: JSON.stringify(task),
    });

    // the data returned is just the new task being added
    const data = await res.json();

    setTasks([...tasks, data]);

    /* the code below only changes the UI, not backend
    // randomly assign an id to the task
    const id = Math.floor(Math.random() * 10000) + 1
    // create a new task with the id and everything copied from the task
    const newTask = {id, ...task}
    // reset the tasks to the original tasks array + the new task
    setTasks([...tasks, newTask])
    */
  };

  // delete task
  const deleteTask = async (id) => {
    // make delete request to backend
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // toggle reminder
  const toggleReminder = async (id) => {
    // get info of a specific task by id
    const taskToToggle = await fetchTask(id);
    // prep a new var of the new state of reminder
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    // make the PUT call
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    // get back the updated task object
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        // keep all the task properties, but change the reminder value
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {
                  // this is the shorthand for if showAddTask is true, do this, otherwise, do nothing
                  showAddTask && <AddTask onAdd={addTask} />
                }

                {
                  // if there is tasks, show task, else, show nothing
                  tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    "What's on your plate? Let your roommates know!"
                  )
                }
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
