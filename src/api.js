import { MangaData } from "./mockData/mangaInfo";
import { mangaListData } from "./mockData/mangaListData";
import { chaptersData } from "./mockData/chapterListData";
import { filterMangaData } from "./mockData/filterManga";

const MockData = false;

export const flags ={
    'japan':'jp',
    'china':'cn',
    'korea':'kr'
};

export const Genres = [
    {name:'Action', active:0}, 
    {name:'Adventure', active:0},  
    {name:'Cars', active:0},  
    {name:'Comedy',active:0}, 
    {name:'Demons',active:0}, 
    {name:'Drama',active:0},  
    {name:'Ecchi',active:0}, 
    {name:'Fantasy',active:0},
    {name:'Game',active:0}, 
    {name:'Harem',active:0},
    {name:'Historical',active:0},
    {name:'Horror',active:0}, 
    {name:'Isekai',active:0},  
    {name:'Josie',active:0},  
    {name:'Kids',active:0}, 
    {name:'Magic',active:0},
    {name:'Martial Arts',active:0},  
    {name:'Mecha',active:0}, 
    {name:'Military',active:0},  
    {name:'Music',active:0},  
    {name:'Mystery',active:0},  
    {name:'Parody',active:0},  
    {name:'Police',active:0}
];

export const mangaType =['China', 'Korea','Japan']

const BaseURL = process.env.REACT_APP_API_URL
const Header = {
    headers: {
        'Content-Type' :'application/json',
        'x-rapidapi-host':process.env.REACT_APP_API_HOST,
        'x-rapidapi-key': process.env.REACT_APP_API_HOST_KEY
    }
};

const options = {...Header};

const LatestAnimeUrl = (page=1, type='all')=>{
    return BaseURL + '/latest?page=' + page +'&nsfw=true&type='+type.toLowerCase();
}

const getMangaUrl =(id)=> { return BaseURL + '?id='+id }

const getChapterUrl =(id)=> {  return BaseURL + '/chapter?id='+id }

const getImageUrl =(id)=> {return BaseURL + '/image?id='+id }

const searchMangaUrl=(keyword, type='all')=>{ return BaseURL + '/search?text='+keyword+'&nsfw=true&type='+type.toLowerCase()}

const fetchMangaUrl=(page=1, genres='', type='all')=>{ return BaseURL + '/fetch?page='+page+'&genres='+genres+'&nsfw=true&type='+type.toLowerCase()}

const getResponse=async(response)=>{
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
}

export const genreList=()=> {
    return Genres;
}

export const getMangaType=()=> {
    return mangaType;
}

export const fetchAmimeLatest =async(page=1, type='all')=> {
    if(MockData) {
        return mangaListData
    }

    try{
       const response = await fetch(LatestAnimeUrl(page, type), options);

        return await(getResponse(response));
    }
    catch(error) {
        console.log('Error: ', error);
    }
}

export const fetchManga=async(id)=> {
    if(MockData) {
        return MangaData
    }

    try {
        const response = await fetch(getMangaUrl(id), options);

        return await(getResponse(response));
    }
    catch(error) {
        console.log('Error: ', error);
    }
}

export const fetchChapter=async(id)=> {
    if(MockData) {
        return chaptersData
    }

    try {
        const response = await fetch(getChapterUrl(id), options);

        return await(getResponse(response));
    }
    catch(error) {
        console.log('Error: ', error);
    }
}

export const fetchImage=async(id)=> {
    try {
        const response = await fetch(getImageUrl(id), options);
        return await(getResponse(response));
    }
    catch(error) {
        console.log('Error: ', error);
    }
}

export const searchManga=async(keyword='')=>{
    try {
        const response = await fetch(searchMangaUrl(keyword), options);
        return await(getResponse(response));
    }
    catch(error) {
        console.log('Error: ', error);
    }
}

export const filterManga=async(page=1, genres='', type='all') =>{
    if(MockData) {
        return filterMangaData
    }
    try {
        const response = await fetch(fetchMangaUrl(page, genres, type), options);
        return await(getResponse(response));
    }
    catch(error) {
        console.log('Error: ', error);
    }
}

