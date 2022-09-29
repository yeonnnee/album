import React, { useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import '../../styles/components/_file-upload-modal.scss';
import { useDispatch } from "react-redux";
import { addAlbum, editAlbum } from "../../reducers/albumSlice";
import FileUploader from "../FileUploader";


interface FileUploadeModalProps {
  isActive: boolean,
  mode: 'add' | 'edit' | 'detail',
  onCancel: () => void,
  onDelete?: () => void,
  originTitle?: string,
  id?: number
}

interface Value {
  text: string,
  error: string
}

export default function FileUploadeModal(props: FileUploadeModalProps) {
  const { mode, onCancel,onDelete, originTitle, isActive, id } = props;
  const [viewType, setViewType] = useState(mode);
  const [title, setTitle] = useState<Value>({text: originTitle || '', error: ''});
  const [fileName, setFileName] = useState<Value>({text: '', error: ''});
  const dispatch = useDispatch();

  function validation() {
    if(!title.text) {
      setTitle({ ...title, error: 'Required'}); 
    };

    if(!fileName.text) {
      setFileName({ ...fileName, error: 'Required'});
      return false;
    };

    return true;
  }

  function reset() {
    if (mode === 'add') {
      setTitle({text: '', error:''});
      setFileName({text: '', error:''});
    }

    setViewType(mode);
    onCancel();
  }

  function onSave() {
    if(!validation()) return;

    dispatch(addAlbum(title.text));
    reset();
  }

  function onEdit() {
    if(!id || !validation()) return;

    dispatch(editAlbum({id: id, title: title.text}));
    reset();
  }

  function uploadFile(e:React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const file = target.value.replace(/C:\\fakepath\\/, '');
    setFileName({text: file, error:''});
  }

  function setValue(e:React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setTitle({...title, text: target.value, error:''});
  }

  function convertViewType() {
    setViewType('edit');
  }


  return(
    <>
    {
      isActive ? 
      <div className="file-upload-modal">
        <div className="modal-content">
          <div className="modal-header">
            <p>
              {viewType === 'add' ? 'Upload' : viewType === 'edit' ? 'Edit' : 'Detail'}
            </p>
            {
              viewType === 'detail' ? 
                <Button text={'X'} type={"cancel"} shape={"circle"} onClick={onCancel}/>    
                  :
                null
            } 
          </div>

          <div className="modal-form">
            <TextInput 
              label={"Title"}
              error={title.error}
              placeholder={'Enter the image title'}
              showIcon={false}
              onChange={setValue}
              value={title.text}
              disabled={viewType === 'detail' }
            />
            {
              viewType !== 'detail' ? 
              <FileUploader uploadFile={uploadFile} fileName={fileName.text} error={fileName.error}/>
                :
              <div className="detail-image">
                <img src="https://place-hold.it/410X300?text=Detail Image" alt={title.text} />
              </div>
            }
          </div>

            {
              viewType !== 'detail' ?
              <div className="buttons">
                <Button text={'Cancel'} type={"cancel"} shape={"circle"} onClick={reset}/>
                {
                  viewType === 'add' ?
                  <Button text={'Save'} type={"confirm"} shape={"circle"} onClick={onSave}/>
                  :
                  <Button text={'Edit'} type={"confirm"} shape={"circle"} onClick={onEdit}/>
                }
              </div>
              :
              <div className="buttons">
                <Button text={'Delete'} type={"cancel"} shape={"circle"} onClick={onDelete || reset}/>
                <Button text={'Edit'} type={"confirm"} shape={"circle"} onClick={convertViewType}/>
              </div>
            }

        </div>
      </div> 
      : 
      null
    }
    </>
   
  )
}