class BaseModel {
    constructor() {
    }

    getFields(options = {}) {
        const result = [];
        const exclude = new Set(options.exclude ?? []);
        const include = new Set(options.include ?? []);
        if (exclude.size || include.size) {
            for (const property of Object.keys(this)) {
                if (include.size && include.has(property)) {
                    result.push(property);
                } else if (exclude.size && !exclude.has(property)) {
                    result.push(property);
                }
            }
            return result;
        }
        return Object.keys(this);
    }
}

module.exports = BaseModel;