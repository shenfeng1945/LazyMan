function _LazyMan(name) {
  this.queue = []
  this.queue.push(
    () => {
      console.log(`Hi,This is ${name}`)
      this.next()
    }
  )
  setTimeout(() => {
    this.queue[0].call()
  }, 0)
  return this
}
function LazyMan(name) {
  return new _LazyMan(name)
}
_LazyMan.prototype.next = function() {
  this.queue.shift()
  this.queue[0] && this.queue[0].call()
}
_LazyMan.prototype.eat = function(food) {
  this.queue.push(() => {
    console.log(`Eat ${food}~`)
    this.next()
  })
  return this
}
_LazyMan.prototype.sleep = function(n) {
  this.queue.push(() => {
    setTimeout(() => {
      this.next()
    }, n * 1000)
  })
  return this
}
_LazyMan.prototype.sleepFirst = function(n) {
  this.queue.unshift(() => {
    setTimeout(() => {
      this.next()

    }, n * 1000)
  })
  return this
}
LazyMan('allen').sleepFirst(2).sleep(2).eat('dinner')