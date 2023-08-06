
import FadeLoader from "react-spinners/FadeLoader";

const MyReactSpinners = () => {
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
    return <FadeLoader color={"#e5a714"} cssOverride={override} loading={true} size={150} />
}
export default MyReactSpinners;

