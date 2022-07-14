import React, { useCallback, useEffect, useState } from 'react';
import Button from './components/Button';
import Header from './components/Header';
import ListItem from './components/ListItem';
import PageTitle from './components/PageTitle';
import TextInput from './components/TextInput';
import { getAlbums } from './services/albums';
import './styles/pages/_main.scss';
import { Album } from './types/albums';

function App() {
  const [list, setList] = useState<Album[]>([]);

  const openAddImageModal = () =>{ 
    console.log('open');
  }

  const search = () => {
    console.log('search');
  }

  const fetchData = useCallback( async()=>{
    const res = await getAlbums();
    setList(res.data.slice(0, 5));
  },[]);

  useEffect(()=>{
    fetchData();
  },[fetchData]);

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='content-title'>
          <PageTitle title={"Images"} total={list.length}/>
          <Button text={"+Add Image"} type={"add"} shape={"square"} onClick={openAddImageModal}/>
        </div>

        <div className='search-section'>
          <div className='search-input'>
            <TextInput enableClear={true} placeholder={'Search'} showIcon={true} onChange={search}/>
          </div>
        </div>

        <ul className='images'>
          {list.map((item,index) => {
            return (<ListItem title={item.title} key={index}/>)
          })}
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
