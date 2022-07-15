import { useState } from "react";
import Button from "../Button";
import DragAndDrop from "../FileUploader";
import TextInput from "../TextInput";
import '../../styles/components/_file-upload-modal.scss';

export default function FileUploadeModal() {
  const [title, setTitle] = useState('');

  function onCancel() {
    // TODO: 모달 닫기
  }

  function addAlbum() {
    //TODO: 이미지 추가
  }

  const setValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  }

  return(
    <div className="file-upload-modal">
      <div className="modal-content">
        <div className="modal-header">Upload your Image</div>

        <div className="modal-form">
          <TextInput label={"Title"} placeholder={'Enter the image title'} showIcon={false} onChange={setValue} value={title}/>
          <DragAndDrop />
        </div>


        <div className="buttons">
          <Button text={'Cancel'} type={"cancel"} shape={"circle"} onClick={onCancel}/>
          <Button text={'Save'} type={"confirm"} shape={"circle"} onClick={addAlbum}/>
        </div>
      </div>

    </div>
  )
}