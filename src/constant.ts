import * as CryptoJS from 'crypto-js'

import { fetchImage, fetchManga, fetchChapter, fetchAmimeLatest, filterManga, searchManga } from "./api";

export const ScreenType ={
    Browse: 'browse',
    Details:'details',
    Page:'page',
    Filter: 'filter'
}
export const MetaType ={
    Title: 'title',
    Description:'description'
}

export const FetchType = {
    fetchManga: 'fetchManga',
    fetchImage: 'fetchImage',
    fetchChapter: 'fetchChapter',
    fetchAmimeLatest: 'fetchAmimeLatest',
    filterManga: 'filterManga',
    searchManga : 'searchManga'
}

export const mangaDetails = {
    "id": "",
    "title": null,
    "sub_title": null,
    "status": null,
    "thumb": null,
    "summary": null,
    "authors": [],
    "genres": [],
    "nsfw": false,
    "type": null,
    "total_chapter": 0,
    "create_at": 1720482950132,
    "update_at": 1720482950132
}

type Screen = "browse" | "details" | "page" | "filter";
type Meta = "title" | "description";
type FetchOption = "fetchManga" | "fetchImage" | "fetchChapter" | "fetchAmimeLatest" | "searchManga";

const secretKey = process.env.REACT_APP_SECRET_KEY;

type FetchObjOptions={
    genres?: string,
    type?: string
}

export const urlFormatter  = (str: string, encode: boolean=true)  => {
    let trimmedString = str.trim();
    let formattedString = (encode) ? trimmedString.replace(/\s+/g, '-') : trimmedString.replace(/-/g, ' ')
    return formattedString;
}

export const pageTitleFormatter=(screen: Screen, str: string)=>{
    let pageTitle: string='';
    switch(screen){
        case ScreenType.Details:
            pageTitle=str;
            break;
        default:
            pageTitle="Manga DB: Explore the Latest Manga Collection for Your Enjoyment";
    }
    return pageTitle;
}

export const updateMetaData=(screen: Screen, type: Meta, str: string )=>{
    if(type==MetaType.Title) {
        document.title = pageTitleFormatter( screen, pageTitleFormatter(screen, str) );
    }
    else if(type==MetaType.Description) {
        let description: string ='Discover the diverse and up-to-date collection of manga in our Manga Database, offering a wide range of genres and series for you to explore and enjoy at your leisure.';
        if(str !== null) {
            switch(screen) {
                case ScreenType.Details:
                    description = str.slice(0, 157) + '...';
                    break;
            }
        }
        let descMeta=document.querySelector("meta[name='description']")
        descMeta.setAttribute("content", description)
    }
}

export const encryptJSON=(data: object)=>{
    let expiry = new Date();
    expiry.setHours(expiry.getHours() + 6)
    let tmpData = {
        expiry: expiry.valueOf(),
        data: data
    }
   return CryptoJS.AES.encrypt(JSON.stringify(tmpData), secretKey).toString();
}

export const decryptJSON=(data: string)=>{
    const bytes = CryptoJS.AES.decrypt(data, secretKey )
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 }

 export const FetchData =async(fetchType: FetchOption, search: string, options:FetchObjOptions={} )=>{
    let data: any = null; 
    let cacheName = '';
    switch(fetchType) {
        case FetchType.fetchManga:
            data = localStorage.getItem('mangaId-'+search);
            if(data===null) {
                data = await fetchManga(search);
                const encyptedData = encryptJSON(data);
                localStorage.setItem('mangaId-'+search, encyptedData);
            }
            else {
                let result = decryptJSON(data); 
                data = result.data;

                let now = new Date().valueOf();
                if(now > result.expiry) {
                    data = await fetchManga(search);
                    const encyptedData = encryptJSON(data);
                    localStorage.setItem('mangaId-'+search, encyptedData);
                }
            }
            break;

        case FetchType.fetchImage:
            data = localStorage.getItem('imagesId-'+search);
            if(data === null) {
                data = await fetchImage(search)
                const encyptedData = encryptJSON(data);
                localStorage.setItem('imagesId-'+search, encyptedData);
            }
            else {
                let result = decryptJSON(data); 
                data = result.data; 
            }
            break;

        case FetchType.fetchChapter:
            data = localStorage.getItem('chapter-'+search);
            if(data ===null) {
                data = await fetchChapter(search);
                const encyptedData = encryptJSON(data);
                localStorage.setItem('chapter-'+search, encyptedData );
            }
            else {
                let result = decryptJSON(data); 
                data = result.data;
                
                let now = new Date().valueOf();
                if(now > result.expiry) {
                    data = await fetchChapter(search);
                    const encyptedData = encryptJSON(data);
                    localStorage.setItem('chapter-'+search, encyptedData );
                }
            }
            break;

        case FetchType.fetchAmimeLatest:
            let type = (typeof options.type !=='undefined') ? options.type : 'all'
             cacheName = 'latestmanga-'+ type+'-page-'+search;
            data = localStorage.getItem(cacheName);
            if(data ===null) {
                data = await fetchAmimeLatest(search, type);
                const encyptedData = encryptJSON(data);
                localStorage.setItem(cacheName, encyptedData );
            }
            else {
                let result = decryptJSON(data); 
                data = result.data;
                
                let now = new Date().valueOf();
                if(now > result.expiry) {
                    data = await fetchAmimeLatest(search, type);
                    const encyptedData = encryptJSON(data);
                    localStorage.setItem(cacheName, encyptedData );
                }
            }
            break;

        case FetchType.filterManga:
            let genres =  urlFormatter(options.genres);
            cacheName = 'filtermanga-'+ options.type+'-'+ genres +'-page-'+search;

            data = localStorage.getItem(cacheName);
            if(data ===null) {
                data = await filterManga( search, options.genres, options.type);
                const encyptedData = encryptJSON(data);
                localStorage.setItem(cacheName, encyptedData );
            }
            else {
                let result = decryptJSON(data); 
                data = result.data;
                
                let now = new Date().valueOf();
                if(now > result.expiry) {
                    data = await filterManga( search, options.genres, options.type);
                    const encyptedData = encryptJSON(data);
                    localStorage.setItem(cacheName, encyptedData );
                }
            }

            break;
        
        case FetchType.searchManga:

            data = localStorage.getItem('search-'+search);
            if(data===null) {
                data = await searchManga(search);
                const encyptedData = encryptJSON(data);
                localStorage.setItem('search-'+search, encyptedData);
            }
            else {
                let result = decryptJSON(data); 
                data = result.data;

                let now = new Date().valueOf();
                if(now > result.expiry) {
                    data = await searchManga(search);
                    const encyptedData = encryptJSON(data);
                    localStorage.setItem('search-'+search, encyptedData);
                }
            }
            break;
    }

    return data;
 }