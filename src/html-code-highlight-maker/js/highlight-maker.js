function isNumeric(num) {
    if (num === '' || num === null) {
        return false
    }
    return !isNaN(num)
}

function createTag(tagName, attributes = {}) {
    let tag = document.createElement(tagName)

    let allAttr = []
    Object.entries(attributes).forEach(attr => {
        let [key, value] = attr
        tag.setAttribute(key, value)
    })

    return tag
}

function addSpace(count = 1) {
 count = isNumeric(count) ? parseInt(count) : 1
 let spaceText = ' '
 return spaceText.repeat(count)
}

function appendSpaceToElement(element, count) {
	let space = createTag('span', {})
	space.innerText = addSpace(2, ' ')
	element.appendChild(space)
}

function tagWithContent(tagName, content, html = false, attributes = {}) {
	let tag = createTag('span', attributes)

	if (html) {
		tag.innerHTML = content
		return tag
	}

	tag.innerText = content
	return tag
}

function addTagHighlight(tagData, tagHighlightContainer) {
        let classes = tagData.classes

        classes['tagGtLt'] = classes?.tagGtLt ? classes?.tagGtLt : 'tag-gt-lt'
        classes['tagName'] = classes?.tagName ? classes?.tagName : 'tag-name'
        classes['tagAttrContainer'] = classes?.tagAttrContainer ? classes?.tagAttrContainer : 'attr'
        classes['attributeName'] = classes?.attributeName ? classes?.attributeName : 'attr-name'
        classes['attributeValue'] = classes?.attributeValue ? classes?.attributeValue : 'attr-value'


		tagContainer = createTag('span', {class: 'tag-container'})
		ltOpen = createTag('span', {class: classes?.tagGtLt}) //1
		tagName = createTag('span', {class: classes?.tagName}) // 2
		tagAttrContainer = createTag('span', {class: classes?.tagAttrContainer}) // 3
		gtOpen = createTag('span', {class: classes?.tagGtLt}) //4

		ltOpen.innerHTML = '&lt;'
		gtOpen.innerHTML = tagData.selfClose ? '/&gt;' : '&gt;'
		tagName.innerText = tagData.tagName

		Object.entries(tagData.attributes).forEach(attr => {
				let [attributeName, attributeValue] = attr

				let attrName = createTag('span', {class: classes?.attributeName})
				let attrValue = createTag('span', {class: classes?.attributeValue})

				attrName.innerText = attributeName
				attrValue.innerText = `="${attributeValue}"`
				appendSpaceToElement(tagAttrContainer)
				tagAttrContainer.appendChild(attrName)
				tagAttrContainer.appendChild(attrValue)
		})

		tagContainer.appendChild(ltOpen)
		tagContainer.appendChild(tagName)
		tagContainer.appendChild(tagAttrContainer)

		if (tagData.selfClose) {
			appendSpaceToElement(tagContainer)
		}

		tagContainer.appendChild(gtOpen)

		if (!tagData.selfClose) {
			if (tagData?.contentData?.content) {
				let tagContent = createTag('span')

				if (tagData?.contentData?.html) {
					tagContent.innerHTML = tagData?.contentData?.content + '<br>'
				} else {
					tagContent.innerText = tagData?.contentData?.content + '<br>'
				}

				tagContainer.appendChild(tagContent)
			}

			let tagIfClose = createTag('span', {class: classes?.tagName}) //6
			let ltClose = tagWithContent('span', '&lt;/', true, {class: classes?.tagGtLt})
			let gtClose = tagWithContent('span', '&gt;', true, {class: classes?.tagGtLt})
			tagIfClose.innerHTML = tagData.tagName
			tagContainer.appendChild(ltClose)
			tagContainer.appendChild(tagIfClose)
			tagContainer.appendChild(gtClose)
		}

		highlightContainer = createTag('div', {
				dir:"auto",
				class: "highlight highlight-text-html-basic notranslate pre",
				translate:"no"
		})
		highlightContainer.appendChild(tagContainer)

		tagHighlightContainer?.appendChild(highlightContainer)
}
