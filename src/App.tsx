import React, { useState } from 'react';
import Header from './components/Header';
import PageTitle from './components/PageTitle';

function App() {
  const [list, setList] = useState([]);

  return (
    <>
      <Header />
      <div>
        <PageTitle title={"Images"} total={200}/>

        <div><button>+Add Image</button></div>

        <div>
          <input type="text" placeholder='Search'/>
        </div>
        <ul>
          <li>
            <p>Title</p>
            <div>Image</div>
          </li>
        </ul>

        <div>
          <ul>
            <li>Start</li>
            <li>prev</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>Next</li>
            <li>End</li>

          </ul>
        </div>
      </div>
    </>

  )
}

export default App;
