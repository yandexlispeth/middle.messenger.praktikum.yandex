
const enum METHODS {
	GET = 1,
	PUT,
	POST,
	DELETE
}


function queryStringify(data:unknown) {
	const arr = [];
	for (const [key, value] of Object.entries(data)) {
		arr.push(`${key}=${value}`);
	}
	return '?' + arr.join('&');
}

function getMethodName(method:METHODS):string {
    switch(method) {
        case METHODS.GET: return "GET";
        case METHODS.POST: return "POST";
        case METHODS.PUT: return "PUT";
        case METHODS.DELETE: return "DELETE"
    }
}

interface IOptions {
    method: METHODS,
    headers: {[key: string]: string},
    data: any,
    timeout: number
}

export class HTTPTransport {
	get = (url:string, options:IOptions) => {
		return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
	};

	post = (url:string, options:IOptions) => {
		return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
	}

	put = (url:string, options:IOptions) => {
		return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
	}

	delete = (url:string, options:IOptions) => {
		return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
	}

	request = (url:string, options:IOptions, timeout = 5000) => {
		const xhr = new XMLHttpRequest();
		if(options.method === METHODS.GET && options.data) {
			url += queryStringify(options.data);
		}

		xhr.timeout = timeout;
      
    if(options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
		xhr.setRequestHeader(key, value);
      }
    }
      
		return new Promise((resolve, reject) => {
			xhr.open(getMethodName(options.method), url);

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (options.method === METHODS.GET || !options.data) {
				xhr.send();
			} else {
				xhr.send(options.data);
            }
		});
	};
}
