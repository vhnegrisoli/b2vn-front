import styled from "styled-components";

export const Container = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  height: 100%;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;



