window.memoize = (callable, ...params) => {
    let argumentsUID = JSON.stringify(params)
    let cacheName = `cacheMap_${callable}`
    let cacheMap = cacheName in window
        ? window[cacheName]
        : window[cacheName] = new Map();

    if (cacheMap.has(argumentsUID)) {
        console.log(`From cache by argumentsUID: ${argumentsUID}`)
        return cacheMap.get(argumentsUID);
    }

    let result = callable(...params)
    cacheMap.set(argumentsUID, result)

    return result
}
