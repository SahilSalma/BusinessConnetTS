import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface AlertToastProps {
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
    handleClose: () => void;
}

const AlertToast: React.FC<AlertToastProps> = ({ open, message, severity, handleClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertToast;