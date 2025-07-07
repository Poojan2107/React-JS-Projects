  import { useEffect, useState } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { useForm } from "react-hook-form";
  import { v4 as uuidv4 } from "uuid";
  import { FaPencil, FaTrash, FaPlus, FaCheck, FaXmark } from "react-icons/fa6";
  import "./App.css";

  function App() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [todo, setTodo] = useState([]);
    const [todoId, setTodoId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    function handleTodo(data) {
      if (todoId == null) {
        data.id = uuidv4();
        data.completed = false;
        data.createdAt = new Date().toISOString();
        console.log(data);
        setTodo([...todo, data]);
      } else {
        const index = todo.findIndex((todos) => todos.id == todoId);
        const newTodo = [...todo];
        newTodo[index] = { ...newTodo[index], ...data };
        setTodo(newTodo);
        setIsEditing(false);
      }

      reset({
        toTitle: "",
        toDesc: "",
      });
      setTodoId(null);
    }

    useEffect(() => {
      if (todo.length > 0) {
        localStorage.setItem("todolist", JSON.stringify(todo));
      }
    }, [todo]);

    useEffect(() => {
      const saved = JSON.parse(localStorage.getItem("todolist"));
      console.log(saved);
      if (saved) {
        setTodo(saved);
      }
    }, []);

    function Trash(id) {
      if (confirm("Are you sure you want to delete this task?")) {
        const filterData = todo.filter((todos) => todos.id !== id);
        console.log("filterData ", filterData);
        setTodo(filterData);
      }
    }

    function Update(id) {
      setTodoId(id);
      setIsEditing(true);
      const UpdateData = todo.find((todos) => todos.id == id);
      console.log("UpdateData ", UpdateData);
      reset(UpdateData);
    }

    function toggleComplete(id) {
      const updatedTodo = todo.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      setTodo(updatedTodo);
    }

    function cancelEdit() {
      setIsEditing(false);
      setTodoId(null);
      reset({
        toTitle: "",
        toDesc: "",
      });
    }

    const completedTasks = todo.filter((item) => item.completed);
    const pendingTasks = todo.filter((item) => !item.completed);

    return (
      <div className="app-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              {/* Header */}
              <div className="text-center mb-5">
                <h1 className="app-title">
                  <FaCheck className="title-icon" />
                  TaskMaster
                </h1>
                <p className="app-subtitle">Organize your life, one task at a time</p>
              </div>

              {/* Form Card */}
              <div className="form-card">
                <div className="card shadow-lg border-0">
                  <div className="card-body p-4">
                    <h3 className="card-title text-center mb-4">
                      {isEditing ? "Edit Task" : "Add New Task"}
                    </h3>
                    <form onSubmit={handleSubmit(handleTodo)}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Task Title</label>
                        <input
                          type="text"
                          className={`form-control ${errors.toTitle ? 'is-invalid' : ''}`}
                          placeholder="Enter task title..."
                          {...register("toTitle", { required: "Title is required" })}
                        />
                        {errors.toTitle && (
                          <div className="invalid-feedback">{errors.toTitle.message}</div>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="form-label fw-bold">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Enter task description..."
                          {...register("toDesc")}
                        ></textarea>
                      </div>
                      <div className="d-flex gap-2 justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg px-4">
                          <FaPlus className="me-2" />
                          {isEditing ? "Update Task" : "Add Task"}
                        </button>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="btn btn-outline-secondary btn-lg px-4"
                          >
                            <FaXmark className="me-2" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="row mt-4 mb-4">
                <div className="col-6">
                  <div className="stat-card pending">
                    <div className="stat-number">{pendingTasks.length}</div>
                    <div className="stat-label">Pending</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-card completed">
                    <div className="stat-number">{completedTasks.length}</div>
                    <div className="stat-label">Completed</div>
                  </div>
                </div>
              </div>

              {/* Tasks List */}
              {todo.length > 0 ? (
                <div className="tasks-container">
                  {/* Pending Tasks */}
                  {pendingTasks.length > 0 && (
                    <div className="mb-4">
                      <h4 className="section-title">Pending Tasks</h4>
                      {pendingTasks.map((to) => (
                        <div key={to.id} className="task-card pending-task">
                          <div className="task-content">
                            <div className="task-checkbox">
                              <input
                                type="checkbox"
                                checked={to.completed}
                                onChange={() => toggleComplete(to.id)}
                                className="form-check-input"
                              />
                            </div>
                            <div className="task-details">
                              <h5 className="task-title">{to.toTitle}</h5>
                              {to.toDesc && <p className="task-description">{to.toDesc}</p>}
                              <small className="task-date">
                                Created: {new Date(to.createdAt).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                          <div className="task-actions">
                            <button
                              type="button"
                              onClick={() => Update(to.id)}
                              className="btn btn-outline-warning btn-sm"
                              title="Edit"
                            >
                              <FaPencil />
                            </button>
                            <button
                              type="button"
                              onClick={() => Trash(to.id)}
                              className="btn btn-outline-danger btn-sm"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Completed Tasks */}
                  {completedTasks.length > 0 && (
                    <div>
                      <h4 className="section-title">Completed Tasks</h4>
                      {completedTasks.map((to) => (
                        <div key={to.id} className="task-card completed-task">
                          <div className="task-content">
                            <div className="task-checkbox">
                              <input
                                type="checkbox"
                                checked={to.completed}
                                onChange={() => toggleComplete(to.id)}
                                className="form-check-input"
                              />
                            </div>
                            <div className="task-details">
                              <h5 className="task-title completed">{to.toTitle}</h5>
                              {to.toDesc && <p className="task-description completed">{to.toDesc}</p>}
                              <small className="task-date">
                                Created: {new Date(to.createdAt).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                          <div className="task-actions">
                            <button
                              type="button"
                              onClick={() => Trash(to.id)}
                              className="btn btn-outline-danger btn-sm"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="text-center py-5">
                    <FaCheck className="empty-icon" />
                    <h4 className="mt-3">No tasks yet!</h4>
                    <p className="text-muted">Add your first task to get started.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default App;