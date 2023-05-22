let token = ''

export const setToken = (tk : string) => {
	token = tk;
}

export const getToken = () : string => {
	return token;
}
