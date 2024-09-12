import { createContext, useState } from "react";
import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from "react-router-dom";

import Browse from "./Browse";
import Title from "./Title";
import Page from "./Page";
import Search from "./Search";
import Filter from "./Filter";

export const mainContext = createContext();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <mainContext.Provider value={{
      loadingInfo:[loading, setLoading], 
      animeListInfo:[animeList, setAnimeList],
      pageInfo:[page, setPage]
      }}>
      <BrowserRouter basename="/" >
        <Routes>
            <Route index element={<Browse />}  />
            <Route path="filter/:type?/:genres?" element={<Filter />}  />
            <Route path="title/:mangaId/:title" element={<Title />} />
            <Route path="chapter/:mangaId/:chapterId/:title/:chapter" element={<Page />} />
            <Route path="search/:keyword?" element={<Search />} />
        </Routes>
      </BrowserRouter>
   
    </mainContext.Provider>
  );
}