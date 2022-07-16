import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlbum, selectAlbum } from '../reducers/albumSlice';
import { RootState } from '../store';
import CheckBox from './CheckBox';
import ConfirmModal from './modals/ConfirmModal';
import FileUploadeModal from './modals/FileUploadModal';
import More from './More';

export interface ListItemProps {
  title: string,
  id: number,
}

export default function ListItem(props: ListItemProps) {
  const {title, id} = props;
  const selectedAlbums = useSelector((state: RootState) => state.album.searchResult.filter(x => x.isChecked));
  const [checked, setChecked] = useState(selectedAlbums.length === 5 || false);
  const [activeDetailModal, setActiveDetailModal] = useState(false);
  const [activeConfirmModal, setActiveConfirmModal] = useState(false);
  const dispatch = useDispatch();

  function selectItem() {
    setChecked(!checked);
    dispatch(selectAlbum({type: 'select', id: +id, checked: !checked}));
  };

  function deleteItem() {
    dispatch(deleteAlbum([+id]));
    setActiveConfirmModal(false);
    setActiveDetailModal(false);
  }

  return (
    <>
      <li className="item">
        <div className='image-wrapper' onClick={()=>setActiveDetailModal(true)}>
          <p>Loading...</p>
          <CheckBox type={'single'} id={`album-${id}`} onClick={selectItem}/>
          <img src="https://place-hold.it/300" alt={title} />
        </div>
        <div className='image-title'>
          <p className='title'>{title}</p>
          <More title={title} id={id.toString()}/>
        </div>
      </li>
      <FileUploadeModal originTitle={title} mode={'detail'} onCancel={()=>setActiveDetailModal(false) } isActive={activeDetailModal} onDelete={ ()=>setActiveConfirmModal(true)} />
      <ConfirmModal isActive={activeConfirmModal} text={'Are you sure you want to delete it?'} onCancel={()=> setActiveConfirmModal(false)} onConfirm={deleteItem}/>
    </>

  )
}