import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 10px;
  display: flex;
  flex-direction: column;
`;



export const PinYellow = styled.div`
  height: 7px;
  width: 7px;
  background-color: yellow;
  border-radius: 50%;
  display: inline-block;
`;

export const PinRed = styled.div`
  height: 7px;
  width: 7px;
  background-color: red;
  border-radius: 50%;
  display: inline-block;
`;

export const PinBlue = styled.div`
  height: 7px;
  width: 7px;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
`;

export const PinGreen = styled.div`
  height: 7px;
  width: 7px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
`;



export const PointReference = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  i {
    color: #fc6963;
    pointer-events: all;
    font-size: 50px;
    margin-top: 112px;
    margin-left: 12px;
    -webkit-text-fill-color: #fc6963;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${() => darken(0.05, "#fc6963")};
  }
  div {
    margin-top: 100px;
    button {
      border: none;
      font-size: 15px;
      height: 46px;
      margin: 0 10px;
      background-color: #fc6963;
      color: #ffffff;
      padding: 0 20px;
      border-radius: 3px;
      pointer-events: all;
      text-align: center;
      &.cancel {
        background: #ffffff;
        color: #333333;
      }
    }
  }
`;