export interface ICard {
    id: string,
    seen: boolean,
    price: number,
    title: string,
    address: string,
    about: string,
    createdAt: string
}

export interface IPageAds {
    items: ICard[]
    size: number
    total: number
}