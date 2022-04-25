import {ChangeEvent, useState} from "react";

export function useInput(initialValue: string) {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return {value, onChange}
}