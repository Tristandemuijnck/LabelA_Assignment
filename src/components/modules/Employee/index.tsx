import * as React from 'react';
import Image from 'next/image';

import { EmployeeContainer, EmployeeInfo, EmployeeName, EmployeeFunction } from './styled';
import { Modal } from 'common';

let isOpen: boolean;

const openModal = () => {
  isOpen = true;
};

const closeModal = () => {
  isOpen = false;
};

export const Employee = ({ employee }) => {
  return (
    <Modal.Root isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
      <Modal.Trigger>
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
      </Modal.Trigger>
      <Modal.Container>
        <p>{employee.value.name}</p>
        <p>{employee.value.function}</p>
        <p>{employee.office.value.street}</p>
        <p>{employee.office.value.city}</p>
      </Modal.Container>
    </Modal.Root>
  );
};
