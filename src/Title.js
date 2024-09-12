import { createContext, useContext, useEffect, useState } from "react";
import { useParams, Link, generatePath } from "react-router-dom"

import Header from "./widgets/Header";
import Spinner from "./widgets/Spinner";
import Flatlist from "./widgets/Flatlist";

import { mainContext } from "./App";
import { 
    urlFormatter, 
    updateMetaData, 
    ScreenType, 
    MetaType, 
    mangaDetails ,
    FetchData,
    FetchType
} from "./constant.ts";

export const AnimeInfoContext = createContext();

export default function Title() {
    const {loadingInfo } = useContext(mainContext);
    const { mangaId } = useParams();
    const [manga, setManga] = useState(mangaDetails);
    const [chapters, setChapters] = useState([]);
    const [publication, setPublication] = useState('');
    const [loading, setLoading] = loadingInfo;

    useEffect(()=> {
        setLoading(true);
        getData(mangaId);
        getChapters(mangaId);
    },[]);

    useEffect(()=>{
        let created_at = new Date( parseInt(manga.create_at));
        let publication = created_at.toLocaleString('en-US', {month:'short'}) + ' ' + created_at.getFullYear();
        setPublication(publication);
        setLoading(false);
        
        updateMetaData(ScreenType.Details, MetaType.Title,  manga.title );
        updateMetaData(ScreenType.Details, MetaType.Description,  manga.summary );
    },[manga])


    const getData=async(id)=>{
        let data = await FetchData(FetchType.fetchManga, id);
        setManga(data);
    }

    const getChapters =async(id)=>{
        let data = await FetchData(FetchType.fetchChapter, id);
        setChapters(data);
    }

    return (
        <AnimeInfoContext.Provider value={manga} >
        <div className="App">
            <Header />
            <Spinner />
            <div className="Title-container-Banner">
                <img className="opacity-20" src={manga.thumb} />
            </div>
            <div className="pos-relative">
                <div className="clear" />
                <div className="clear" />
                <div className="clear" />
                <div className="clear" />
                <div className="clear" />
                <div className="clear" />
                <div className="dflex-end">
                    <div className="container col-70vw col-65vw col-80vw col-100vw">
                        <div><span className="title">{manga.title}</span></div>
                        <div><span className="subtitle">{manga.sub_title}</span></div>
                        <div>
                            <span className="capitalize">Authors: {manga.authors.join(", ")}</span>
                        </div>
                        <div><span className="capitalize">{manga.type}</span></div>
                    </div>
                </div >
                <div className="manga-thumb-container left-30 bg-white dflex-center box top-80 pos-absolute mb-20 round-corner">
                    <img className="thumb round-corner" src={manga.thumb} />
                </div>
                <div className="Title-description-container bg-primary pos-relative mt-5 col-100">
                    <div className="dflex-end">
                        <div className="container  col-70vw col-65vw col-80vw col-100vw">
                            <div style={{display:'flex', flexWrap:'wrap'}}>
                                <RenderGenres />
                            </div>
                            <div className="mt-15 ">
                                <span className="uppercase-bold">{publication}, {manga.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <span>{manga.summary}</span>
                    </div>
                    <Flatlist render={{
                        title:'Chapters',
                        data:chapters,
                        sort:'create_at'
                    }} />
                </div>
             </div>
        </div>
        </AnimeInfoContext.Provider>
    )
}

function RenderGenres() {
    const manga = useContext(AnimeInfoContext);

    let result =[];
    manga.genres.map((item, id)=> {
        let url= urlFormatter(generatePath('/filter/:type/:genres', { type:'all', genres: item  }));
        result.push(<Link key={id} to={url}><span  className="genre-box mr-5 mb-10 bg-secondary  box mb-20 round-corner">{item}</span></Link>)
    });
    return result;
}