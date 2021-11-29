import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import Home from '../pages/Home/home.container';

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
});

test('search results', async () => {
  render(
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  )

  // test input value
  const searchBox = await waitFor(() => screen.getByRole('textbox'));
  fireEvent.change(searchBox, { target: { value: 'Luke' } });
  expect((searchBox as HTMLInputElement).value).toBe('Luke');

  // test search results appearance
  await waitFor(() => {
    expect(screen.getAllByRole('row')).toHaveLength(2);
  });
  expect(screen.getByRole('cell', { name: /luke skywalker/i })).toHaveTextContent('Luke Skywalker');
})

test('favorites functionality', async () => {
  render(
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  )

  // test input value
  const searchBox = await waitFor(() => screen.getByRole('textbox'));
  fireEvent.change(searchBox, { target: { value: 'Luke' } });
  expect((searchBox as HTMLInputElement).value).toBe('Luke');

  await waitFor(() => {
    expect(screen.getAllByRole('row')).toHaveLength(2);
  });
  const button = screen.getByRole('button', { name: /favorite/i });
  fireEvent.click(button);

  // test favorites amount by male gender
  expect(screen.getByRole('note', { name: 'Male Fans' })).toHaveTextContent('1');
})
