import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { SetStateAction } from 'react';


interface TextInputProps {
  placeholder:string,
  showIcon: boolean,
  value: string,
  onChange:(e:React.ChangeEvent<HTMLInputElement>) => void,
  onKeyUp?:(e:React.KeyboardEvent<HTMLElement>) => void,
  reset?:() => void
}

export default function TextInput(props: TextInputProps) {
  const { placeholder, value, showIcon, onChange, onKeyUp, reset } = props;

  return(
    <>
      { showIcon ? <FontAwesomeIcon icon={ faSearch } /> : null }
      <input type="text" placeholder={placeholder} value={value || ''} onChange={onChange} onKeyUp={onKeyUp}/>
      {reset && value.length > 0 ? <span onClick={reset}>x</span> : null}
    </>
  )
}