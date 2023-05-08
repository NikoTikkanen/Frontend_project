import React, {useState, useEffect} from 'react';
import {API_ADD_TRA, API_CUSTOMER} from '../constants';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';



 export default function CustomerList () {
     
     const [customers, setCustomers] = useState([]);
     const [open, setOpen] = useState(false);
     const [msg, setMsg] = useState([]);
     
     const [columnDefs] = useState ([
        {
            cellRenderer: id =>
            <AddTraining saveTraining = {saveTraining} id={id.data.links[0].href}/>,
        },
         {field: 'firstname', sortable: true, filter: true, width: 150},
         {field: 'lastname', sortable: true, filter: true, width: 150},
         {field: 'streetaddress', sortable: true, filter: true},
         {field: 'postcode', sortable: true, filter: true,width:125},
         {field: 'city', sortable: true, filter: true, width:150},
         {field: 'email', sortable: true, filter: true},
         {field: 'phone', sortable: true, filter: true, width:150},
         {
             cellRenderer: params =>
             <EditCustomer updateCustomer = {updateCustomer} params={params.data}/>,
             width:100
         },
         {cellRenderer: params => 
             <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                 Delete</Button>, 
             width: 120},
             
     
     ])
    //haetaan asiakkaat sivua ladatessa
    useEffect(() => {
        getCustomers()
    }, []);

    //tehtään funktio jolla voidaan hakea asiakkaat.
    const getCustomers = () => {
        fetch(API_CUSTOMER)
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
        
    }

    const saveTraining = training => {
        fetch(API_ADD_TRA, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(training) 
        })
        .then(response => {
            if(response.ok){
                setMsg('Training added');
                setOpen(true);
                getCustomers();
            }
            else
                alert ('Something went wrong.');
        })
        .catch(err => console.error(err))
            }
    

    const deleteCustomer = (params) => {
        //varmistetaan poisto window.confirm toiminnolla.
        if (window.confirm('Are you sure')){
        fetch(params.data.links[0].href, { method: 'DELETE'})
        .then(response => {
            if (response.ok){
                setMsg('Customer deleted succesfully');
                setOpen(true);
                //haetaan uudet asiakkaat
                getCustomers();
            }
            else
            alert('Something went wrong in delete: ' + response.status);
        })
        .catch(err => console.error(err))
        }
    }
    


    const addCustomer = (customer) => {
        fetch(API_CUSTOMER , {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(response.ok){
            setMsg('Customer added');
            setOpen(true);
            getCustomers();
        }
            else
                alert ('Something went wrong.' + response.statusText);
        })
        .catch(err => console.error(err))
    }

    

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if(response.ok){
                setMsg('Customer edited');
                setOpen(true);
                getCustomers();
            }
            else
                alert('SOmething went wrong in edit:' + response.statusText);
        })
        .catch(err => console.error(err))
    }

        

    return(
        <div className='ag-theme-material' 
        style={{height:600, width: '90%', margin: 'auto'}}>
            <h1>Customer list</h1>
                <AddCustomer addCustomer={addCustomer}/>
                
                <AgGridReact 
                pagination ={true}
                paginationPageSize={10}
                rowData={customers}
                
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

