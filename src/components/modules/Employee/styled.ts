import styled from 'styled-components';

export const EmployeeContainer = styled.div`
  height: 350px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  filter: grayscale(100%);
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: grayscale(0%);
  }
`;

export const EmployeeInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 0.6rem;
  row-gap: 0.5rem;
  transform: translateY(35px);
  transition: transform 0.3s ease-in-out;

  ${EmployeeContainer}:hover & {
    transform: translateY(0);
  }
`

export const EmployeeName = styled.h2`
  font-size: 1.1rem;
  color: #80BB00;
  margin: 0;
  padding: 0;
  text-align: right;
  padding-right: 20px;
`;

export const EmployeeFunction = styled.p`
  font-size: 1rem;
  color: #fff;
  margin: 0;
`;
