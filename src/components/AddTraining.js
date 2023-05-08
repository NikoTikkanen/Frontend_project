import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';


export default function AddTraining(props) {
    const [training, setTraining] = React.useState({
        activity: "",
        date: dayjs(new Date()),
        duration: "",
        customer: props.id,
        
    });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick')
    setOpen(false);
  };

  const handleSave =() =>{
      props.saveTraining(training);
      setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new training</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            label="Activity"
            value= {training.activity}
            onChange={e => setTraining({...training, activity: e.target.value})}
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">

          <StaticDateTimePicker e={dayjs('2022-04-17T15:30')}

              
              margin="dense"
              name="date"
              value={training.date}
              onChange={e => setTraining({...training, date: e})}
              label="Date"
              fullWidth
              variant="standard"
          />
      </LocalizationProvider>
          <TextField
            margin="dense"
            label="Duration"
            value= {training.duration}
            onChange={e => setTraining({...training, duration: e.target.value})}
            fullWidth
            variant="standard"
          />
                

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}