export const BaseURL = 'https://mangaverse-api.p.rapidapi.com/';
export const Header = {
    headers: {
        'Content-Type' :'application/json',
        'x-rapidapi-host':'mangaverse-api.p.rapidapi.com',
        'x-rapidapi-key':'23fae9d917msh3568833b2d3237ep1edc18jsn09418feea833'
    }
};

export const LatestAnime = (page=1)=>{
    return BaseURL + 'manga/latest?page=' + page +'&nsfw=true&type=all';
}

export const fetchAmimeLatest =async(page=1)=> {
    try{
       const response = await fetch(LatestAnime(page), {
            ...
            Header
          });

          if(!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data.data;
    }
    catch(error) {
        console.log('Error: ', error);
    }
}