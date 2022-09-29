import React from 'react';
import '../styles/components/_page-title.scss';
interface PageTitleProps {
  title: string,
  total: number
}

export default function PageTitle(props: PageTitleProps) {
  const {title, total} = props;

  return (
    <div className='page-title'> 
      {title} 
      {total > 0 ? <span>{total}</span> : null}
    </div>
  )
}