import { useSelector } from "react-redux";
import { RootState } from "../store";
import Button from "./Button";
import '../styles/components/_no-results.scss';


interface NoResultsProps {
  resetSearchCondition: () => void
}

export default function NoResults(props: NoResultsProps) {
  const {resetSearchCondition} = props;
  const albums = useSelector((state:RootState) => state.album);

  return(
    <div className="no-results">
      {
        albums.data.length > 0 && albums.searchResult.length ===  0 ?
        <>
          <p>No Results</p>
          <Button text={'Reset'} type={"confirm"} shape={"circle"} onClick={resetSearchCondition}/>
        </>
        :
        <p>No Data</p>
      }
    </div>
  )
}