import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-base h-screen w-screen flex flex-col align-middle items-center gap-4 pt-4">
      <h1 className="text-4xl text-primary">Hello, World</h1>
      <button
        className="bg-lavender cursor-pointer px-4 py-0.5 rounded-sm min-w-24"
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </button>
    </div>
  );
}

export default App;
