import { useState, useEffect } from "react";

function Todo({ user, logout }) {

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem( "tasks_" + user.email);

    return savedTasks ? JSON.parse(savedTasks): [];

  });

  const [filter, setFilter] = useState("all");

  const [editIndex, setEditIndex] = useState(null);




  // SAVE USER TASKS

  useEffect(() => {

    localStorage.setItem(
      "tasks_" + user.email,
      JSON.stringify(tasks)
    );

  }, [tasks, user]);



  // ADD TASK
  function addTask() {

    if (task === "") {
      alert("Please enter a task");
      return;
    }

    const newTask = {

      name: task,

      date: date,

      completed: false

    };

    setTasks([...tasks, newTask]);

    setTask("");

    setDate("");
  }


  // DELETE TASK
  function deleteTask(index) {

    const newTasks = tasks.filter(
      (item, i) => i !== index
    );

    setTasks(newTasks);
  }


  // COMPLETE TASK
  function completeTask(index) {

    const newTasks = [...tasks];

    newTasks[index].completed =
      !newTasks[index].completed;

    setTasks(newTasks);
  }


  // EDIT TASK
  function editTask(index) {

    setTask(tasks[index].name);

    setDate(tasks[index].date);

    setEditIndex(index);
  }


  // UPDATE TASK
  function updateTask() {

    if (task === "") {
      alert("Please enter a task");
      return;
    }

    const newTasks = [...tasks];

    newTasks[editIndex].name = task;

    newTasks[editIndex].date = date;

    setTasks(newTasks);

    setTask("");

    setDate("");

    setEditIndex(null);
  }


  // FILTER
  function getFilteredTasks() {

    if (filter === "completed") {

      return tasks.filter(
        item => item.completed
      );

    }

    if (filter === "pending") {

      return tasks.filter(
        item => !item.completed
      );

    }

    return tasks;
  }


  const filteredTasks = getFilteredTasks();


  return (

    <div className="todo-page">

      {/* HEADER */}

      <header className="todo-header">

        <div className="logo">

          <span>👨🏻‍💻</span>

          TASK MANAGER

        </div>


        <div className="user-area">

          <div className="user-info">

            <div className="avatar">

              {user?.name?.charAt(0).toUpperCase()}

            </div>

            <div>

              <p>Welcome back</p>

              <h3>{user?.name}</h3>

            </div>

          </div>


          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* MAIN */}

      <main className="todo-main">


        {/* HERO */}

        <section className="welcome-section">

          <div>

            <p className="small-title">
              YOUR PRODUCTIVITY SPACE
            </p>

            <h1>
              Let's get things
              <span> done.</span>
            </h1>

            <p>
              Organize your tasks and make your day
              more productive.
            </p>

          </div>

        </section>


        {/* STATISTICS */}

        <div className="stats">


          <div className="stat-card">

            <div className="stat-icon">
              📋
            </div>

            <div>

              <h2>{tasks.length}</h2>

              <p>Total Tasks</p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ⏳
            </div>

            <div>

              <h2>
                {
                  tasks.filter(
                    item => !item.completed
                  ).length
                }
              </h2>

              <p>Pending</p>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>

              <h2>
                {
                  tasks.filter(
                    item => item.completed
                  ).length
                }
              </h2>

              <p>Completed</p>

            </div>

          </div>


        </div>


        {/* ADD TASK */}

        <section className="task-box">

          <div className="section-title">

            <div>

              <h2>
                {editIndex === null
                  ? "Create a new task"
                  : "Edit your task"}
              </h2>

              <p>
                Add something you want to accomplish.
              </p>

            </div>

          </div>


          <div className="task-input">

            <input
              type="text"
              placeholder="What do you need to do?"
              value={task}
              onChange={(e) =>
                setTask(e.target.value)
              }
            />


            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />


            {editIndex === null ? (

              <button
                className="add-btn"
                onClick={addTask}
              >
                + Add Task
              </button>

            ) : (

              <button
                className="add-btn"
                onClick={updateTask}
              >
                Update
              </button>

            )}

          </div>

        </section>


        {/* TASK SECTION */}

        <section className="tasks-section">


          <div className="tasks-header">

            <div>

              <h2>Your Tasks</h2>

              <p>
                Stay focused and complete your goals.
              </p>

            </div>


            <div className="filters">

              <button
                className={
                  filter === "all"
                    ? "active"
                    : ""
                }
                onClick={() => setFilter("all")}
              >
                All
              </button>


              <button
                className={
                  filter === "pending"
                    ? "active"
                    : ""
                }
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>


              <button
                className={
                  filter === "completed"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter("completed")
                }
              >
                Completed
              </button>

            </div>

          </div>


          {/* TASK LIST */}

          <div className="task-list">


            {filteredTasks.length === 0 ? (

              <div className="empty">

                <div className="empty-icon">
                  📝
                </div>

                <h3>No tasks yet</h3>

                <p>
                  Add your first task and start
                  being productive!
                </p>

              </div>

            ) : (

              filteredTasks.map((item) => {

                const realIndex =
                  tasks.indexOf(item);

                return (

                  <div
                    className={
                      item.completed
                        ? "task-card completed-task"
                        : "task-card"
                    }
                    key={realIndex}
                  >


                    <div className="task-check">

                      <button
                        onClick={() =>
                          completeTask(realIndex)
                        }
                      >
                        {item.completed
                          ? "✓"
                          : ""}
                      </button>

                    </div>


                    <div className="task-content">

                      <h3>
                        {item.name}
                      </h3>

                      {item.date && (

                        <p>
                          📅 {item.date}
                        </p>

                      )}

                      <span>
                        {item.completed
                          ? "Completed"
                          : "Pending"}
                      </span>

                    </div>


                    <div className="task-actions">

                      <button
                        onClick={() =>
                          editTask(realIndex)
                        }
                      >
                        ✏️
                      </button>


                      <button
                        onClick={() =>
                          deleteTask(realIndex)
                        }
                      >
                        🗑️
                      </button>

                    </div>


                  </div>

                );

              })

            )}

          </div>

        </section>


      </main>


      {/* FOOTER */}

      <footer>

        <p>
            MADE BY ADITYA RAJ ALOK || 
          Copyright &copy; 2026 TASK-MANAGAER . All rights reserved.
        </p>

      </footer>

    </div>

  );
}

export default Todo;