import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAuthors, getBranchJson } from '../data/cleanData';
import service from '../data/cx-services/output.json';
import portal from '../data/kapitus-portal/output.json';
import component from '../data/component-library/output.json';

// eslint-disable-next-line import/prefer-default-export
export const BarData = () => {
  const branchObj = {
    component,
    portal,
    service,
  };
  const [branch, setBranch] = useState('component');
  const names = getAuthors(branchObj[branch]);
  const [author, setAuthor] = useState('Alex Gochenour');
  const branches = ['component', 'portal', 'service'];
  const getBarChartData = (item, name, person) => {
    const n = getBranchJson(item);
    const c = n[person];
    return {
      labels: [0, 1, 2, 3, 4, 5, 6],
      datasets: [
        {
          label: author,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: c.day,
        },
      ],
    };
  };
  const getBarMonth = (item, name, person) => {
    const n = getBranchJson(item);
    const c = n[person];
    const data = {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      datasets: [
        {
          label: author,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: c.month,
        },
      ],
    };
    return data;
  };
  const getBarHour = (item, name, person) => {
    const n = getBranchJson(item);
    const c = n[person];
    const hours = c.hour.map((time) => time % 12);
    const data = {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
        {
          label: author,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: hours,
        },
      ],
    };
    return data;
  };
  return (
    <div>
      <div className="items">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Choose a Branch:</label>
        <select onChange={(e) => setBranch(e.target.value)}>
          {branches.map((i) => (
            <option key={i} value={i}>
              {i}{' '}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Choose a Person:</label>
        <select onChange={(e) => setAuthor(e.target.value)}>
          {names.map((i) => (
            <option key={i} value={i}>
              {i}{' '}
            </option>
          ))}
        </select>
        <Bar
          data={getBarChartData(branchObj[branch], branches[branch], author)}
          width={20}
          height={30}
          options={{
            maintainAspectRatio: true,
          }}
        />
        <Bar
          data={getBarMonth(branchObj[branch], branches[branch], author)}
          width={20}
          height={30}
          options={{
            maintainAspectRatio: true,
          }}
        />
        <Bar
          data={getBarHour(branchObj[branch], branches[branch], author)}
          width={20}
          height={30}
          options={{
            maintainAspectRatio: true,
          }}
        />
        {}
      </div>
    </div>
  );
};
