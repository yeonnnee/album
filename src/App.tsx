import React, { useState } from 'react';
import Button from './components/Button';
import Header from './components/Header';
import PageTitle from './components/PageTitle';
import './styles/pages/_main.scss';

function App() {
  const [list, setList] = useState([]);



  const openAddImageModal = () =>{ 
    console.log('open');
  }

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='content-title'>
          <PageTitle title={"Images"} total={200}/>
          <Button text={"+Add Image"} type={"add"} shape={"square"} onClick={openAddImageModal}/>
        </div>


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
