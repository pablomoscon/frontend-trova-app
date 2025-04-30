import { useParams } from 'react-router-dom';
import ArtistDetailsContent from '../../components/ArtistComponents/ArtistDetails/ArtistDetailsContent';

const ArtistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p className='text-center mt-10'>ID inválido</p>;

  return (
    <div>
      <ArtistDetailsContent artistId={Number(id)} />
    </div>
  );
};

export default ArtistView;
