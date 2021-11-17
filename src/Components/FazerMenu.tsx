import { useEffect } from "react";
import { useModalData } from '../Hooks/ModalDataHooks';

const FazerMenu = () => {
    const { getFazerModalData } = useModalData();

    useEffect(() => {
        (async () => {
            try {
                const menu = await getFazerModalData('fi');
                console.log('FAZER', menu);
            } catch (error: any) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <>

        </>
    );
}
export default FazerMenu;