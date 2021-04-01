import React,{useState} from 'react'
import {Modal,makeStyles} from '@material-ui/core'
function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Userdetails(props) {
    const classes=useStyles()
    const {candidate,show,handleClose}=props
    const [modalStyle]=useState(getModalStyle)
    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{candidate.name} profile</h2>
          <p id="simple-modal-description">
           <h5> candidate phone-{candidate.phone}</h5>
           <h5> candidate Email-{candidate.email}</h5>
           <h5> candidate Skills-{candidate.skills}</h5>
           <h5> Experience-{candidate.experience}</h5>
          </p>
          {/* <SimpleModal /> */}
        </div>
      );
    return (
        <div>
             <Modal open={show} 
             onClose={handleClose}
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description"
             >
                {body}
            </Modal>
        </div>
    )
}

export default Userdetails
