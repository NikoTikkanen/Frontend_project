import React, {useState, useEffect} from 'react';
import {API_TRAINING} from '../constants';
import {API_ADD_TRA} from '../constants';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';


export default function TrainingList () {

    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState([]);

    //haetaan asiakkaat sivua ladatessa
    useEffect(() => {
        getTrainings()
        
    }, []);

    //tehtään funktio jolla voidaan hakea asiakkaat.
    const getTrainings = () => {
        fetch(API_TRAINING)
        .then(response => response.json())
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    }

    //funktio treenin poistoon.
    const deleteTraining = params => {
		if (window.confirm('Are you sure?')) {
			console.log( API_ADD_TRA + params);
			fetch(API_ADD_TRA + params, {
				method: 'DELETE'
			})
				.then(response => {
					
					if (response.ok) {
						setMsg('Training deleted');
                        setOpen(true);
                        getTrainings();
					} else {
						alert('Something went wrong in delete: ' + response.status);
					}
				})
				.catch(err => console.error(err));
		}
	};

     const [columnDefs] = useState ([
        {  
            cellRenderer: params => 
            <Button size="small" color="error" onClick={() => deleteTraining(params.data.id)}>
                Delete</Button>, 
            width: 120},
        {field: 'activity', sortable: true, filter: true, width: 200},
        {field: "date", sortable: true, filter: true, cellRenderer: ({ value }) => {
          const date = new Date(value);
          const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
          return formattedDate;
        }},
        {field: 'duration', sortable: true, filter: true, width: 120},        
        {field: 'customer.firstname', headerName: 'Firstname', sortable: true, filter: true, width: 180},
        {field: 'customer.lastname', headerName: 'Lastname', sortable: true, filter: true, width: 180},
        {field: 'customer.phone', headerName: 'Phone', sortable: true, filter: true},
        
     ])

    return(
        <div className='ag-theme-material' 
        style={{height:600, width: '90%', margin: 'auto'}}>
                
                <h1>Training list</h1>
                
                 <AgGridReact 
                pagination ={true}
                paginationPageSize={10}
                rowData={training}
                
                columnDefs={columnDefs}
                />
                 <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message = {msg}
                />
                </div>
    )
}
