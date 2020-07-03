interface AnyCfg {
    [key: string]: any
}

const isMergeableObject = function (value: any) {
    return isNonNullObject(value) && isSpecial(value)
}

const isNonNullObject = function (value: unknown) {
    return !!value && typeof value === 'object';
}

const isSpecial = function (value: unknown) {
    const stringValue = Object.prototype.toString.call(value);
    return stringValue === '[object RegExp]'
        || stringValue === '[object Date]'
        || isReactElement(value);
}
const canUseSymbol = typeof Symbol === 'function' && Symbol.for;
const REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

const isReactElement = function (value: any) {
    return !!value && value.$$typeof === REACT_ELEMENT_TYPE
}

const emptyTarget = function (value: unknown) {
    return Array.isArray(value) ? [] : {}
}
const cloneUnlessOtherwiseSpecified = function (value: object, options: AnyCfg): object {
    return (options.clone !== false && options.isMergeableObject(value))
        ? deepmerge(emptyTarget(value), value, options)
        : value
}
const defaultArrayMerge = function (target: Array<any>, source: Array<any>, options: AnyCfg) {
    return target.concat(source).map(function (element) {
        return cloneUnlessOtherwiseSpecified(element, options)
    })
}
const getMergeFunction = function (key: string, options: AnyCfg) {
    if (!options.customMerge) return deepmerge;
    const customMerge = options.customMerge(key)
    return typeof customMerge === 'function' ? customMerge : deepmerge;
}

const getEnumerableOwnPropertySymbols = function (target: object) {
    return Object.getOwnPropertySymbols
        ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
            return target.propertyIsEnumerable(symbol)
        })
        : []
}
const getKeys = function (target: object) {
    //@ts-ignore
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}
const propertyIsOnObject = function (object: object, property: string) {
    try {
        return property in object
    } catch {
        return false
    }
}
const propertyIsUnsafe = function (target: object, key: string) {
    return propertyIsOnObject(target, key)
        && !(Object.hasOwnProperty.call(target, key))
        && Object.propertyIsEnumerable.call(target, key)
}
const mergeObject = function (target: object, source: object, options: AnyCfg) {
    const destination: any = {}
    if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function (key: keyof typeof target) {
            destination[key] = cloneUnlessOtherwiseSpecified(target[key], options)
        })
    }
    getKeys(source).forEach(function (key: keyof typeof source) {
        if (propertyIsUnsafe(target, key)) {
            return
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
            destination[key] = getMergeFunction(key, options)(target[key], source[key], options)
        } else {
            destination[key] = cloneUnlessOtherwiseSpecified(source[key], options)
        }
    })
    return destination;
}
const deepmerge = function (target: object, source: object, options?: AnyCfg) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || defaultArrayMerge;
    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

    const sourceIsArray = Array.isArray(source);
    const targetIsArray = Array.isArray(target);
    const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
   console.log(source, target)
    if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options)
    } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options)
    } else {
        return mergeObject(target, source, options)
    }

}

deepmerge.all = function (array: Array<any>, options: AnyCfg) {
    if (!Array.isArray(array)) {
        throw new Error('first argument should be an array')
    }
    return array.reduce(function (prev, next) {
        return deepmerge(prev, next, options)
    }, {})

}


const simpleArrayMerge = function (source: Array<any>, target: Array<any>) {
    const loop: any[] = []
    const sourceIsArray = Array.isArray(source);
    const targetIsArray = Array.isArray(target);
    const isArray = sourceIsArray === (targetIsArray === true);
    if (isArray) {
        source.forEach(function (sor) {
            const result = target.find(function (tar) {
                return sor.id === tar.id && sor.type === tar.type
            })
            if (!result) {
                loop.push(sor)
            }
        })
        return loop.concat(target)
    }
}



export {
    isMergeableObject,
    deepmerge,
    simpleArrayMerge,
} 