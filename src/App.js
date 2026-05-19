import React, { useState, useEffect } from "react";
import './App.css';
import Scrollytelling from "./components/Landing";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [ data, setData ] = useState(null);
  
  useEffect(() => {
		fetch("<TODO: insert api url here>")
		.then(res => res.json())
		.then(res => setData(res.data['article.aml']))
  }, [])

  return (
    <div className="App">
      <Header/>
      <Scrollytelling/>
      Hello Daily Bruin!
      <Footer/>
    </div>
  );
}

export default App;

/*This is the correct code for deployment 
Make sure to change the API URL
Then add this to the return statement:
return data && ( code );*/