import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import '../styles/components/_file-uploader.scss';

export default function FileUploader () {
  const [fileName, setFileName] = useState('');

  function uploadFile(e:any) {
    const file = e.target.value.replace(/C:\\fakepath\\/, '');
    setFileName(file);
  }

  useEffect(() => {
    document.body.style.cssText = `overflow:hidden`;
    window.scrollTo(0, 0);

    return () => {
      document.body.style.cssText = '';
    };
  }, []);
  

  return(
    <div className='file-uploader'>
      <input onChange={uploadFile} type="file" id="img-uploader" name="img" accept="image/*"></input>
      <label htmlFor="img-uploader">
        <FontAwesomeIcon icon={faCloudArrowUp}/>
        {!fileName ? <p>Choose a file</p> : null}
        <p>{fileName}</p>
      </label>
    </div>
  )
}