import React from 'react'
import { formStateType } from './AddServerModal';

type Props = {
    onClose: () => void;
    changeFormState: (formState: formStateType) => void;
}

const JoinServerForm = ({onClose, changeFormState}: Props) => {
  return (
    <div>JoinServerForm</div>
  )
}

export default JoinServerForm