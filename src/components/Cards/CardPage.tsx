import React, {FC, useEffect, useState} from 'react';
import {ads} from "../../api/api";
import {useParams} from "react-router-dom";
import Card from "./Card";
import {ICard} from "../../types/types";

const CardPage: FC = () => {

    const [cardData, setCard] = useState<ICard | any>(null)
    const [isFetching, setFetching] = useState<boolean>(true);
    const { id } = useParams<string>();

    useEffect(() => {
        setFetching(true)
        fetchData()
    }, [id])

    async function fetchData() {
        try {
            const response = await ads.getCardPage(id)
            if(response.statusText === "OK") {
                setCard(response.data)
            } else {
                throw new Error("Ошибка при загрузке")
            }
            setFetching(false)
        } catch (error: any) {
            // Some error.
            alert(error.message)
        }
    }

    return (
        <>
            {
                !isFetching && <Card cardData={cardData}/>
            }
        </>
    );
};

export default CardPage;