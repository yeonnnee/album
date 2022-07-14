import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


interface TextInputProps {
  placeholder:string,
  showIcon: boolean,
  enableClear: boolean,
  onChange:() => void,
  onKeyUp?:() => void,
}

export default function TextInput(props: TextInputProps) {
  const { placeholder, showIcon, onChange, onKeyUp, enableClear } = props;

  return(
    <>
      { showIcon ? <FontAwesomeIcon icon={ faSearch } /> : null }
      <input type="text" placeholder={placeholder} onChange={onChange} onKeyUp={onKeyUp}/>
      {enableClear ? <span>x</span> : null}
    </>
  )
}