import React from 'react';
import Title from './Title';
import missions from '../data/missions';
import MissionCard from './MissionCard';

class Missions extends React.Component {
  render() {
    return (
      <div data-testid="missions">
        <Title headline="Missões" />
        {missions.map((elemento) => (
          <MissionCard
            name={ elemento.name }
            year={ elemento.year }
            country={ elemento.country }
            destination={ elemento.destination }
            key={ elemento.name }
          />
        ))}
      </div>
    );
  }
}

export default Missions;
