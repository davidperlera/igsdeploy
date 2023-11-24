import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ConfirmationDialog = ({ open, onClose, onSuccess }: Props) => {
  const confirmAction = () => {
    onSuccess();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure to perform this action?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The changes are irreversible and the information will not be recovered.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={confirmAction}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog;