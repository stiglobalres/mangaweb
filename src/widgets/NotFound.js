import { useContext } from "react";

import { mainContext } from '../App';

export default function Notound() {
    const {loadingInfo} = useContext(mainContext);
    const [loading, setLoading] = loadingInfo;
    if(loading) {
        return null;
    }
    return (
        <div className='container dflex-center'>
            <span className='subtitle'>No manga available</span>
        </div>
    )
}