import React from 'react';
import More from './More';


export interface ListItemProps {
  title: string,
  id: number
}

export default function ListItem(props: ListItemProps) {
  const {title, id} = props;

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