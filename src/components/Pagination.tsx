import { faAngleLeft, faAngleRight}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbumsByPage } from '../reducers/albumSlice';
import { RootState } from '../store';
import '../styles/components/_pagination.scss';



export default function Pagination () {
  const currentPage = useSelector((state:RootState) => state.album.currentPage);
  const totalPage = useSelector((state:RootState) =>  state.album.totalPage);
  const pageNum = Array.from({length: totalPage}, (x,i) => i + 1);
  const startIdx = totalPage > 5 && currentPage < 5 ? 0 : currentPage > totalPage - 4 ? totalPage - 5: currentPage - 4;
  const endIdx = totalPage > 5 && currentPage < 5 ? 5 : currentPage > totalPage - 4 ? totalPage : currentPage + 1;
  const dispatch = useDispatch();

  function getNextPage() {
    if(currentPage === totalPage) return;
    dispatch(getAlbumsByPage(currentPage + 1));
  }

  function getPrevPage() {
    if(currentPage === 1) return;
    dispatch(getAlbumsByPage(currentPage - 1));
  }

  return (
    <ul className='pagination'>
      <li className={currentPage === 1 ? 'disabled' : ''}>
        <FontAwesomeIcon icon={faAngleLeft} onClick={getPrevPage}/>
      </li>
      { currentPage > totalPage - 10 ? <li onClick={() => dispatch(getAlbumsByPage(1))}>1</li> : null }
      { totalPage > 5 && currentPage > totalPage - 10 ? <li>...</li> : null }

      { 
        pageNum.slice(startIdx,endIdx).map((page,index) => {
          return(
            <li key={index} className={page === currentPage ? 'current' :''} onClick={() => dispatch(getAlbumsByPage(page))}>{page.toString()}</li>
          )
        })
      }

      { totalPage > 5 && currentPage < totalPage - 3 ? <li>...</li> : null }
      { totalPage > 5 && currentPage < totalPage - 3 ? <li onClick={() => dispatch(getAlbumsByPage(totalPage))}>{totalPage}</li> : null }
      <li className={currentPage === totalPage ? 'disabled' : ''}>
        <FontAwesomeIcon icon={faAngleRight} onClick={getNextPage}/>
      </li>
    </ul>
  )
}