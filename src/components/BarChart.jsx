import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAuthors } from '../data/cleanData';
import service from '../data/cx-services/output.json';
import portal from '../data/kapitus-portal/output.json';
import component from '../data/component-library/output.json';
import { getChart } from './ModularBar';

const BarData = () => {
  const branchObj = {
    component,
    portal,
    service,
  };
  const [branch, setBranch] = useState('component');
  const names = getAuthors(branchObj[branch]);
  const [author, setAuthor] = useState('Alex Gochenour');
  const [time, setTime] = useState('day');
  const branches = ['component', 'portal', 'service'];
  const timePeriod = ['day', 'hour', 'month'];
  return (
    <div>
      <div className="items">
        <div>Choose a Branch:</div>
        <select onChange={(e) => setBranch(e.target.value)}>
          {branches.map((i) => (
            <option key={i} value={i}>
              {i}{' '}
            </option>
          ))}
        </select>
        <div>Choose a Person:</div>
        <select onChange={(e) => setAuthor(e.target.value)}>
          {names.map((i) => (
            <option key={i} value={i}>
              {i}{' '}
            </option>
          ))}
        </select>
        <div>Choose a Time:</div>
        <select onChange={(e) => setTime(e.target.value)}>
          {timePeriod.map((i) => (
            <option key={i} value={i}>
              {i}{' '}
            </option>
          ))}
        </select>
        <Bar
          data={getChart(branchObj[branch], author, time)}
          width={20}
          height={30}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
};

export default BarData;
