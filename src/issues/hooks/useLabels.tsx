
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
    getLabels,
    {
      staleTime: 1000 * 60 * 60,
      // placeholderData: [],
      // initialData: []
      placeholderData: [
        {
          id: 725156255,
          node_id: "MDU6TGFiZWw3MjUxNTYyNTU=",
          url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue%20(taken)",
          name: "good first issue (taken) 2",
          color: "b60205",
          default: false,
        },
        {
          id: 717031390,
          node_id: "MDU6TGFiZWw3MTcwMzEzOTA=",
          url: "https://api.github.com/repos/facebook/react/labels/good%20first%20issue",
          name: "good first issue 2",
          color: "6ce26a",
          default: true,
        }
      ]
    }
  );

  return {
    labelsQuery
  }
}