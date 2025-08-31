// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  articles: [
    {
      __typename: 'Articles',
      id: 42,
    },
    {
      __typename: 'Articles',
      id: 43,
    },
    {
      __typename: 'Articles',
      id: 44,
    },
  ],
})
