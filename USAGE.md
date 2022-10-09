
# DomHelpers

## #1
```js
let attributes = {
    src: "https://i0.wp.com/www.php.net/images/meta-image.png?fit=256%2C256&ssl=1",
    alt: "Image",
    title: "My image"
}

let tag = _helpers.DomHelpers.createTag('img', attributes)
console.log(tag)
```

----

# Memoize Vanilla JS

```JS

myFun = (id) => {
    console.log('logic')

    return `Your ID: ${id}`
}

sum = (a, b) => {
    console.log(`Sum ${a} + ${b}`)

    return a + b
}

myFun2 = id => window.memoize(myFun, id)
myFun3 = (a, b) => window.memoize(sum, a, b)

console.log(myFun2(1))
console.log(myFun2(1))
console.log(myFun2(2))
console.log(myFun2(2))

console.log(myFun3(2, 5))
console.log(myFun3(2, 5))

console.log(myFun2(1))
console.log(myFun2(2))
```
