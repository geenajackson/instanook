import { useEffect, useState } from "react";

function useLocalStorage(key, firstValue = null) {
    const initialValue = localStorage.getItem(key) || firstValue;
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (value === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, value);
        }
    }, [key, value]);
    return [value, setValue]

}

export default useLocalStorage;