import { useInfiniteQuery } from "@tanstack/react-query";
import { gitHubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces/issue';
import { sleep } from '../../helpers/sleep';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
};

const getIssues = async({ labels, state, page = 1 } : Props): Promise<Issue[]> => {
  sleep(2);

  const params = new URLSearchParams();

  if ( state ) params.append('state', state);

  if ( labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await gitHubApi.get<Issue[]>('/issues', { params });
  return data;
}

export const useIssuesInfinite = ({ state, labels }: Props) => {

  const issuesQuery = useInfiniteQuery(
    ['issues', 'infinite', { state, labels, page: 1 }],
    (data) => getIssues(data),
    {

    }
  )
  return {
    issuesQuery
  }
}
