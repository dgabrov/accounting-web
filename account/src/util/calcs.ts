export const parseFloat = (val: string) : number => {
    let res = 0.0
    const value = Number.parseFloat(val)
    if (! isNaN(value)) {
        res = value
    }

    return res;
}
