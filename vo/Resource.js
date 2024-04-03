class Resource {
    url;
    filename;

    GET;
    POST;
    DELETE;
    PUT;

    constructor(url, filename) {
        this.url = url;
        this.filename = filename;
    }

    getUrl() {
        return this.url;
    }

    getFilename() {
        return this.filename;
    }

    getJsonData() {
        return {
            url: this.url,
            filename: this.filename,
            GET: this.GET,
            POST: this.POST,
            DELETE: this.DELETE,
            PUT: this.PUT
        }
    }

    update(resource) {
        if (!resource instanceof Resource) {
            throw new Error('it isnt instant Resource')
        }
        if (resource.GET)       this.GET = resource.GET
        if (resource.POST)      this.POST = resource.POST
        if (resource.DELETE)    this.DELETE = resource.DELETE
        if (resource.PUT)       this.PUT = resource.PUT

        return this;
    }

    addMethod(resource) {
        resource
    }

    init(jsonObj) {
        Object.keys(jsonObj).map(key => jsonObj[key.toUpperCase()] = jsonObj[key]);
        this.GET = jsonObj.GET;
        this.POST = jsonObj.POST;
        this.DELETE = jsonObj.DELETE;
        this.PUT = jsonObj.PUT;
    }
}

module.exports = Resource;