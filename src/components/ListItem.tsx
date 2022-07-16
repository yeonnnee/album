import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAlbum } from '../reducers/albumSlice';
import { RootState } from '../store';
import CheckBox from './CheckBox';
import More from './More';

export interface ListItemProps {
  title: string,
  id: number,
}

export default function ListItem(props: ListItemProps) {
  const {title, id} = props;
  const selectedAlbums = useSelector((state: RootState) => state.album.searchResult.filter(x => x.isChecked));
  const [checked, setChecked] = useState(selectedAlbums.length === 5 || false);
  
  const dispatch = useDispatch();

  function selectItem() {
    setChecked(!checked);
    dispatch(selectAlbum({type: 'select', id: +id, checked: !checked}));
  };


  return (
    <li className="item" onClick={selectItem}>
      <div className='image-wrapper'>
        <p>Loading...</p>
        <CheckBox type={'single'} id={`album-${id}`} onClick={selectItem}/>
        <img src="https://place-hold.it/300" alt={title}/>
      </div>
      <div className='image-title'>
        <p className='title'>{title}</p>
        <More title={title} id={id.toString()}/>
      </div>
    </li>
  )
}