import * as React from 'react';

import { useGetTeam, useGetOffice } from 'queries/team';
import { Grid, Paragraph, Input, SelectDropdown } from 'common';
import { Employee, EmployeeFilter } from 'modules';
import { useForm, SubmitHandler, useController } from 'react-hook-form';

export const Employees = () => {
  // Get data from API
  const { isLoading, data } = useGetTeam();
  const { isLoading: isLoadingOffice, data: dataOffice } = useGetOffice();

  const employees = data?.items[0]?.employees || [];
  const offices = dataOffice?.items[0]?.offices || [];

  // Map employee with office where office id matches employee office id
  employees.map((employee) => {
    const office = offices.find((office) => office.id === employee.value.office_id);
    employee.office = office;
  });

  // Get all functions
  const employeeFunctions: string[] = employees.map((employee) => employee.value.function);

  // Lifting state for filter
  const [filter, setFilter] = React.useState(employees);

  // Array with all unique functions
  const uniqueFunctions = employeeFunctions.filter((value, index, self) => self.indexOf(value) === index);

  // Array with the correct employees, based on the chosen filter
  const filterEmployees = (filterString: string) => {
    // If filter string is "Other", filter out all employees with a function that appears 3 or more times
    if (filterString === 'Other') {

      // Array with all functions and the amount of times they appear
      const countFunctions = uniqueFunctions.map((employeeFunction) => {
        return {
          function: employeeFunction,
          count: employeeFunctions.filter((x) => x === employeeFunction).length,
        };
      });

      // Array with all functions that appear 2 or less times
      const otherFunctions = countFunctions.filter((countFunction) => countFunction.count <= 2);

      // Array with all employees that have a function that appears 2 or less times
      const filteredEmployees = employees.filter((employee) => otherFunctions.some((otherFunction) => otherFunction.function === employee.value.function));

      // Update state with the correct array to pass trough to the Employees component
      setFilter(filteredEmployees);

      return;
    } else {
      // Array with all employees that have the chosen function
      const filteredEmployees = employees.filter((employee) => employee.value.function === filterString);

      // Update state with the correct array to pass trough to the Employees component
      setFilter(filteredEmployees);

      return;
    }
  }

  // Form
  const { register, control, handleSubmit } = useForm();

  const handleSave = (data) => console.log(data);

  // Handle select dropdown change
  const handleSelectChange = (option) => {
    if (option.type === "function") {
      functionField.onChange(option.value);
    } else if (option.type === "office") {
      officeField.onChange(option.value);
    }
  }

  // React hook form - useController for select dropdown data
  const { field: functionField } = useController({ name: "function", control })
  const { field: officeField } = useController({ name: "office", control })

  // Select options array with all unique available functions in an array of objects
  const selectFunctionOptions = uniqueFunctions.map((employeeFunction) => {
    return {
      type: 'function',
      value: employeeFunction,
      label: employeeFunction,
    };
  });

  // Select options array with all available offices in an array of objects
  const selectOfficeOptions = offices.map((office) => {
    return {
      type: 'office',
      value: office.value.city,
      label: office.value.city
    };
  });

  return (
    <>
      {isLoading ? (
        <Paragraph>Loading</Paragraph>
      ) : (
        <>
          <form onSubmit={handleSubmit(handleSave)}>
              <Input label='Naam' {...register('name', {required: true})}></Input>
              <Input label='Favoriete huisdier' {...register('favourite_pet', {required: true})}></Input>
              <Input label='Favoriete eten' {...register('favourite_food', {required: true})}></Input>

              <SelectDropdown
                value={selectFunctionOptions.find(({ value }) => value === functionField.value)}
                name='function'
                label='Functie'
                options={selectFunctionOptions}
                onChange={handleSelectChange}
              ></SelectDropdown>

              <SelectDropdown
                value={selectOfficeOptions.find(({ value }) => value === officeField.value)}
                name='office'
                label='Kantoor'
                options={selectOfficeOptions}
                onChange={handleSelectChange}
              ></SelectDropdown>

              <input type="submit" />
          </form>

          <EmployeeFilter employeeFunctions={employeeFunctions} onFilter={filterEmployees} />

          <Grid>
            {/* Check if the filter state array contains at least 1 entry, else display all employees */}
            {filter.length > 0
              ? filter.map((employee) => <Employee employee={employee} key={employee.id}/>)
              : employees.map((employee) => <Employee employee={employee} key={employee.id}/>)}
          </Grid>
        </>
      )}
    </>
  );
};
