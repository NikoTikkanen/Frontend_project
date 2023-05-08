import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import _ from 'lodash';
import { API_TRAINING } from '../constants';

export default function Stats() {
    
    const [data, setData] = useState([]);

    useEffect(() => 
      fetchData(), []);
  
      const fetchData = () => {
        fetch(API_TRAINING)
          .then((response) => response.json())
          .then((data) => {
            const groupedData = _.chain(data)
              .groupBy('activity')
              .map((items, name) => ({
                name,
                duration: _.sumBy(items, 'duration'),
              }))
              .value();
            setData(groupedData);
          });
      };
    
  return (
    <div style={{ width: '100%', height: '85vh', marginTop: '1%' }}>
        <ResponsiveContainer minWidth="100%" minHeight="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit=" min"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill='#1976d2'/>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}