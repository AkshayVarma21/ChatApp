import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetConverstions = () => {
    const [loading, setLoading] = useState()
    const [conversations, setConversations] = useState();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users")
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setConversations(data);
            } catch (error) {
                toast(error.message);
            } finally {
                setLoading(false);
            }
        }

        getConversations()
    }, [])


    return { loading, conversations }
}


export default useGetConverstions;