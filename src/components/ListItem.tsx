import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectAlbum } from '../reducers/albumSlice';
import CheckBox from './CheckBox';
import More from './More';

export interface ListItemProps {
  title: string,
  id: number,
  selectAll: boolean
}

export default function ListItem(props: ListItemProps) {
  const {title, id, selectAll} = props;
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  function selectItem() {
    setChecked(!checked);
    dispatch(selectAlbum({type: 'select', id: +id, checked: !checked}));
  };

  useEffect(() => {
    setChecked(selectAll);
  },[selectAll])

  return (
    <li className="item" onClick={selectItem}>
      <div className='image-wrapper'>
        <p>Loading...</p>
        <CheckBox id={`album-${id}`} onClick={()=>console.log('click')}/>
        <img src="https://place-hold.it/300" alt={title}/>
      </div>
      <div className='image-title'>
        <p className='title'>{title}</p>
        <More title={title} id={id.toString()}/>
      </div>
    </li>
  )
}