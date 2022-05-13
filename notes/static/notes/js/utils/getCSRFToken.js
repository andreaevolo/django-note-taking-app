const getCSRFToken = () => {
    const tokenList = document.cookie.split(';');
    let csrft = '';
    tokenList.forEach(token => {
        if (token.startsWith("csrftoken")) {
            csrft = token.split("=")[1];
        }
    })
    return csrft;
}