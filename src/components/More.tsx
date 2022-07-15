import { faEllipsis, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {deleteAlbum} from '../reducers/albumSlice';
import '../styles/components/_more-btn.scss';
import ConfirmModal from './modals/ConfirmModal';
import FileUploadeModal from './modals/FileUploadModal';

interface MoreProps {
  id: string,
  title: string
}

export default function More(props: MoreProps) {
  const { id, title } = props;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const dispatch = useDispatch();

  function deleteItem() {
    dispatch(deleteAlbum(+id));
    setOpenConfirmModal(false);
  }

  return(
    <>
      <div className='more-btn'>
        <input type="checkbox" id={id}/>
        <label htmlFor={id}>
          <FontAwesomeIcon icon={faEllipsis}/>
        </label>
        <ul className='option-list'>
          <li onClick={() => setOpenEditModal(true)}>Edit <FontAwesomeIcon icon={faPenToSquare}/></li>
          <li onClick={()=> setOpenConfirmModal(true)}>Delete <FontAwesomeIcon icon={faTrash}/></li>
        </ul>
      </div>

      <ConfirmModal isActive={openConfirmModal} text={'Are you sure you want to delete it?'} onCancel={()=> setOpenConfirmModal(false)} onConfirm={deleteItem}/>
      <FileUploadeModal id={+id} isActive={openEditModal} mode={"edit"} originTitle={title} onCancel={()=>setOpenEditModal(false)} />
    </>

  )
}