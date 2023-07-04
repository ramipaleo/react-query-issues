import axios from 'axios';

export const gitHubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: 'Bearer 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'
  }
})