import React, { Component } from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends Component {
  render() {
    return (
      <div data-testid="solar-system">
        <Title headline="Planetas" />
        {planets.map((elemento) => (
          <PlanetCard
            planetName={ elemento.name }
            planetImage={ elemento.image }
            key={ elemento.name }
          />
        ))}
      </div>
    );
  }
}

export default SolarSystem;
