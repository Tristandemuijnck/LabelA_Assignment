import * as React from 'react';
import Image from 'next/image';

import { EmployeeContainer, EmployeeInfo, EmployeeName, EmployeeFunction } from './styled';

export const Employee = ({ employee }) => {
  return (
    <EmployeeContainer>
      <EmployeeInfo>
        <EmployeeName>{employee.value.name}</EmployeeName>
        <EmployeeFunction>{employee.value.function}</EmployeeFunction>
      </EmployeeInfo>
      <Image
        src={`https://cms.labela.nl${employee.value.image.small}`}
        width={488}
        height={800}
        alt={employee.value.image.alt}
      />
    </EmployeeContainer>
  );
};
