import React from 'react';
import {FC} from 'react';
import Card from "./Card";
import styled, {keyframes} from "styled-components";
import PreloaderCard from "../PreloaderCard";
import ShowMorePreloaderImage from "../../accets/show-more-preloader.svg";
import {ICard} from "../../types/types";

interface ICardsProps {
    cards: Array<any>
    isFetching: boolean
    isShowMorePreloader: boolean
    isError: boolean
    setShowMore: (isShowMore: boolean) => void
    isShowMore: boolean
    isTotalPageCount: boolean
}

const BlockCardsContainer = styled.div<{isTotalPageCount: boolean}>`
display: flex; 
flex-direction: column;
align-items: center;
${({isTotalPageCount}) => isTotalPageCount && "margin-bottom: 50px"}
`
const BlockCards = styled.div`
display: flex; 
flex-wrap: wrap;
gap: 24px;
width: 100%;
justify-content: center;
margin-top: 50px;
`
const Button = styled.button`
font-size: 14px;
font-weight: 500;
color: #00A0AB;
border-radius: 45px;
border: none;
background-color: #fff;
margin: 31px 0;
cursor: pointer;
`
const preloaderAnimation = keyframes`
0% {
transform: rotateZ(0deg)
}
25% {
transform: rotateZ(90deg)
}
50% {
transform: rotateZ(180deg)
}
75% {
transform: rotateZ(270deg)
}
100% {
transform: rotateZ(360deg)
}
`
const ShowMorePreloader = styled.img`
height: 33px;
width: 33px;
margin: 31px 0;
animation: ${preloaderAnimation} 1s infinite linear;
`
const Error = styled.div`
margin-top: 31px;
`

const Cards: FC<ICardsProps> = ({cards, isFetching, isShowMorePreloader, isError, setShowMore, isShowMore, isTotalPageCount}) => {

    let preCards: number[] = [];

    for(let i = 1; i <= 20; i++) {
        preCards.push(i);
    }

    return (
        <BlockCardsContainer isTotalPageCount={isTotalPageCount}>
            <BlockCards>
                {
                    !isFetching ? cards.map((cardData: ICard) => <Card key={cardData.id} cardData={cardData}/>) : preCards.map((preCard, i) => <PreloaderCard key={i}/>)
                }
            </BlockCards>
            {
                !isTotalPageCount && (!isError
                ? (!isShowMorePreloader ? <Button onClick={() => setShowMore(!isShowMore)}>Показать еще</Button> : <ShowMorePreloader src={ShowMorePreloaderImage} alt={"preloader"}/>)
                    : <>
                        <Error>Ошибка при загрузке</Error>
                        <Button onClick={() => setShowMore(!isShowMore)}>Повторить попытку</Button>
                    </>)
            }
        </BlockCardsContainer>
    );
};

export default Cards;