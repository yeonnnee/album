import { useDispatch, useSelector } from "react-redux";
import { searchAlbum } from "../reducers/albumSlice";
import { RootState } from "../store";
import Button from "./Button";
import '../styles/components/_no-results.scss';


export default function NoResults() {
  const albums = useSelector((state:RootState) => state.album);
  const dispatch = useDispatch();

  function resetData() {
    dispatch(searchAlbum({type:'reset', payload:''}));
  }

  return(
    <div className="no-results">
      {
        albums.data.length > 0 && albums.searchResult.length ===  0 ?
        <>
          <p>No Results</p>
          <Button text={'Reset'} type={"confirm"} shape={"circle"} onClick={resetData}/>
        </>
        :
        <p>No Data</p>
      }
    </div>
  )
}