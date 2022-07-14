import React from 'react';

export interface ListItemProps {
  title: string,
}

export default function ListItem(props: ListItemProps) {
  const {title} = props;
  
  return (
    <li>
      <img src="https://place-hold.it/300" alt={title}/>
      <div className='image-title'>
        <p>{title}</p>
      </div>
    </li>
  )
}