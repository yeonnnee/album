import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



interface TextInputProps {
  placeholder:string,
  showIcon: boolean,
  value: string,
  onChange:(e:React.ChangeEvent<HTMLInputElement>) => void,
  onKeyUp?:(e:React.KeyboardEvent<HTMLElement>) => void,
  reset?:() => void,
  id?: string,
  label?: string
}

export default function TextInput(props: TextInputProps) {
  const { placeholder, value, showIcon, onChange, onKeyUp, reset, label, id } = props;

  return(
    <>
      { showIcon ? <FontAwesomeIcon icon={ faSearch } /> : null }
      { label ? <label htmlFor={id}>{label}</label> : null }
      <input id={id} type="text" placeholder={placeholder} value={value || ''} onChange={onChange} onKeyUp={onKeyUp}/>
      {reset && value.length > 0 ? <span onClick={reset}>x</span> : null}
    </>
  )
}