import React, { useState, useEffect } from "react";
import './App.css';
import Scrollytelling from "./components/Landing";
import StoryBody from "./components/StoryBody";
import Header from './components/Header';
import Footer from './components/Footer';
import Credits from "./components/Credits";

function App() {
  const [ data, setData ] = useState(null);
  
  useEffect(() => {
		fetch("https://oink.dailybruin.com/api/packages/prime/grad-issue-26")
		.then(res => res.json())
		.then(res => setData(res.data['article.aml']))
  }, [])

  if (!data) return <div>Loading...</div>;

  return data && (
    <div className="App">
      <Header/>
      <Scrollytelling amlData={data}/>
      <StoryBody amlData={data}/>
      <Credits amlData={data}/>
      <Footer/>
    </div>
  );
}

export default App;

/*This is the correct code for deployment 
Make sure to change the API URL
Then add this to the return statement:
return data && ( code );*/