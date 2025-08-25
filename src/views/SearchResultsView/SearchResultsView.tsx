import React from 'react';
import SearchAlbumsResults from '../../components/AlbumComponents/SearchAlbumsResult/SearchAlbumsResults';
import { useSearchParams } from 'react-router-dom';

const SearchResultsView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  return (
    <div>
      <div className='search-results-container pt-50 text-2xl bg-[#E5E6E4]'>
        <h2 className='text-gray-800 font-semibold px-4 py-8 bg-[#E5E6E4]'>
          Búsqueda: "{query}"
        </h2>
      </div>

      <SearchAlbumsResults />
    </div>
  );
};

export default SearchResultsView;
