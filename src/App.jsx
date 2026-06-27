import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: inputValue,
      done: false
    };
    
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0ea5e9]">
            Task Manager
          </span>
        </h1>

        <form onSubmit={addTask} className="mb-8 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] text-gray-100 placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </form>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No tasks yet. Add one above to get started!
            </p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-[#0ea5e9] focus:ring-[#0ea5e9] focus:ring-offset-0 cursor-pointer"
                />
                <span
                  className={`flex-1 ${
                    task.done
                      ? "line-through text-gray-500"
                      : "text-gray-100"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            {tasks.filter(t => t.done).length} of {tasks.length} tasks completed
          </div>
        )}
      </div>
    </div>
  );
}

export default App;