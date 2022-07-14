import { faEllipsis, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../styles/components/_more-btn.scss';

interface MoreProps {
  id: string,
}

export default function More(props: MoreProps) {
  const { id} = props;

  return(
    <div className='more-btn'>
      <input type="checkbox" id={id}/>
      <label htmlFor={id}>
        <FontAwesomeIcon icon={faEllipsis}/>
      </label>
      <ul className='option-list'>
        <li>수정하기 <FontAwesomeIcon icon={faPenToSquare}/></li>
        <li>삭제하기 <FontAwesomeIcon icon={faTrash}/></li>
      </ul>
    </div>
  )
}