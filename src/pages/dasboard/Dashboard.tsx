import { LayoutBase } from "../../shared/layouts";
import { BarraDeFerramentas } from "../../shared/components"


export const Dashboard = () => {
    return (
        <LayoutBase
            titulo='Página inicial'
            barraDeFerramentas={(
                <BarraDeFerramentas
                    mostrarInputBusca
                    textoBotaoNovo='Nova'
                />
            )}
        >
        </LayoutBase>
    );
};