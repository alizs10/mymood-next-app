import Swal from 'sweetalert2'
import { toast } from "react-toastify";

export const notify = (message, type) => {
    switch (type) {
        case "success":
            toast.success(message, {
                position: "bottom-right",
                closeOnClick: true
            });
            break;
        case "warning":
            toast.warn(message, {
                position: "bottom-right",
                closeOnClick: true
            });
            break;
        case "error":
            toast.error(message, {
                position: "bottom-right",
                closeOnClick: true
            });
            break;

        default:
            break;
    }
}
export const SwalNotify = (title, message, type) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn bg-emerald-400',
            cancelButton: 'btn bg-red-500'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire(
        title,
        message,
        type
    )
}

export const confirm = (message, title, success, cancel = null) => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn bg-emerald-400',
            cancelButton: 'btn bg-red-500'
        },
        buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'حذف',
        cancelButtonText: 'انصراف',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            success()
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            if (cancel) {
                cancel()
            }
            swalWithBootstrapButtons.fire(
                'انصراف',
                'درخواست شما لغو شد',
                'error'
            )
        }
    })

}