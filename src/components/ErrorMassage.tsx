import React, {FC} from 'react';
import styled from "styled-components";


const ErrorBlock = styled.h1 `
position: fixed;
width: 250px;
height: max-content;
text-align: center;
left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
`

const Header = styled.h1 `
font-weight: 500;
font-size: 17px;
color: #00A0AB;
`
const Text = styled.h1 `
font-weight: 400;
font-size: 14px;
color: #8F8F8F;
`

const ErrorMassage: FC = () => {
    return (
        <ErrorBlock>
            <Header>ОБЪЯВЛЕНИЙ НЕ НАЙДЕНО</Header>
            <Text>Простите, по вашему запросу товаров сейчас нет. Задайте запрос по-другому или измените характеристики</Text>
        </ErrorBlock>
    );
};

export default ErrorMassage;