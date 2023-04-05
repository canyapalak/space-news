import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';

function App() {
  return (
    <div className="App font-navine h-screen w-screen bg-gradient-to-br 
    from-black/80 to-slate-700 text-slate-100">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
