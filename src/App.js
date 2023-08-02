import './App.css';
import TriggerNotification from './components/toaster-msg';

import MainPage from './pages/MainPage';


function App() {



  return (
    <>

      <div className="App">
        <TriggerNotification />
        <MainPage />
      </div>
    </>

  );
}

export default App;
