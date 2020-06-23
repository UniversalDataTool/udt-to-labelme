const splitURL = (url) => {
    const splittedURL = url.split('/')
    let lastPartOfURL = splittedURL.slice(-1)[0]
    if(lastPartOfURL.includes('?')) lastPartOfURL = lastPartOfURL.split('?').slice(-1)[0]
    if(lastPartOfURL.includes('&')) lastPartOfURL = lastPartOfURL.split('&').slice(-1)[0]
    if(lastPartOfURL.includes('=')) lastPartOfURL = lastPartOfURL.split('=').slice(-1)[0]
    
    return lastPartOfURL
}

module.exports = splitURL