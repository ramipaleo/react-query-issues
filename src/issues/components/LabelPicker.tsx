import { useQuery } from '@tanstack/react-query';

export const LabelPicker = () => {
  const getLabels = async() => {
    const rest = await fetch('https://api.github.com/repos/facebook/react/labels');
    const data = await rest.json();
    return;
  }

  const labelQuery = useQuery(
    ['labels'], // nombre de espacio en caché
    getLabels
  );

  return (
    <div>
        <span 
            className="badge rounded-pill m-1 label-picker"
            style={{ border: `1px solid #ffccd3`, color: '#ffccd3' }}
        >
            Primary
        </span>
        
    </div>
  )
}
