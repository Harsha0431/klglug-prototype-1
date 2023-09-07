import React, {  useRef } from 'react'; 
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';

export default function AlertMessage(props) {
    const msgs = useRef(null);
    
    useMountEffect(() => {
        msgs.current.show([
            { sticky: true, severity: 'error', summary: 'Error', detail: `${props.message}` , closable: false},
        ]);
    });

    return (
        <div className="card">
            <Messages color='inherit' ref={msgs} />
        </div>
    )
}