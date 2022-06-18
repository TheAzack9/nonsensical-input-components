import logo from './logo.svg';
import './App.css';

import AllExamples from './Examples';
import { useState } from 'react';

const ExampleSelector = ({setComponent}) => {
  return (
    <div>
      {
        AllExamples.map((example, i) => {
          return (
            <div key={i}>
              <h2 onClick={() => setComponent(example)}>{example.name}</h2>
              
            </div>
          )
        })
      }
    </div>
  );
}

function App() {
  const [component, setComponent ]= useState()

  if(component) {
    return <div className="component-example">
      <component.component />
    </div>
  }
  return (
    <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
      <ExampleSelector setComponent={setComponent}/>
    </div>
  );
}

export default App;
