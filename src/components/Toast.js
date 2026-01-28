
import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useEffect, useState } from "react";

const ToastDemo = () => {
    const toast = useRef(null);


    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
    }




    useEffect(() => {

        showSuccess();
    
    }, []);


return (
    <div>
        <Toast ref={toast} />


        <div className="card toast-demo">






        </div>
    </div>
)
}
export default ToastDemo;
