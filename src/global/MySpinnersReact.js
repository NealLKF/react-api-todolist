import { SpinnerCircular } from 'spinners-react';

const MySpinnersReact = () => {
    const override = {
        display: "flex",
        position: "fixed",
        borderColor: "red",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        backgroundColor: "#00000182"
    };
    return <SpinnerCircular />
}
export default MySpinnersReact;

