import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './components/Button';
import Header from './components/Header';
import ListItem from './components/ListItem';
import PageTitle from './components/PageTitle';
import Pagination from './components/Pagination';
import TextInput from './components/TextInput';
import { getAblums } from './reducers/albumSlice';
import { useGetAlbumsQuery } from './services/albums';
import { RootState } from './store';
import './styles/pages/_main.scss';
import { Album } from './types/albums';

function App() {
  const albums = useSelector((state:RootState) => state.album);
  const dispatch = useDispatch();
  const {data, error, isLoading} = useGetAlbumsQuery(null);

  const openAddImageModal = () =>{ 
    console.log('open');
  }

  const search = () => {
    console.log('search');
  }



  useEffect(() => {
    dispatch(getAblums(data || []));
  },[dispatch, data]);

  return (
    <>
      <Header />
      <div className='main-content'>
        <div className='content-title'>
          <PageTitle title={"Images"} total={albums.total}/>
          <Button text={"+Add Image"} type={"add"} shape={"square"} onClick={openAddImageModal}/>
        </div>

        <div className='search-section'>
          <div className='search-input'>
            <TextInput enableClear={true} placeholder={'Search'} showIcon={true} onChange={search}/>
          </div>
        </div>

        <ul className='images'>
          {albums.searchResult?.map((d: Album,index:number) => {
            return (<ListItem title={d.title} id={d.id} key={index}/>)
          })}
        </ul>

        <div>
         <Pagination />
        </div>
      </div>
    </>

  )
}

export default App;
