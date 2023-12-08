import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <div className="bg-gray-200 p-4">
        {/* Button Component */}
        <div className="my-button">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Click me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
