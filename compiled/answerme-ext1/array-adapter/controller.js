export class ArrayAdapter {
    /**
     * we use rest parameter so that the user can add
     * as many items as they want during instantiation
     */
    constructor(...items) {
        this.baseArray = items;
    }
    push(item) {
        this.baseArray.push(item);
        return Promise.resolve(item);
    }
    pop() {
        let item = this.baseArray.pop();
        return Promise.resolve(item);
    }
    filter(funct) {
        let list = this.baseArray.filter(funct);
        return Promise.resolve(list);
    }
    find(funct) {
        let item = this.baseArray.find(funct);
        return Promise.resolve(item);
    }
}
export default ArrayAdapter;
//# sourceMappingURL=controller.js.map