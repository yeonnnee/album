import { faEllipsis, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import {deleteAlbum} from '../reducers/albumSlice';
import '../styles/components/_more-btn.scss';

interface MoreProps {
  id: string,
}

export default function More(props: MoreProps) {
  const { id } = props;
  const dispatch = useDispatch();

  return(
    <div className='more-btn'>
      <input type="checkbox" id={id}/>
      <label htmlFor={id}>
        <FontAwesomeIcon icon={faEllipsis}/>
      </label>
      <ul className='option-list'>
        <li>수정하기 <FontAwesomeIcon icon={faPenToSquare}/></li>
        <li onClick={() => dispatch(deleteAlbum(+id))}>삭제하기 <FontAwesomeIcon icon={faTrash}/></li>
      </ul>
    </div>
  )
}