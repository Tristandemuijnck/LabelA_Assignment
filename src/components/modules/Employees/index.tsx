import * as React from 'react';

import { useGetTeam } from 'queries/team';
import { Grid, Paragraph } from 'common';
import { Employee, EmployeeFilter } from 'modules';
import { log } from 'console';

export const Employees = () => {
  const { isLoading, data } = useGetTeam();

  const employees = data?.items[0]?.employees || [];

  const employeeFunctions: string[] = employees.map((employee) => employee.value.function)

  const [filter, setFilter] = React.useState(employees)

  const filterEmployees = (filterString: string) => {

    // If filter string is "Other", filter out all employees with a function that appears 3 or more times
    if (filterString === "Other") {
      const uniqueFunctions = employeeFunctions.filter((value, index, self) => self.indexOf(value) === index);
      const countFunctions = uniqueFunctions.map((employeeFunction) => {
        return {
          function: employeeFunction,
          count: employeeFunctions.filter((x) => x === employeeFunction).length,
        }
      });
      const otherFunctions = countFunctions.filter((countFunction) => countFunction.count <= 2);
      const filteredEmployees = employees.filter((employee) => otherFunctions.some((otherFunction) => otherFunction.function === employee.value.function))
      setFilter(filteredEmployees)
      return
    } else {
      const filteredEmployees = employees.filter((employee) => employee.value.function === filterString)
      setFilter(filteredEmployees)
      return
    }
  }

  return (
    <>
      {isLoading ? (
        <Paragraph>Loading</Paragraph>
      ) : (
        <>
          <EmployeeFilter employeeFunctions={employeeFunctions} onFilter={filterEmployees}/>
          <Grid>
            {filter.length > 0 ? filter.map((employee) => (
              <Employee employee={employee} key={employee.id} />
            )) :
            employees.map((employee) => (
              <Employee employee={employee} key={employee.id} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};
