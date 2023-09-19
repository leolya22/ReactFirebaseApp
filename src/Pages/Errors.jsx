import ToHome from "../Components/ToHome"

export default function NotFound() {

    return (
        <div className="notFound">
            <h1 className="err">Error 404</h1>
            <p className="pnf">La página no existe</p>
            <ToHome />
        </div>
    )
}