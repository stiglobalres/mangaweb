import  {useEffect, createContext, useContext} from 'react';

import './App.css';

import Header from './widgets/Header';
import Spinner from './widgets/Spinner';
import AnimeList from './widgets/AnimeList';
import  LoadMore from './outlets/loadMore'
import FilterBox from './outlets/FilterBox'
import Notound from './widgets/NotFound';

import { mainContext } from './App';

import { updateMetaData, ScreenType, MetaType, FetchData, FetchType } from './constant.ts';

export const AnimeContext = createContext();

export default function Browse() {
    const {loadingInfo, animeListInfo, pageInfo} = useContext(mainContext);
    const [animeList, setAnimeList] = animeListInfo;
    const [page, setPage] = pageInfo;
    const [loading, setLoading] = loadingInfo;


  useEffect(() =>{
    updateMetaData(ScreenType.Browse, MetaType.Title, null );
    updateMetaData(ScreenType.Browse, MetaType.Description, null);
    
    setLoading(true)
    getData();

  },[])


  const getData = async()=> {
    let data = [];
    let xPage = 1;
    setPage(xPage);
    data = await FetchData(FetchType.fetchAmimeLatest, xPage, {type:'all'});
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
                <h3>Latest Manga</h3>
                <hr  style={{margin:'0px'}}/>
            </div>
            <FilterBox />
            {(animeList.length > 0) ?
                <>
                <AnimeList />
                <LoadMore screen={ScreenType.Browse} />
                </>
            :<Notound />
            }
          </>

          <div className='clear' />
      </div>
  );
}

