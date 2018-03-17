export default (action, minTime = 750) => {
    const startAt = +new Date()

    return new Promise((resolve, reject) => {
        action()
            .then((result) => {
                const delay = Math.max(0, minTime - (+new Date() - startAt))

                if (delay === 0) {
                    resolve(result)
                }
                else {
                    setTimeout(() => resolve(result), delay)
                }
            })
            .catch(reject)
    })
}
