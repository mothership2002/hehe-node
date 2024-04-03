class Resource {
    url;
    method;
    content;
    filename;

    constructor(url, method, content, filename) {
        this.url = url;
        this.method = method;
        this.content = content;
        this.filename = filename;
    }

    getUrl() {
        return this.url;
    }

    getMethod() {
        return this.method;
    }

    getFilename() {
        return thi.filename;
    }

    getContent() {
        return this.content;
    }

    getJsonData() {
        return {
            url: this.url,
            method: this.method,
            filename: this.filename,
            content: this.content
        }
    }

}