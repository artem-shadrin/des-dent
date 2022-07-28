export default class Collection {
  constructor() {
    this._collection = []
  }

  set collection(newCollectionItem) {
    const instanceIsCollection = this.getByDOMElement(newCollectionItem)
    if (!instanceIsCollection) this._collection = [...this._collection, newCollectionItem]
  }

  get collection() {
    return this._collection
  }

  getByDOMElement(DOMElement) {
    return this.collection.find(item => item.instance === DOMElement)
  }
}