import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './components/Button';
import Header from './components/Header';
import ListItem from './components/ListItem';
import FileUploadeModal from './components/modals/FileUploadModal';
import NoResults from './components/NoResults';
import PageTitle from './components/PageTitle';
import Pagination from './components/Pagination';
import TextInput from './components/TextInput';
import { getAblums, searchAlbum } from './reducers/albumSlice';
import { useGetAlbumsQuery } from './services/albums';
import { RootState } from './store';
import './styles/pages/_main.scss';
import { Album } from './types/albums';

function App() {
  const [searchString, setSearchString] = useState<string>('');
  const [openAddImageModal, setOpenAddImageModal] = useState(false);
  const albums = useSelector((state:RootState) => state.album);
  const dispatch = useDispatch();
  const {data, isLoading} = useGetAlbumsQuery(null);

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
          <Button text={"+Add Image"} type={"add"} shape={"square"} onClick={() => setOpenAddImageModal(true)}/>
        </div>

        <div className='search-section'>
          <div className='search-input'>
            <TextInput reset={resetSearchCondition} placeholder={'Search'} showIcon={true} onChange={setValue} onKeyUp={search} value={searchString}/>
          </div>
        </div>

        <ul className='images'>
          {
            !isLoading && albums.searchResult.length > 0 ?
            albums.searchResult?.map((d: Album,index:number) => {
              return (<ListItem title={d.title} id={d.id} key={index}/>)
            })
            :
            <NoResults/>
          }
        </ul>
        
        {albums.searchResult.length > 0 ? <Pagination /> : null}
      </div>

      <FileUploadeModal isActive={openAddImageModal} mode={"add"} onCancel={()=>setOpenAddImageModal(false)}/>
    </>
  )
}

export default App;
