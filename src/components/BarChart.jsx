import React, {useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {getBranchJson, getAuthors} from "../data/cleanData";
import service from '../data/cx-services/output.json';
import portal from '../data/kapitus-portal/output.json';
import component from '../data/component-library/output.json';

export const BarData = () => {
    const branchObj = {
        'component': component,
        'portal': portal,
        'service' : service,
    }
    const[ branch, setBranch ] = useState("component");
    const names = getAuthors(branchObj[branch]);
    const[author, setAuthor] = useState("Alex Gochenour");
    const branches=['component', 'portal','service'];
    console.log(author);
    return (
        <div>
            <div  className={'items'}>
            <label>Choose a Branch:</label>
            <select onChange={e => setBranch(e.target.value)}>
                {branches.map(i=> <option key={i}   value={i}
                                           >{i} </option>)}
            </select>
            <label>Choose a Person:</label>
            <select onChange={e => setAuthor(e.target.value)}>
                {names.map(i=> <option key={i}   value={i}
                >{i} </option>)}
            </select>
                <Bar data={getBarChartData(branchObj[branch],branches[branch], author)}
                     width={20}
                     height={30}
                     options={{
                         maintainAspectRatio: true
                     }}
                />
                <Bar data={getBarMonth(branchObj[branch],branches[branch], author)}
                     width={20}
                     height={30}
                     options={{
                         maintainAspectRatio: true
                     }}
                />
                <Bar data={getBarHour(branchObj[branch],branches[branch],author)}
                     width={20}
                     height={30}
                     options={{
                         maintainAspectRatio: true
                     }}
                />
                {

                }
            </div>
        </div>
    )
}



const getBarChartData = (item , name, author)=> {
    const n = getBranchJson(item);
    const c = n[author];
    const data = {
        labels: [0,1,2,3,4,5,6],
        datasets: [{
                label: author,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data:c.day,
            }]
    };
    return data;
}
const getBarMonth = (item , name, author)=> {
    const n = getBranchJson(item);
    const c = n[author];
    const data = {
        labels: [0,1,2,3,4,5,6,7,8,9,10,11],
        datasets: [{
            label: author,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data:c.month,
        }]
    };
    return data;
}
const getBarHour = (item , name, author)=> {
    const n = getBranchJson(item);
    const c = n[author];
    const hours = c.hour.map(item => item %12);
    const data = {
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12],
        datasets: [{
            label: author,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data:hours,
        }]
    };
    return data;
}