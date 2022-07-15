import React, { useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import '../../styles/components/_file-upload-modal.scss';
import { useDispatch } from "react-redux";
import { addAlbum } from "../../reducers/albumSlice";
import FileUploader from "../FileUploader";


interface FileUploadeModalProps {
  mode: 'add' | 'edit',
  onCancel: () => void,
  originTitle?: string,
}

interface Value {
  text: string,
  error: string
}

export default function FileUploadeModal(props: FileUploadeModalProps) {
  const {mode, onCancel, originTitle} = props;
  const [title, setTitle] = useState<Value>({text: originTitle || '', error: ''});
  const [fileName, setFileName] = useState<Value>({text: '', error: ''});
  const dispatch = useDispatch();

  function onSave() {
    if(!title.text) {
      setTitle({ ...title, error: 'Required'}); 
    };

    if(!fileName.text) {
      setFileName({ ...fileName, error: 'Required'}); 
      return;
    }

    dispatch(addAlbum(title.text));
    onCancel();
  }

  function uploadFile(e:React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const file = target.value.replace(/C:\\fakepath\\/, '');
    setFileName({text: file, error:''});
  }

  const setValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setTitle({...title, text: target.value, error:''});
  }

  return(
    <div className="file-upload-modal">
      <div className="modal-content">
        <div className="modal-header">{mode === 'add' ? 'Upload' : 'Edit'}</div>

        <div className="modal-form">
          <TextInput 
            label={"Title"} 
            error={title.error} 
            placeholder={'Enter the image title'} 
            showIcon={false} 
            onChange={setValue} 
            value={title.text}
          />
          <FileUploader uploadFile={uploadFile} fileName={fileName.text} error={fileName.error}/>
        </div>

        <div className="buttons">
          <Button text={'Cancel'} type={"cancel"} shape={"circle"} onClick={onCancel}/>
          <Button text={'Save'} type={"confirm"} shape={"circle"} onClick={onSave}/>
        </div>
      </div>
    </div>
  )
}