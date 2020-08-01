import React from 'react'
import { Button, Popup, Modal, Label } from 'semantic-ui-react'

interface Props {

    poruka:string
    open:boolean
    close: () => void;
  }

function ModalUpozorenje (props:Props) {
 


return(

<Modal  size='small' open = {props.open} onClose = {props.close}>
   <Modal.Header>
      <p>
     {props.poruka}
      </p>
    </Modal.Header>
  </Modal>

)

}


export default ModalUpozorenje