import { generatePath, Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../App";
import { flags } from "../api";
import { urlFormatter } from "../constant.ts";


export default function AnimeList() {
    const {animeListInfo} = useContext(mainContext);
    const [animeList] = animeListInfo;

    
    const animeItem = animeList.map((anime, id) => {
          let url = urlFormatter(generatePath('/title/:mangaId/:title', {
            mangaId: anime.id,
            title:  anime.title
          }));
          let flagIcon = (typeof flags[anime.type] === "string") ? 'fi fi-' +flags[anime.type]: '';
       
          return(
          <div key={id} className='Anime-item mb-20' >
            <Link to={url} title={anime.title} state={{mangaTitle:anime.title, mangaId:anime.id}} >
              <div  className='Anime-thumb' > 
                  <img src={anime.thumb} alt={anime.title}/>
                  <div className="Anime-badge-container">
                  <span id={'chapter_badge_'+anime.id} className="badge mr-5 capitalize"><i className="fa fa-book"></i> {anime.total_chapter}</span>
                  <span id={'flag_badge_'+anime.id} className="badge mr-5 capitalize"><i className={flagIcon}></i> {anime.type}</span>
                  </div>
              </div>
              <span>{anime.title}</span>
            </Link>
          </div>
          )
      })

    return(
        <>
            <div className='container' >
                <div className='dflex-space-between'>
                {animeItem}
                </div>
            </div>
        </>
    )
}
