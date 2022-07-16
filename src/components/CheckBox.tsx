import { MutableRefObject, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import '../styles/components/_checkbox.scss';

interface CheckBoxProps {
  labelText?: string,
  id: string,
  onClick: () => void
}

export default function CheckBox(props: CheckBoxProps) {
  const {labelText, id, onClick} = props;
  const albums = useSelector((state:RootState) => state.album);
  const selectedAlbums = albums.searchResult.filter(x => x.isChecked);
  const targetId = labelText !== 'Select All' && +id.split('-')[1];
  const targetStatus = targetId && albums.searchResult.filter(x => x.id === targetId)[0].isChecked;


  return(
    <>
      <input id={id} type="checkbox" checked={labelText === 'Select All' ? selectedAlbums.length === 5 : targetStatus ? targetStatus : false} onChange={()=>onClick()}/>
      <label className="checkbox" htmlFor={id}>{labelText ? labelText : null}</label>
    </>

  )
}