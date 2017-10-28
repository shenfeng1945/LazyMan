function LazyMan(name) {
    var queue = []
    queue.push(function () {
        console.log(`Hi,This is ${name}`)
        next()
    })
    setTimeout(function () {
        queue[0].call()
    })
    function next() {
        queue.shift()
        queue[0] && queue[0].call()
    }
    return {
        eat: function (food) {
            queue.push(function () {
                console.log(`Eat ${food}~`)
                next()
            })
            return this
        },
        sleep: function (n) {
            queue.push(function () {
                setTimeout(function () {
                    next()
                }, n * 1000)
            })
            return this
        },
        sleepFirst: function (n) {
            queue.unshift(function () {
                setTimeout(function () {
                    next()
                }, n * 1000)
            })
            return this
        }
    }
}
LazyMan('aleen').sleepFirst(2).sleep(2).eat('dinner').eat('lunch')