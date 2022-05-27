import { useEffect, useState } from "react";
import "./App.css";
import { load } from "./Contract";

function App() {
  const [addTodo, setaddTodo] = useState("");
  const [account, setaccount] = useState("");
  const [todos, settodos] = useState([]);
  const [contract, setcontract] = useState(null);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    load().then((res) => {
      console.log(res);
      setaccount(res.account);
      settodos(res.tasks);
      setcontract(res.Contract);
      setreload(false);
    });
  }, [reload]);
  const handleAddTask = async () => {
    await contract.methods.createTask(addTodo).send({from:account})
    setaddTodo("")
    setreload(true)
  };
  const updateTask=async(id)=>{
    await contract.methods.changeTaskStatus(id).send({from:account})
    setreload(true)
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Todo List (Blockchain)</h1>
      <p style={{fontSize:"12px"}}>Account: {account}</p>
        <div>
          <div className="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Add New Task..."
              aria-label="Search"
              onChange={(evt) => setaddTodo(evt.target.value)}
              value={addTodo}
            />
            <button
              class="btn btn-outline-info"
              type="button"
              onClick={() => handleAddTask()}
            >
              ADD
            </button>
          </div>
          <div className="mt-5">
            {todos.map((todo) => (
              <div
                className="roudnded p-1 shadow mb-2"
                style={{ width: "400px", background: "#2c313a" }}
                key={todo.id}
              >
                <div class="d-flex justify-content-between text-center">
                  <h4>{todo[1]}</h4>
                  {todo.completed ? (
                    <button style={{border:"none",background:"transparent"}}>✅</button>
                  ) : (
                    <button style={{border:"none",background:"transparent"}} onClick={()=>updateTask(todo.id)}>❎</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
