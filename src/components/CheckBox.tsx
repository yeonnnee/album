import { useSelector } from "react-redux";
import { RootState } from "../store";
import '../styles/components/_checkbox.scss';

interface CheckBoxProps {
  id: string,
  type: 'all' | 'single',
  labelText?: string,
  onClick: () => void
}

export default function CheckBox(props: CheckBoxProps) {
  const { labelText, id, type, onClick } = props;

  const albums = useSelector((state:RootState) => state.album);
  const selectedAlbums = albums.searchResult.filter(x => x.isChecked);
  const targetId = type === 'single' && +id.split('-')[1];
  const targetStatus = targetId && albums.searchResult.filter(x => x.id === targetId)[0].isChecked;


  return(
    <>
      {
        type === 'all' ? 
        <input id={id} type="checkbox" checked={selectedAlbums.length === 5} onChange={onClick}/>
          :
        <input id={id} type="checkbox" checked={targetStatus ? targetStatus : false} onChange={onClick}/>
      }
      <label className="checkbox" htmlFor={id}>{labelText ? labelText : null}</label>
    </>

  )
}