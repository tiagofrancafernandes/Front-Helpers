
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
