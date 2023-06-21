import style from './Modal.module.css'

export default function Modal({ title, children, onHide }) {

    return (
        <div>
            <div className="d-flex justify-content-center  align-items-center">
                <div className={style.container}>
                    <div className={style.popup}>
                        <button className={style.close} onClick={() => onHide()}>X</button>
                        <div className={style.header}>
                            <div className={style.title}>
                                <h3 className="text-white">{title}</h3>
                            </div>
                        </div>
                        <div className={style.body}>
                                {children}
                        </div>
                    </div>
                </div>
            </div>  
        </div>
      );
}