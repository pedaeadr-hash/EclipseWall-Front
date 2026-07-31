import "../../Css/Download.css"
import { useParams } from "react-router-dom"
export default function Download (){
    const {slug} = useParams()
    return(
        <div className="download">
            <img className="fundodown" src="https://images.hdqwalls.com/wallpapers/bthumb/batman-is-not-a-replacement-he-is-a-revolution-4i.jpg" alt="" />
            <img className="downloadimg" src="https://images.hdqwalls.com/wallpapers/bthumb/batman-is-not-a-replacement-he-is-a-revolution-4i.jpg" alt="" />
            <p className="pforwall">Batman Is Not A Replacement He Is A Revolution</p>
            <div className="contentdown">
                <div className="down"><p>Donwloads (0)</p></div>
                <button>Instalar</button>
            </div>
        </div>
    )
}