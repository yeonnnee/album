import React from 'react';
import More from './More';
import DropDown from './More';

export interface ListItemProps {
  title: string,
  id: number
}

export default function ListItem(props: ListItemProps) {
  const {title, id} = props;
  const options = [
    {
      text: '수정하기',
      value: 'edit'
    },
    {
      text: '삭제하기',
      value: 'delete'
    }
  ];
  
  return (
    <li className="item">
      <img src="https://place-hold.it/300" alt={title}/>
      <div className='image-title'>
        <p>{title}</p>
        <More id={id.toString()}/>
      </div>
    </li>
  )
}