
import { useEffect, createContext, useContext, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import Header from "./widgets/Header";
import Spinner from "./widgets/Spinner";
import AnimeList from "./widgets/AnimeList";
import FilterBox from './outlets/FilterBox.js';
import Notound from './widgets/NotFound';

import { mainContext } from "./App";
import { FetchData, FetchType } from './constant.ts';

export const AnimeContext = createContext(null);


export default function Search() {
    const params = useParams();
    const {loadingInfo, animeListInfo} = useContext(mainContext);
    const [animeList, setAnimeList] = animeListInfo;
    const [loading, setLoading] = loadingInfo
    const [keyword , setKeyword] = useState(params.keyword??'all')
    
    useEffect(()=>{
        return()=>{
            setLoading(true);
            getData();
        }
    },[])

    const getData = async()=> {
        const data = await FetchData( FetchType.searchManga , keyword) ;
          setLoading(false);
          setAnimeList(data);  
      }

    return(
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
                <h3>Search: {params.keyword}</h3>
                <hr  style={{margin:'0px'}}/>
            </div>
            <FilterBox />
            {(animeList.length > 0) ?
                <>
                <AnimeList />
                </>
            :<Notound />
            }
          </>

        </div>
    );
}
