import Button from "../Button";
import '../../styles/components/_confirm-modal.scss';

interface ConfirmModalProps {
  isActive:boolean,
  text: string,
  onConfirm:() => void,
  onCancel:() => void
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const {isActive, text, onConfirm, onCancel} = props;

  return(
    <>
      {
        isActive ? 
        <div className="confirm-modal">
          <p className="message">{text}</p>
          <div className="buttons">
            <Button text={'취소'} type={"cancel"} shape={"circle"} onClick={onCancel}/>
            <Button text={'확인'} type={"confirm"} shape={"circle"} onClick={onConfirm}/>
          </div>
        </div> 
        : 
        null  
      }
    </> 
  )
}