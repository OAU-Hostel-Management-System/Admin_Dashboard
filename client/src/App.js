
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
   <Navbar />

   {/* brower router would be used so the Navbar won't be re-rendered when a page is selected */}
   <div>
      Upcoming...
   </div>
    </div>
  );
}

export default App;
