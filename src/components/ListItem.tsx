import More from './More';

export interface ListItemProps {
  title: string,
  id: number
}

export default function ListItem(props: ListItemProps) {
  const {title, id} = props;

  return (
    <li className="item">
      <div className='image-wrapper'>
        <p>Loading...</p>
        <img src="https://place-hold.it/300" alt={title}/>
      </div>
      <div className='image-title'>
        <p className='title'>{title}</p>
        <More title={title} id={id.toString()}/>
      </div>
    </li>
  )
}