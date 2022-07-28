export const getJs = async (params) => {
    const cfg = {
        async: true,
        defer: false,
        src: false,
        ...params
    }

    if (!!cfg.src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = cfg.src
            script.async = cfg.async
            script.defer = cfg.defer
            script.onerror = (err) => {
                reject(err)
            }
            script.onload = script.onreadystatechange = () => {
                resolve(script)
                script.onload = null
                script.onerror = null
            }
            document.body.appendChild(script)
        })
    } else {
        return Promise.reject()
    }

}