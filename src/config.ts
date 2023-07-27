export const CONFIG = {
  GITHUB_OAUTH: `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${
    import.meta.env.VITE_REDIRECT_URL + '/github'
  }`,
  MSW: import.meta.env.VITE_MSW === 'true',
  API_URL: import.meta.env.VITE_API_HOST + '/graphql',
};
