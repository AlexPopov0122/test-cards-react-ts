import React, {FC} from 'react';
import styled from "styled-components";
import cardLine from "../accets/card-line.svg"

const Block = styled.div`
width: 224px;
height: 364px;
border-radius: 12px;
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
const BlockPoints = styled.div`
position: absolute;
bottom: 9px;
right: 0;
left: 0;
margin: 0 auto;
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
`
const BlockPrice = styled.div`
display: inline-block;
width: 166px;
height: 25px;
border-radius: 8px;
background-color: #EAEAEA;
margin-right: 9px;
`
const Like = styled.div`
display: inline-block;
width: 25px;
height: 25px;
border-radius: 8px;
background-color: #EAEAEA;
`
const BlockTitle = styled.div`
width: 200px;
height: 14px;
border-radius: 6px;
background-color: #EAEAEA;
`

const Card: FC = () => {


    return (
        <Block>
            <BlockImage>
            <BlockPoints>
                <img src={cardLine} alt="line"/>
            </BlockPoints>
            </ BlockImage>
                <BlockText>
                    <div>
                        <BlockPrice></BlockPrice>
                        <Like></Like>
                    </div>
                    <BlockTitle></BlockTitle>
                    <BlockTitle></BlockTitle>
                </BlockText>
        </Block>
    );
};

export default Card;