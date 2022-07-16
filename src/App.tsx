import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './components/Button';
import CheckBox from './components/CheckBox';
import Header from './components/Header';
import ListItem from './components/ListItem';
import FileUploadeModal from './components/modals/FileUploadModal';
import NoResults from './components/NoResults';
import PageTitle from './components/PageTitle';
import Pagination from './components/Pagination';
import TextInput from './components/TextInput';
import { deleteAlbum, getAblums, searchAlbum, selectAlbum } from './reducers/albumSlice';
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
  const selectedAlbums = albums.searchResult.filter(x => x.isChecked);

  const [selectAll, setSelectAll] = useState(false);


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

  function selectAllAlbums() {
    setSelectAll(!selectAll);
    dispatch(selectAlbum({type: 'all', checked: !selectAll}));

  }

  function deleteSelectedItem() {
    setSelectAll(!selectAll);
    dispatch(deleteAlbum(selectedAlbums.map(x =>x.id)));

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
          <Button text={"UPLOAD"} type={"add"} shape={"square"} onClick={() => setOpenAddImageModal(true)}/>
        </div>

        <div className='search-section'>
          <div className='select-all'>
            <CheckBox labelText={"Select All"} id={"select-all"} onClick={selectAllAlbums}/>
            {selectedAlbums.length > 0 ? <Button text={"DELETE"} type={"cancel"} shape={"square"} onClick={deleteSelectedItem}/>: null}
          </div>
          <div className='search-input'>
            <TextInput reset={resetSearchCondition} placeholder={'Search'} showIcon={true} onChange={setValue} onKeyUp={search} value={searchString}/>
          </div>
        </div>

          {
            !isLoading && albums.searchResult.length > 0 ?
              <ul className='images'>
                {albums.searchResult?.map((d: Album,index:number) => {
                  return (<ListItem title={d.title} id={d.id} key={index} selectAll={selectAll}/>)
                })}
              </ul>
            :
            <NoResults resetSearchCondition={resetSearchCondition}/>
          }
        
        {albums.searchResult.length > 0 ? <Pagination /> : null}
      </div>

      <FileUploadeModal isActive={openAddImageModal} mode={"add"} onCancel={()=>setOpenAddImageModal(false)}/>
    </>
  )
}

export default App;
