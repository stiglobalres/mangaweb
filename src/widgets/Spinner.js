import { useContext } from "react"
import { mainContext } from "../App"

export default function Spinner() {
    const {loadingInfo} = useContext(mainContext)
    const [loading, setLoading] = loadingInfo;

    if(loading)
    return <div className="loader"></div>
    return null;
}