export type IdMap = { [p:string]: string;}

export type AllMap<T> = {[p:string] : T}

export const getIdMap = (ids: string[]) :IdMap => {
    return ids.reduce((acc: IdMap, id: string) => {
        acc[id] = "";
        return acc;
    }, {});
}
