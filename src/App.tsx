import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import ListItem from './components/ListItem';
import FileUploadeModal from './components/modals/FileUploadModal';
import NoResults from './components/NoResults';
import PageTitle from './components/PageTitle';
import Pagination from './components/Pagination';
import SearchSection from './components/SearchSection';
import { getAblums, searchAlbum } from './reducers/albumSlice';
import { resetSearchCondition } from './reducers/searchSlice';
import { useGetAlbumsQuery } from './services/albums';
import { RootState } from './store';
import './styles/pages/_main.scss';
import { Album } from './types/albums';

function App() {
  const [openAddImageModal, setOpenAddImageModal] = useState(false);
  const { data, isLoading } = useGetAlbumsQuery(null);
  const albums = useSelector((state:RootState) => state.album);
  const dispatch = useDispatch();


  const reset = () => {
    dispatch(resetSearchCondition());
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
        </div>
        <SearchSection reset={reset} setOpenAddImageModal={() => setOpenAddImageModal(true)} />
        {
          !isLoading && albums.searchResult.length > 0 ?
            <ul className='images'>
              {albums.searchResult?.map((d: Album,index:number) => {
                return (<ListItem title={d.title} id={d.id} key={index} />)
              })}
            </ul>
          :
          <NoResults resetSearchCondition={reset}/>
        }
        
        {albums.searchResult.length > 0 ? <Pagination /> : null}
      </div>

      <FileUploadeModal isActive={openAddImageModal} mode={"add"} onCancel={()=>setOpenAddImageModal(false)}/>
    </>
  )
}

export default App;
