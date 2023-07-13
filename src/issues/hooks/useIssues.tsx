import React from 'react'
import { Issue, State } from '../interfaces/issue'
import { gitHubApi } from '../../api/githubApi';
import { useQuery } from '@tanstack/react-query';
import { sleep } from '../../helpers/sleep';
import { Labels } from '../interfaces/labels';

interface Props {
  state?: State;
  labels: string[];

}

const getIssues = async(labels: string[], state?: State): Promise<Issue[]> => {
  sleep(2);

  const params = new URLSearchParams();

  if ( state ) params.append('state', state);

  if ( labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', '1');
  params.append('per_page', '5');

  const { data } = await gitHubApi.get<Issue[]>('/issues', { params });
  return data;
}

export const useIssues = ({ state, labels}: Props) => {
  const issuesQuery = useQuery(
    ['issues', { state, labels  }],
    () => getIssues(labels, state)
  );

  return {
    issuesQuery
  };
}
