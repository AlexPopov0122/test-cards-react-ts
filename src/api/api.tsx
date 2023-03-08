import axios from "axios";
import {ICard, IPageAds} from "../types/types";

const instance = axios.create({
    baseURL: "https://testguru.ru/frontend-test/api/v1/ads"
})

export const ads = {
    getPageAds(pageCount: number) {
        return instance.get<IPageAds>(`?page=${pageCount}`)
    },
    getCardPage(id: string | undefined) {
        return instance.get<ICard>(`/${id}`)
    }
}