import { useEffect, useState } from "react";

const Notification = ({ msg, type }) => {
    const [classesL, setClassesL] = useState('notification hidden');
    const [classesI, setClassesI] = useState('notification hidden');
    const [classesE, setClassesE] = useState('notification hidden');

    useEffect(() => {
        type === 'l' ? setClassesL('notification') : setClassesL('notification hidden');
        if (msg) {
            if (type === 'i') setClassesI('notification');
            if (type === 'e') setClassesE('notification');
        } else {
            setClassesI('notification hidden');
            setClassesE('notification hidden');
        }
    }, [msg, type]);

    return (
        <div id="notifications">
            <div id="loadingBox" className={classesL}>
                <span>Loading …</span>
            </div>
            <div id="infoBox" className={classesI}>
                <span>{msg}</span>
            </div>
            <div id="errorBox" className={classesE}>
                <span>{msg}</span>
            </div>
            <style jsx>{`
            .hidden{
                display: none;
            }
            #notifications {
                opacity: 0.9;
            }
            .notification {
                color: #ffffff;
            }
            .notification>span {
               padding: 0.3em 1em 0.3em 1em;
               border-radius: 10px;
               font-size: 16px;
               font-style: italic;
            }
            #infoBox {
                position: absolute;
                right: 20px;
                top: 90px
            }
            #infoBox>span {
                background: #393;
                box-shadow: 0px 0px 11px 8px rgba(68, 157, 68, 0.5)
            }
            #errorBox {
                position: absolute;
                right: 20px;
                top: 130px
            }
            #errorBox>span {
                background: #F50;
                box-shadow: 0px 0px 11px 8px rgba(251, 96, 22, 0.5)
            }
            #loadingBox {
                position: absolute;
                right: 20px;
                top: 170px
            }
            #loadingBox>span {
                background: #7CB3E9;
                box-shadow: 0px 0px 11px 8px rgba(133, 180, 231, 0.5)
            }
        `}</style>
        </div>
    )
};

export default Notification;