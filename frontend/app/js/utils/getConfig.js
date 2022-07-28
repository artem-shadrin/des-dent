import {getAttr} from "./getAttr";

export const getConfig = (element, selector) => {
    const attribute = getAttr(selector)
    const attributeValue = element.getAttribute(attribute)
    let json = {}

    try {
        json = JSON.parse(attributeValue)
    } catch (error) {
        console.debug(error)
    }

    return json
}