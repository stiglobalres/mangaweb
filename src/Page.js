import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Header from "./widgets/Header";
import Spinner from "./widgets/Spinner";

import { mainContext } from "./App";
import { 
    urlFormatter,
    mangaDetails ,
    FetchType
} from "./constant.ts";

import {  updateMetaData, ScreenType, MetaType, FetchData } from "./constant.ts";

export default function Page() {
    const { loadingInfo } = useContext(mainContext);
    const {chapter, chapterId, mangaId} = useParams();

    const [page, setPage] = useState(0); //<- current Page
    const [pages, setPages] = useState([]); //<- all the pages
    const [image, setImage] = useState(null); //<- current page image
    const [loading, setLoading] = loadingInfo;
    const [manga, setManga] = useState(mangaDetails);

    useEffect(()=>{
        return()=>{ 
            setLoading(true);
            getData(mangaId);
            getImages();
        }
    },[])

    useEffect(()=>{
        if(pages.length > 0) {
            setImage(pages[page].link)
        }
    },[pages])

    useEffect(()=>{
        updateMetaData(ScreenType.Details, MetaType.Title, urlFormatter(chapter,false) +' - '+ manga.title );
        updateMetaData(ScreenType.Details, MetaType.Description,  manga.summary );
    },[manga])

    const getData=async(id)=>{
        let data = await FetchData(FetchType.fetchManga, id);
        setManga(data);
    }

    const getImages=async()=>{
        let data = await FetchData(FetchType.fetchImage, chapterId);
        setPages(data);
    }

    const prev_action=()=>{
        if(page>0) {
            setLoading(true);
            let xPage = page-1;
            setPage(xPage);
            setImage(pages[xPage].link);
        }

    }
    const next_action=()=>{
        if(page < pages.length-1) {
            setLoading(true);
            let xPage = page+1;
            setPage(xPage);
            setImage(pages[xPage].link);
        }
    }

    const renderFooter=()=>{
        let result=[];
        for(let x=0; x< pages.length; x++) {
            let color=(page>=x) ? 'orange':'white';
            result.push(<span key={x} className="title" style={{color:color}}>-</span>);
        }
        return result;
    }

    const imageLoading=()=>{
        setLoading(false);
    }

    return(
        <div className="App bg-white">
            <Header />
            <Spinner />
           <div className="clear" />
           <div className="clear" />
           < >
                <div className="container">
                    <img  src={image} onLoad={() => imageLoading()} />
                </div>
           </>
           <div className="clear" />
            <a className="link-previous" onClick={()=>prev_action()}>
                <span>Previous</span>
            </a>
            <a className="link-next"  onClick={()=>next_action()}>
                <span>next</span>
            </a>
            <div className="page-footer">
                {renderFooter()}
            </div>
        </div>
    );
}