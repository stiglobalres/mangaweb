import { useEffect, useState } from "react"
import { useParams, useLocation, generatePath } from "react-router-dom";

import { Genres, mangaType } from "../api"
import { urlFormatter } from "../constant.ts";

export default function FilterBox() {
    const location = useLocation();
    const params = useParams();
    const [genreList, setGenreList] = useState([]);
    const [genres, setGenres] = useState([...Genres]);
    const [selectedGenres, setSelectedGenres] =useState([]);
    const [formUrl, setFormUrl] =useState([]);
    const [type, setType] =useState(params.type??'all');

    useEffect(()=>{
        if(location.pathname==='/')
        {
            setGenres([...Genres]);
            setSelectedGenres([]);
            let tmpArr=genres;
            tmpArr.map((item, id)=>{
                item.active= 0;
            });
            setGenres(tmpArr);
        }
        else 
        {
            if(params.genres) {
                let tmpselectedGenres =[];
                let tmpGenres = params.genres.split(',')
                let tmpArr=genres;
                tmpArr.map((item, id)=>{
                    item.active= (tmpGenres.includes(item.name)) ? 1:0;
                    if(item.active) {
                        tmpselectedGenres.push(item.name);
                    }
                })
                setGenres(tmpArr);
                setSelectedGenres(tmpselectedGenres);
            }
        }
        renderGenres();
    },[])

    useEffect(()=>{
        let url= urlFormatter(generatePath('/filter/:type/:genres', { type: type , genres: selectedGenres.toString()  }));
        setFormUrl(url);
    },[selectedGenres, type])

    const renderGenres=()=>{
        let result=[];
        genres.map((item, id)=>{
            let className = (item.active) ? "genre-box mr-10  box mb-20 round-corner bg-highlight" :"genre-box mr-10 box mb-20 round-corner ";
            result.push(<a className="mb-20"  key={id} onClick={()=>selectGenre(item.name, item.active)}><label className={className} >{item.name}</label></a>)
        })
        setGenreList(result);
    }

    const selectGenre=(name, active)=>{
        let tmpGenres = genres;
        let tmpselectedGenres =[];
        tmpGenres.map((item, id)=>{
            if(item.name=== name) {
                item.active = !active
            }

            if(item.active) {
                tmpselectedGenres.push(item.name);
            }
        })
        setGenres(tmpGenres);
        setSelectedGenres(tmpselectedGenres);
        renderGenres();
    }

    const selectType =(e)=>{
        setType(e.target.value);
    }

    const filterSearch=(event)=>{
        event.preventDefault();
        event.target.submit();
        return false;
    }

    return (
        <div className='container'> 

            <div className="round-corner bg-secondary">
                <form onSubmit={filterSearch} action={formUrl}>
                    <div className="container">
                        <span className="uppercase-bold mr-10">Type</span>
                        <select className="genre-box" defaultValue={type.toLowerCase()} onChange={selectType}>
                            <option value="all">All</option>
                            {
                                mangaType.map((item, id) => {
                                    return (<option key={id} value={item.toLowerCase()}>{item}</option>)
                                })
                            }
                        </select>
                        <div className="clear" />
                        <span className="uppercase-bold">Genre:</span>
                        <div className="dlfex-wrap mt-15">
                        {genreList}
                        </div>
                        <div className="clear" />
                        <button type="submit" >Apply</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

