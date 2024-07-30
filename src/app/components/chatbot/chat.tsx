import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import "../chatbot/chat.css";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Chatbot() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className='toggler' onClick={handleClickOpen}>
        Open Chat
      </button>
      <Dialog
         className='bar' 
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
         >
     
    </Dialog>
    </React.Fragment>
  );
}

