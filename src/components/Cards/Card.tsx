import React, {FC, useState} from 'react';
import styled from "styled-components";
import imgPointActive from "../../accets/image-point-active.svg";
import imgPoint from "../../accets/image-point.svg"
import {useNavigate} from "react-router-dom";
import {ICard} from "../../types/types";

const Block = styled.div`
width: 224px;
height: 364px;
border-radius: 12px;
color: #2C2C2C;
box-shadow: 0px 0px 16px 0px #00000014;
overflow: hidden;
`
const BlockImage = styled.div`
text-align: center;
position: relative;
width: 224px;
height: 260px;
background-color: #EAEAEA;
overflow: hidden;
`
const Checked = styled.div`
position: absolute;
width: 94px;
height: 24px;
font-size: 12px;
border-radius: 8px;
background-color: rgba(255, 255, 255, 0.9);
text-align: center;
line-height: 24px;
top: 11px;
left: 65px;
`
const BlockPoints = styled.div`
position: absolute;
width: 100%;
bottom: 10px;
`
const BlockText = styled.div`
position: relative;
display: flex;
flex-direction: column;
width: 224px;
height: 104px;
gap: 10px;
background-color: #fff;
padding: 10px 12px;
box-sizing: border-box;
cursor: pointer;
`
const BlockPrice = styled.strong`
font-size: 22px;
font-weight: 700;
`
const BlockTitle = styled.div`
font-size: 14px;
font-weight: 500;
`
const BlockData = styled.div`
display: flex; 
justify-content: space-between;
font-size: 12px;
color: #8F8F8F;
`
const BlockAddress = styled.div`
font-size: 12px;
color: #8F8F8F;
`
const BlockDate = styled(BlockAddress)`
font-size: 12px;
color: #8F8F8F;
`
const ImagePoint = styled.img`
width: 8px;
height: 8px;
margin: 0 5px;
cursor: pointer;
`
const ProductImage = styled.img`
width: 100%;
height: 100%;
`
const Like = styled.button<{isLike: boolean}>`
position: absolute;
top: 7px;
right: 8px;
color: ${({isLike}) => isLike ? "#00A0AB" : "#C7C7C7"};
font-size: 22px;
font-weight: 700;
background-color: transparent;
border: none;
cursor: pointer;
${({isLike}) => !isLike && "&:hover {color: #A4A4A4;"}
`

interface ICardProps {
    cardData: ICard
}

const Card: FC<ICardProps> = ({cardData}) => {

    const productImages: string[] = [
        "https://source.unsplash.com/random",
        "https://vsegda-pomnim.com/uploads/posts/2022-04/1649130989_35-vsegda-pomnim-com-p-prirodnii-landshaft-foto-48.jpg",
        "https://vsegda-pomnim.com/uploads/posts/2022-04/1649126106_1-vsegda-pomnim-com-p-samie-krasivie-peizazhi-prirodi-foto-1.jpg",
        "https://proprikol.ru/wp-content/uploads/2021/11/fordy-krasivye-kartinki-45.jpg"
    ]
    const [isLike, setLike] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string>(productImages[0]);
    const [activeImage, setActiveImage] = useState<number>(0);
    const navigate = useNavigate();

    let newIsoDate: string = "";
    for(const symbol of cardData.createdAt) {
        if(symbol !== " ") {
            newIsoDate += symbol;
        }
    }
    const newDate: string = new Date(newIsoDate).toLocaleString().slice(0, -3)

    const onImagePointClick = (index: number) => {
        setCurrentImage(productImages[index])
        setActiveImage(index)
    }
    const onLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setLike(!isLike)
    }
    const onRedirectCardPage = () => {
        navigate(`/port/${cardData.id}`)
    }

    // Перебираем массив с картинками товаров и добавляю переход к ним по onClick, картинки также могут приходить с сервера
    const imagesPoints = productImages.map((src, i) => <ImagePoint key={i} src={activeImage === i ? imgPointActive : imgPoint} onClick={() => onImagePointClick(i)} />)

    return (
        <Block>
            <BlockImage>
                <ProductImage src={currentImage} alt="product"/>
                {
                    cardData.seen && <Checked>Просмотрено</Checked>
                }
                <BlockPoints>{imagesPoints}</BlockPoints>
            </ BlockImage>
                <BlockText onClick={onRedirectCardPage}>
                    <Like onClick={onLikeClick} isLike={isLike}>&#10084;</Like>
                    <BlockPrice>
                        {/*Округление цены к среднему арифметическому*/}
                        {Math.ceil(cardData.price).toString().replace(/(.{3})/g,"$1 ")} &#8381;
                        {/*Если без регулярки то так)*/}
                        {/*{Math.ceil(card.price).toString().split("").reduce((acc, el, i, arr) => i === arr.length - 3 ? acc + " " + el : acc + el)}*/}
                    </BlockPrice>
                    <BlockTitle>
                        {cardData.title}
                    </BlockTitle>
                    <BlockData><BlockAddress>
                        {cardData.address}
                    </BlockAddress>
                        <BlockDate>
                            {newDate}
                        </BlockDate>
                    </BlockData>
                </BlockText>
        </Block>
    );
};

export default Card;