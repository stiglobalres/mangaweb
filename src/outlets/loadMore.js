import  { useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import {  filterManga } from '../api';

import { mainContext } from '../App';

import { ScreenType, FetchData, FetchType } from '../constant.ts';

export default function LoadMore({screen}) {
    const {genres, type} = useParams();
    const {animeListInfo, pageInfo, loadingInfo} = useContext(mainContext);
    const [animeList, setAnimeList] = animeListInfo;
    const [page, setPage] = pageInfo;
    const [loading, setLoading] = loadingInfo;
    const [hideLoadMore, setHideLoadMore] = useState(false);

    const loadMoreData=()=>{
        setLoading(true);
        let xPage = page + 1;
        setPage(xPage);
        getData(xPage);
    }

    const getData = async(page)=> {
        let data = [];
        if(screen == ScreenType.Browse) {
            data = await FetchData(FetchType.fetchAmimeLatest, page);
        }
        else
        {
            data = await filterManga(page, genres, type)
        }

        let item = [...animeList, ...data];

        if(data.length > 0) {
            setHideLoadMore(false);
        } 

         setAnimeList(item);  
         setLoading(false);
     }

    if(hideLoadMore || loading) {
        return null;
    }
    return (
        <div className='container'>
            <a className='text-center' onClick={()=>loadMoreData()}>
                <div className='loadmore-box round-corner bg-highlight'>
                    <span>Load more</span>
                </div>
            </a>
        </div>
    )
}