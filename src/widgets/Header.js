import { useState } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";


export default function Header() {
  const [keyword, setKeyword] = useState('');


  const search=(text)=>{
    setKeyword(text)
  }

  const searchSubmit=()=>{
    let url= generatePath('/search/:keyword', { keyword: keyword  });
    const newForm = document.createElement('form');
    newForm.setAttribute('method','get');
    newForm.setAttribute('action', url);
    document.body.appendChild(newForm);
    newForm.submit();
  }

  return(
    <div className='pos-fixed col-100 bg-secondary border-bottom'>
      <div className="App-header-container pl-30 pr-30">
        <Link to={'/'}  ><h2>Manga</h2></Link>
        <form>
            <input id="search" name="search" type='search' placeholder='Search' 
            onChange={(e)=>search(e.target.value)}
            onKeyDown={(e)=>{ 
              if(e.key==='Enter') { 
              e.target.blur();
                searchSubmit()
              } 
            }}
            onBlur={searchSubmit}
            className="bg-primary"
            />
            </form>
      </div>      
    </div>
  );
}