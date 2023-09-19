import { useState } from "react";
import Loader from "../Components/Loader";

export default function useLoader() {
    const [loading, setLoading] = useState(false);
    return [
        loading ? <Loader /> : null,
        () => setLoading(true),
        () => setLoading(false),
    ];
};