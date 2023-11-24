import { ToastOptions, toast } from "react-toastify";

const options: ToastOptions = {
    position: toast.POSITION.TOP_RIGHT
}

class NotificationService {
    public success(message: string) {
        toast.success(message, options);
    }

    public error(message: string) {
        toast.error(message, options);
    }
}

export default new NotificationService();
