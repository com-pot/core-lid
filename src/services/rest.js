class Rest {
    constructor(/**string*/ rootUrl) {
        if (typeof rootUrl !== "string") {
            throw new Error("Rest rootUrl param must be a string");
        }
        if (rootUrl.charAt(rootUrl.length - 1) !== '/') {
            rootUrl += '/'
        }

        this.rootUrl = rootUrl;
    }


    get(path, options = {}) {
        return this._query(path, "GET", undefined, options);
    }

    post(path, data = {}, options = {}) {
        return this._query(path, "POST");
    }

    put(path, data = {}, options = {}) {
        return this._query(path, "PUT", data, options);
    }

    delete(path, data = {}, options = {}) {
        return this._query(path, "DELETE", data, options);
    }

    _query(path, method, body, options) {
        const queryStr = options.query ? this._serializeQuery(options.query) : "";

        return fetch(this.rootUrl + path + ".json" + queryStr, {
            method,
            body,
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            })
            .then((result) => result.data);
    }

    _serializeQuery(obj) {
        return '?' + Object.keys(obj).reduce(function (a, k) {
            a.push(k + '=' + encodeURIComponent(obj[k]));
            return a
        }, []).join('&');
    }
}

export default Rest