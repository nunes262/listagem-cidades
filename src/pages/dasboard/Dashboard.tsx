import { LayoutBase } from "../../shared/layouts";
import { FerramentasDeDetalhe } from '../../shared/components';


export const Dashboard = () => {
    return (
        <LayoutBase
            titulo='Página inicial'
            barraDeFerramentas={(
                <FerramentasDeDetalhe />
            )}
        >
        </LayoutBase>
    );
};