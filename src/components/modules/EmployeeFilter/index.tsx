import * as React from 'react';

import { Button } from 'common';

import { FilterContainer } from './styled';
import { log } from 'console';

export const EmployeeFilter = ({ employeeFunctions, onFilter }) => {

  // Filter all duplicates out of the employeeFunctions array
  const uniqueFunctions = employeeFunctions.filter((value, index, self) => self.indexOf(value) === index);

  // Count how many times each function appears in the array employeeFunctions
  const countFunctions = uniqueFunctions.map((employeeFunction) => {
    return {
      function: employeeFunction,
      count: employeeFunctions.filter((x) => x === employeeFunction).length,
    }
  });

  return (
    <FilterContainer>
      {countFunctions.map((countFunction) => (
        countFunction.count >= 3 && <Button key={countFunction.function} onClick={() => onFilter(countFunction.function)}>{countFunction.function}</Button>
      ))}
      <Button onClick={() => onFilter("Other")}>Other</Button>
    </FilterContainer>
  );
};
