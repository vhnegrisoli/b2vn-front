import styled from "styled-components";



export const Form = styled.form`
  width: 100%;
  height: 70vh;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    height: 12vh;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #ffffff;
    font-size: 16px;
    font-weight:bold;
    background: #ed5176;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #259FA8;
    text-decoration: none;
  }
`;






export const SplitLeft = styled.div`
height: 100%;
width: 70%;
position: fixed;
z-index: 1;
top: 0;
overflow-x: hidden;
padding-top: 20px;
left: 0;
background-color: #fffff;
`;

export const SplitRight = styled.div`
height: 100%;
width: 30%;
position: fixed;
z-index: 1;
top: 0;
overflow-x: hidden;
padding-top: 20px;

right: 0;
background-color: #ffffff;
`;




export const Centered = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
text-align: center;
`;






