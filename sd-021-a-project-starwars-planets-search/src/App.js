import React from 'react';
import './App.css';
import Table from './components/Table';
import ProviderData from './context/StarWarsProvider';

function App() {
  return (
    <ProviderData>
      <Table />
    </ProviderData>
  );
}

export default App;
