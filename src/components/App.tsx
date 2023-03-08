import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import Cards from "./Cards/Cards";
import {ads} from "../api/api";
import ErrorMassage from "./ErrorMassage";
import {Navigate, Route, Routes} from "react-router-dom";
import CardPage from "./Cards/CardPage";
import {ICard, IPageAds} from "../types/types";

const App: FC = () => {
    const [pageCount, setPageCount] = useState<number>(1)
    const [cards, setCards] = useState<ICard[]>([])
    const [isFetching, setFetching] = useState<boolean>(true);
    const [isShowMorePreloader, setShowMorePreloader] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);
    const [isShowMore, setShowMore] = useState<boolean>(false);
    const [isTotalPageCount, setTotalCount] = useState<boolean>(true);

    useEffect(() => {
        fetchData()
    }, [isShowMore])

    async function fetchData() {
        const addPageAds = (response: IPageAds, newPageCount: number, newCards: ICard[]) => {
            setCards(newCards)
            setPageCount(newPageCount)
            setTotalCount(Math.ceil(response.total / response.size) < newPageCount)
        }
        setShowMorePreloader(true)
        setError(false)
        try {
            const response = await ads.getPageAds(pageCount)
            const response2 = await ads.getPageAds(pageCount + 1)
            if(response2.statusText === "OK") {
                addPageAds(response2.data, pageCount + 2, [...cards, ...response.data.items, ...response2.data.items])
            } else if(response.statusText === "OK") {
                addPageAds(response.data, pageCount + 1, [...cards, ...response.data.items])
            } else {
                throw new Error("Ошибка при загрузке")
            }
            setFetching(false)
            setShowMorePreloader(false)
        } catch (error) {
            setError(true)
        }
    }

  return (
      <main>
          <Routes>
          {
              <Route path={"/"}
                     element={
                  (isError && !cards[0])
                  ? <ErrorMassage/>
                  : <Cards isTotalPageCount={isTotalPageCount} cards={cards}
                           setShowMore={setShowMore} isShowMore={isShowMore}
                           isFetching={isFetching} isShowMorePreloader={isShowMorePreloader}
                           isError={isError}/>
                }/>
          }
              <Route path={"/port/:id?"}
                     element={<CardPage/>}/>
          </Routes>
      </main>
  );
};

export default App;
