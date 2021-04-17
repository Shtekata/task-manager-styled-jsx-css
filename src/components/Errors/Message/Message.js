import { Fragment } from "react";

const Message = ({ msg }) => {
    if (msg?.includes('phoneNumber must be a `number` type')) msg = 'Must fill only numbers';
    return (
        <Fragment>
            <p className='err-msg'>{msg}</p>
            <style jsx>{`.err-msg{color: red;}`}</style>
        </Fragment>
    )
};
export default Message;