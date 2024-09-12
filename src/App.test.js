import { act, fireEvent } from 'react';

import { getAllByPlaceholderText, render, screen } from "@testing-library/react";
import ReactDOM from 'react-dom/client';
import App from './App';

global.IS_REACT_ACT_ENVIRONMENT=true

it ('renders with button disabled', async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  

  // ✅ Render the component inside act().
  await act(() => {
    ReactDOM.createRoot(container).render(<App />);
  });



});

