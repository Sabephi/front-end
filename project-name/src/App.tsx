import './App.css'
import Sidebar from './components/sidebar';
import './components/sidebar.css';

function App() {


  return (
    <>
      <Sidebar>
        <h3>WeatherApp</h3>
        <p>Wrocław</p>
        <p>Kraków</p>
        <p>Gdańsk</p>
        <button>Add City</button>
      </Sidebar>
      
  
    </>
  )
}

export default App
