'use client'
import Link from 'next/link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

// Definición de la interfaz para el estado del modal
interface Open {
    open: boolean;
    handleClose: ()=> void
  }
  
const Modal: React.FC<Open> = ({open, handleClose}) => {
    return (
        <Dialog onClose={handleClose} open={open}>
             <DialogTitle id="simple-dialog-title">Producto agregado al carrito</DialogTitle>
             <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Link href={'/cart'}>Ir al carrito </Link>
                </DialogContentText>
             </DialogContent>
        </Dialog>
    );
}

export default Modal