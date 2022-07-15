import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import '../styles/components/_file-uploader.scss';

interface FileUploaderProps {
  uploadFile: (file: React.ChangeEvent) => void;
  fileName: string,
  error?: string
}

export default function FileUploader (props: FileUploaderProps) {
  const { uploadFile, fileName, error } = props
  useEffect(() => {
    document.body.style.cssText = `overflow:hidden`;
    window.scrollTo(0, 0);

    return () => {
      document.body.style.cssText = '';
    };
  }, []);
  

  return(
    <div className='file-uploader'>
      <input onChange={(e) => uploadFile(e)} type="file" id="img-uploader" name="img" accept="image/*"></input>
      <label className={error ? 'invalid' : ''} htmlFor="img-uploader">
        <FontAwesomeIcon icon={faCloudArrowUp}/>
        {!fileName ? <p>Choose a file</p> : null}
        <p>{fileName}</p>
      </label>
      {error ? <p className='error-message'>{error}</p> : null}
    </div>
  )
}