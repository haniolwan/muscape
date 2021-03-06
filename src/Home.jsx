import './App.css';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import Selection from './components/Selection';
import Cards from './components/Cards';
import getData from './utils/apiData';
import LoadingSpinner from './components/LoadingSpinner';

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredOption, setFilteredOption] = useState('artists');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      getData(search).then((response) => {
        setLoading(false);
        setData(response.data);
      });
    }
  }, [search]);

  const getSearch = (searchItem) => {
    setSearch(searchItem.trim());
  };

  const getFilter = (filter) => {
    setFilteredOption(filter);
  };

  return (
    <div className="App">
      <h1>Muscape Search</h1>
      <h3>Enter search term</h3>
      <Search getSearch={getSearch} />
      <Selection getFilter={getFilter} />
      {loading && <LoadingSpinner />}
      {data.length !== 0 ? <Cards data={data} filterOption={filteredOption} /> : <h1>...</h1>}
    </div>
  );
}

export default Home;
