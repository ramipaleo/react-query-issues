import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { Issue } from '../interfaces/issue';
import { gitHubApi } from '../../api/githubApi';
import { sleep } from '../../helpers/sleep';

const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
}

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
}

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(
    ['issue', issueNumber],
   () => getIssueInfo(issueNumber),
  );

  // Tiene dependencia de issueQuery para pasarle el número de issue
  const commentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
   () => getIssueComments( issueQuery.data!.number ),
   {
    enabled: issueQuery.data !== undefined,
   }
  );

  return {
    issueQuery,
    commentsQuery
  }
}
