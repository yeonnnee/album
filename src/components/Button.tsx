import React from 'react';
import '../styles/components/_button.scss';


interface ButtonProps {
  text: string,
  type: 'cancel' | 'confirm' | 'add',
  shape: 'circle' | 'square',
  onClick: () => void;
}

export default function Button (props: ButtonProps) {
  const {text, type, shape} = props;
  
  return (
    <button className={`${type} ${shape}`}>{text}</button>
  )
}

