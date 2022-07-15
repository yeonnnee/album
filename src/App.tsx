import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './components/Button';
import Header from './components/Header';
import ListItem from './components/ListItem';
import PageTitle from './components/PageTitle';
import Pagination from './components/Pagination';
import TextInput from './components/TextInput';
import { getAblums, searchAlbum } from './reducers/albumSlice';
import { useGetAlbumsQuery } from './services/albums';
import { RootState } from './store';
import './styles/pages/_main.scss';
import { Album } from './types/albums';

function App() {
  const [searchString, setSearchString] = useState<string>('')
  const albums = useSelector((state:RootState) => state.album);
  const dispatch = useDispatch();
  const {data, error, isLoading} = useGetAlbumsQuery(null);

  const openAddImageModal = () =>{ 
    console.log('open');
  }

  const search = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Enter' || searchString.length === 0) return;
    dispatch(searchAlbum({type: 'search', payload: searchString}));
  }

  const setValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchString(target.value);
  }

  const resetSearchCondition = () =>{
    setSearchString('');
    dispatch(searchAlbum({type: 'reset', payload: ''}));
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
            <TextInput reset={resetSearchCondition} placeholder={'Search'} showIcon={true} onChange={setValue} onKeyUp={search} value={searchString}/>
          </div>
        </div>

        <ul className='images'>
          {albums.searchResult?.map((d: Album,index:number) => {
            return (<ListItem title={d.title} id={d.id} key={index}/>)
          })}
        </ul>

        
        {albums.searchResult.length > 0 ? <Pagination /> : null}
      </div>
    </>

  )
}

export default App;
