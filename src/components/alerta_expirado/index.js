import React from "react";
import * as M from "../alerta/alerta";

export const AlertaExpirado = ({close}) => {
    return(
        <M.Modal>
            <M.Container>
                <div className="close">
                    <button onClick={close}>X</button>
                </div>
                <div>
                    <h3>Cotação Expirada!</h3>
                    <img src="images/voltar.png"/>
                </div>
            </M.Container>
        </M.Modal>
    )
}