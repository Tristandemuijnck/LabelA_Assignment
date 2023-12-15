import * as i from 'types';
import { useQuery } from '@tanstack/react-query';

export const fetchTeam = async (): Promise<i.Team> => await (await fetch('/api/team')).json();
export const fetchOffice = async (): Promise<i.Office> => await (await fetch('/api/offices')).json();

export const useGetTeam = () => {
  return useQuery<i.Team>(['team'], () => fetchTeam());
};

export const useGetOffice = () => {
  return useQuery<i.Office>(['office'], () => fetchOffice());
}
