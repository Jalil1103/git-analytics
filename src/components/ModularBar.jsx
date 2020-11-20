import { getBranchJson } from '../data/cleanData';

const dataLabels = {
  day: [0, 1, 2, 3, 4, 5, 6],
  month: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  hour: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

const preProcessHourData = (data) => {
  return data.hour.map((time) => time % 12);
};

export const getChart = (collection, author, timePeriod) => {
  const authorCollection = getBranchJson(collection);
  const authorData = authorCollection[author];
  const timeData = timePeriod === 'hour' ? preProcessHourData(authorData) : authorData[timePeriod];
  return {
    labels: dataLabels[timePeriod],
    datasets: [
      {
        label: author,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: timeData,
      },
    ],
  };
};
