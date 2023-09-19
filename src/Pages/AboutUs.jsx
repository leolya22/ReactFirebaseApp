import NavBar from "../Components/NavBar";

export default function AboutUs() {

    const About = {
        width: "80vw",
        minHeight: "85vh",
        background: "#b1d0ee",
        padding: "30px",
        margin: "20px",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap"
    }
    const Bold = {
        fontWeight: 900,
    }

    return(
        <>
            <NavBar />
            <div style={About}>
                <ul>
                    <li>Nos ubicamos en Buenos Aires, Argentina</li>
                    <li>Avenida Lionel Messi 6566</li>
                    <li>8°A</li>
                </ul>
                <div>
                    <p style={Bold}>Nuestros contactos:</p>
                    <ul>
                        <li>+54 1155669988</li>
                        <li>frutasyverduras@api.com.ar</li>
                    </ul>
                </div>
                <img src="https://es.mapcraft.me/images/4092/2019-09-24_23.08.47.png"
                    alt="foto_random" 
                    height="400px" 
                    width="900px" 
                />
            </div>
        </>
    );
}