import React from "react";
import * as M from "../alerta/alerta";

export const Alerta = ({close}) => {
    return(
        <M.Modal>
            <M.Container>
                <div className="close">
                    <button onClick={close}>X</button>
                </div>
                <div>
                    <h3>Cotação já finalizada! Nada foi salvo!</h3>
                    <img src="images/voltar.png"/>
                </div>
            </M.Container>
        </M.Modal>
    )
}