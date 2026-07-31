import { useParams } from "react-router-dom"
export default function Download (){
    const {slug} = useParams()
    return(
        <div>
            <h1>oi aq {slug}</h1>
        </div>
    )
}