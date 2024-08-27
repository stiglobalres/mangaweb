import  {useEffect, useState, createContext, useContext, useMemo} from 'react';
import './App.css';

import { fetchAmimeLatest } from './fetchConfig';

export const AnimeContext = createContext();

export default function App() {

  const [reachedBottom, setReachBottom] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] =useState(1);
  const [isfetch, setIsfetch] = useState(true);

  useEffect(() =>{
    return () => {
      console.log('isfetch: '+ isfetch)
      if(isfetch) {
        getData();
      }
      }
  },[isfetch])

  useEffect(()=>{


    const onscroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight
      const threshold = 10
      const isReachBottom = document.body.scrollHeight - threshold <= scrolledTo
      console.log(window.scrollY + '= '+ document.body.scrollHeight) ;
      if(reachedBottom != isReachBottom  ) {
          setReachBottom(isReachBottom);
          setIsfetch(true);
          //setPage(page + 1);

      }
    }
    window.addEventListener("scroll", onscroll);
      return () => {
        window.removeEventListener("scroll", onscroll);
    };
  },[isfetch])

  const getData = async()=> {
  
     const data = await fetchAmimeLatest(page)
     let item = [...animeList, ...data];
   /*
     console.log(page);
      let item = [...animeList];
      let tmp = item.length+1;
    
      for(let x = tmp;  x< tmp+24; x++)
      {
        item.push(  { id:x, title:'title '+x });
      }
*/
      setAnimeList(item);  
      setIsfetch(false);
  }


  return (
    <AnimeContext.Provider value={animeList} >
      <div className="App">
          <RenderHeader />
          <div className='Main-container'>
            <div className='Anime-list'>
              <RenderAnimeList />
            </div>
          </div>

      </div>
    </AnimeContext.Provider>
  );
}

function generateURL(name, title){
  return 'this-is-a-test-122323';
}


function RenderHeader() {
  return(
    <div className='App-header'>
        <header>Manga</header>
        <div>
          <input type='search' placeholder='Search' />
        </div>
    </div>
  );
}

function RenderAnimeList() {
  const animeList = useContext(AnimeContext);
  //this.generateURL(anime.title, anime.id)
  const animeItem = animeList.map((anime) => {
    let title = anime.title;
    title= title.replace(/\s+/g, '-').toLowerCase();
    let url =`anime/${title}-${anime.id}`;
    return(
      <div key={anime.id} className='Anime-item' >
        <a href={url} title={anime.title} >
          <div  className='Anime-thumb' > 
            <img src={anime.thumb} />
          </div>
          <span>{anime.title}</span>
        </a>
      </div>
    )}
    )
    return animeItem;

}

