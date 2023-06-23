
import { useQuery } from '@tanstack/react-query';
import { gitHubApi } from '../../api/githubApi';
import { Labels } from '../interfaces/labels';
import { sleep } from '../../helpers/sleep';

const getLabels = async(): Promise<Labels[]> => {
  await sleep(2);
  const { data } = await gitHubApi.get<Labels[]>('/labels');
  return data;
}


export const useLabels = () => {
  const labelsQuery = useQuery(
    ['labels'], // nombre de espacio en caché
    getLabels
  );

  return {
    labelsQuery
  }
}