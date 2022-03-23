import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage';

function App() {

  return (
    <div className="App">
        <div className='MainPage'>
            {MainPage()}
        </div>
    </div>
  );
}

export default App;