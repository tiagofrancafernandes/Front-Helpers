((globalKey = '_helpers') => {
    if (!globalKey || typeof globalKey != 'string') {
        globalKey = '_helpers'
    }

    window[globalKey] = {};

    let helpers = {
        __VERSION__: '0.0.1-beta',

        /**
         *
         * @returns {String}
         */
        version: function () {
            let self = window[globalKey]
            return self.__VERSION__
        },

        /**
         *
         * @param {String} str
         * @returns Boolean
         */
        isJson: function (str) {
            let self = window[globalKey]

            if (!String || str === null || str === '' || self.gettype(str) !== 'String') {
                return false
            }

            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }

            return true;
        },

        gettype: function (data) {
            let itemType = Object.prototype.toString.call(data)
            let type = ''

            switch (itemType) {
                case "[object Null]":
                    type = 'Null';
                    break;

                case "[object Object]":
                    type = 'Object';
                    break;

                case "[object Array]":
                    type = 'Array';
                    break;

                case "[object String]":
                    type = 'String';
                    break;

                case "[object Boolean]":
                    type = 'Boolean';
                    break;

                case "[object Number]":
                    type = 'Number';
                    break;
            }

            return type
        },

        /**
         *
         * @param {*} data
         * @param {String} typeToCheck
         * @returns
         */
        isType: function (data, typeToCheck) {
            let self = window[globalKey]

            if (self.gettype(typeToCheck) !== 'String') {
                return false
            }

            return self.gettype(data) === typeToCheck
        },

        jsonParse: function (data) {
            let self = window[globalKey]

            if (!data || (self.gettype(data) !== 'String')) {
                return null
            }

            if (!self.isJson(data)) {
                return null
            }

            try {
                return JSON.parse(data)
            } catch (e) {
                return null
            }

            return null
        },

        NumberHelpers: {
            /**
             * Example: NumberHelpers #1
             * @param {*} num
             * @returns Boolean
             */
            isNumeric: function (num) {
                let self = window[globalKey]

                if (
                    num === null ||
                    num === '' ||
                    ['Null', 'Object', 'Array', 'Boolean'].includes(self.gettype(num))
                ) {
                    return false
                }

                return !isNaN(num)
            },

            /**
             * Example: NumberHelpers #2
             * @param {*} start
             * @param {*} end
             * @returns Array
             */
            range: function (start, end) {
                // https://dev.to/ycmjason/how-to-create-range-in-javascript-539i

                if (start === end) return [start];
                return [start, ...self.NumberHelpers.range(start + 1, end)];
            },

            /**
             *
             * @param {Number} value
             * @param {Number} precision
             * @returns {Number|null}
             */
            toFloat: function (value, precision = 2) {
                let self = window[globalKey]

                if (!self.NumberHelpers.isNumeric(value) || !self.NumberHelpers.isNumeric(precision)) {
                    return null;
                }

                precision = self.NumberHelpers.isNumeric(precision) ? parseInt(precision) : 2

                return parseFloat(Number(value).toFixed(precision))
            },

            toInt: function (value = '', defaultValue = null) {
                let self = window[globalKey]
                defaultValue = self.NumberHelpers.isNumeric(defaultValue) && defaultValue !== null ? parseInt(defaultValue) : null

                if (value === '' || !self.NumberHelpers.isNumeric(value) || value === null) {
                    return defaultValue ?? null
                }

                return self.NumberHelpers.isNumeric(value) ? parseInt(value) : defaultValue
            },
        },

        URLHelpers: {
            query: {
                addQueryParam: (key, value) => {
                    let url = new URL(window.location.href);
                    url.searchParams.set(key, value);
                    window.history.pushState({}, '', url.toString());
                },

                getQueryParam: (key) => {
                    let url = new URL(window.location.href);
                    return url.searchParams.get(key) || '';
                },

                removeQueryParam: (paramKey) => {
                    let currentUrl = window.location.href
                    let newUrl = new URL(currentUrl)
                    newUrl.searchParams.delete(paramKey)
                    newUrl = newUrl.href
                    window.history.pushState({
                        path: newUrl
                    }, '', newUrl)
                },

                toObject: () => {
                    let url = new URL(window.location.href);
                    let obj = {}
                    url.searchParams.forEach((item, key) => obj[key] = item)

                    return obj
                }
            }
        },

        ObjectHelpers: {
            /*
                ObjectHelpers.filterByKeys(['a', 'c'], {
                    a: 'aa',
                    b: 123,
                    c: 34
                })
            */
            filterByKeys: (keysToGet, object) => {
                let self = window[globalKey]

                if (!self.isType(keysToGet, 'Array') || !self.isType(object, 'Object')) {
                    return {}
                }

                let newObj = {}
                Object.entries(object).filter((value, key) => {
                    return keysToGet.includes(value[0])
                }).forEach((item) => {
                    newObj[item[0]] = item[1]
                })

                return newObj
            }
        },

        ArrayHelpers: {
            // Exemplos:
            // ArrayHelpers.allEqual([1, 1, 1, 1]) //true
            // ArrayHelpers.allEqual([1, 1, 1, 2]) //false

            /**
            *
            * @param array
            * @returns bool
            */
            allEqual: (array) => {
                if (!Array.isArray(array) || !array.length) {
                    return false
                }

                return array.every(v => v === array[0])
            }
        },

        DatasetHelpers: {
            extractData: function (elementSelector) {
                if (!elementSelector || typeof elementSelector != 'string') {
                    return null
                }

                try {
                    let element = document.querySelector(elementSelector)

                    if (!element) {
                        return null
                    }

                    return element.dataset ?? null

                } catch (error) {
                    return null
                }

                return null
            },

            __get: function (elementSelector) {
                let self = window[globalKey]

                return self.DatasetHelpers.extractData(elementSelector)
            },

            object: {
                get: function (elementSelector, key, defaultValue = null) {
                    let self = window[globalKey]

                    if (typeof key != 'string') {
                        return defaultValue
                    }

                    let data = self.DatasetHelpers.extractData(elementSelector)

                    if (!data) {
                        return null;
                    }

                    if (key in data) {
                        return data[key] ?? defaultValue
                    }

                    return defaultValue
                },

                /**
                 * Example: DatasetHelpers #2
                 * @param {*} elementSelector
                 * @param {*} key
                 * @param {*} defaultValue
                 * @returns
                 */
                getFromJson: function (elementSelector, key, defaultValue = null) {
                    let self = window[globalKey]

                    return self.jsonParse(
                        self.DatasetHelpers.object.get(
                            elementSelector, key, defaultValue
                        )
                    ) ?? defaultValue
                },
            }
        },

        DomHelpers: {
            /**
             * Example: DomHelpers #1
             * @param {String} tagName
             * @param {Object} attributes
             * @returns HTML[tagName]Element
             */
            createTag : function (tagName, attributes) {
                let tag = document.createElement(tagName)

                let allAttr = []
                Object.entries(attributes).forEach(attr => {
                    let [key, value] = attr
                    tag.setAttribute(key, value)
                })

                return tag
            },
        },

        aliases: {
            datasetGet: function (elementSelector, key, defaultValue = null) {
                let self = window[globalKey]

                return self.DatasetHelpers.extractData(
                    elementSelector, key, defaultValue
                )
            },

            datasetKey: function (elementSelector, key, defaultValue = null) {
                let self = window[globalKey]

                return self.DatasetHelpers.object.get(
                    elementSelector, key, defaultValue
                )
            },

            datasetKeyToJson: function (elementSelector, key, defaultValue = null) {
                let self = window[globalKey]

                return self.DatasetHelpers.object.getFromJson(
                    elementSelector, key, defaultValue
                )
            },

            isJson: function (str) {
                let self = window[globalKey]

                return self.isJson(str)
            },

            gettype: function (data) {
                let self = window[globalKey]

                return self.gettype(data)
            },

            isType: function (data, typeToCheck) {
                let self = window[globalKey]

                return self.isType(data, typeToCheck)
            },

            jsonParse: function (data) {
                let self = window[globalKey]

                return self.jsonParse(data)
            },

            isNumeric: function (num) {
                let self = window[globalKey]

                return self.NumberHelpers.isNumeric(num)
            },

            range: function (start, end) {
                let self = window[globalKey]

                return self.NumberHelpers.range(start, end)
            },

            toFloat: function (value, precision = 2) {
                let self = window[globalKey]

                return self.NumberHelpers.toFloat(value, precision = 2)
            },

            toInt: function (value = '', defaultValue = null) {
                let self = window[globalKey]

                return self.NumberHelpers.toInt(value = '', defaultValue = null)
            },

            aliasName: function () {
                let self = window[globalKey]

                return self
            },
        }
    }

    Object.entries(helpers.aliases).forEach((value, key) => {
        let aliasKey = value[0]
        if ((aliasKey in window) && window[aliasKey] != value[1]) {
            aliasKey = `_${aliasKey}`
        }

        window[aliasKey] = value[1]
    })

    Object.entries(helpers).forEach((value, key) => {
        if (['aliases'].includes(value[0])) {
            return
        }

        window[globalKey][value[0]] = value[1]
    })
})('_helpers')
