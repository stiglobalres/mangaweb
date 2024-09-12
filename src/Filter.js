import  {useEffect, createContext, useContext} from 'react';
import { useParams } from 'react-router-dom';

import './App.css';

import Header from './widgets/Header';
import Spinner from './widgets/Spinner';
import AnimeList from './widgets/AnimeList';
import  LoadMore from './outlets/loadMore'
import FilterBox from './outlets/FilterBox.js';
import Notound from './widgets/NotFound';

import { mainContext } from './App';

import { updateMetaData, ScreenType, MetaType, FetchData, FetchType } from './constant.ts';

export const AnimeContext = createContext();

export default function Filter() {
    
    const {genres, type} = useParams();
    const {loadingInfo, animeListInfo, pageInfo} = useContext(mainContext);
    const [animeList, setAnimeList] = animeListInfo;
    const [page, setPage] = pageInfo;
    const [loading, setLoading] = loadingInfo;


  useEffect(() =>{

    updateMetaData(ScreenType.Browse, MetaType.Title, null );
    updateMetaData(ScreenType.Browse, MetaType.Description, null);
    
    return () => {
        setLoading(true)
        getData();
    }
  },[])


  const getData = async()=> {
    let xPage = 1;
    setPage(xPage);
    let options ={type: type}
    if(typeof genres !== 'undefined' ) {
       options ={genres: genres, type: type}
    }
    const data = await FetchData( (typeof genres !== 'undefined'  )?FetchType.filterManga:FetchType.fetchAmimeLatest, xPage, options) 
    setAnimeList(data);  
    setLoading(false);
  }

  return (
      <div className="App">
          <Header />
          <Spinner />
          <div className='clear' />
          <div className='clear' />
          <div className='clear' />
          <div className='clear' />
          <div className='clear' />
          <div className='clear' />
          <>
            <div className='container'>
                <h3>Filter</h3>
                <hr  style={{margin:'0px'}}/>
            </div>
            <FilterBox />
            {(animeList.length > 0) ?
                <>
                <AnimeList />
                <LoadMore screen={ScreenType.Filter} />
                </>
            :<Notound />
            }
          </>

          <div className='clear' />
      </div>
  );
}

