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

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(
    ['issue', issueNumber],
   () => getIssueInfo(issueNumber),
  );

  return {
    issueQuery
  }
}
