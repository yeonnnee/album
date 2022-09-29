import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum, searchAlbum, selectAlbum } from "../reducers/albumSlice";
import { setSearchString } from "../reducers/searchSlice";
import { RootState } from "../store";
import Button from "./Button";
import CheckBox from "./CheckBox";
import ConfirmModal from "./modals/ConfirmModal";
import TextInput from "./TextInput";

interface SearchSectionProps{
  reset: () => void,
}

export default function SearchSection(props: SearchSectionProps) {
  const { reset } = props;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const albums = useSelector((state: RootState) => state.album);
  const searchString = useSelector((state: RootState) => state.searchCondition.searchString);
  const selectedAlbums = albums.searchResult.filter(x => x.isChecked);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();

  function search(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key !== 'Enter' || searchString.length === 0) return;
    dispatch(searchAlbum({type: 'search', payload: searchString}));
  }

  function setValue(e:React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    dispatch(setSearchString(target.value));
  }

  function selectAllAlbums() {
    setSelectAll(!selectAll);
    dispatch(selectAlbum({type: 'all', checked: !selectAll}));
  }

  function deleteSelectedItem() {
    setSelectAll(!selectAll);
    dispatch(deleteAlbum(selectedAlbums.map(x => x.id)));
    setOpenConfirmModal(false);
  }


  return (
    <>
      <div className='search-section'>
        <div className='select-all'>
          <CheckBox type={"all"} labelText={"Select All"} id={"select-all"} onClick={selectAllAlbums}/>
          {selectedAlbums.length > 0 ? <Button text={"DELETE"} type={"cancel"} shape={"square"} onClick={() => setOpenConfirmModal(true)} />: null}
        </div>
        <div className='search-input'>
          <TextInput reset={ reset } placeholder={'Search'} showIcon={true} onChange={setValue} onKeyUp={search} value={searchString}/>
        </div>
      </div>
      <ConfirmModal isActive={openConfirmModal} text={'Are you sure you want to delete it?'} onCancel={()=> setOpenConfirmModal(false)} onConfirm={deleteSelectedItem}/>
    </>
  
    )
}