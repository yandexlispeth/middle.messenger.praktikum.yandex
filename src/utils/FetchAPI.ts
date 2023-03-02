
// const METHODS = {
// 	GET: 'GET',
// 	PUT: 'PUT',
// 	POST: 'POST',
// 	DELETE: 'DELETE'
// };


// function queryStringify(data) {
// 	const arr = [];
// 	for (const [key, value] of Object.entries(data)) {
// 		arr.push(`${key}=${value}`);
// 	}
// 	return '?' + arr.join('&');
// }

// export class HTTPTransport {
// 	get = (url:string, options = {}) => {
// 		return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
// 	};

// 	post = (url:string, options = {}) => {
// 		return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
// 	}

// 	put = (url:string, options = {}) => {
// 		return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
// 	}

// 	delete = (url:string, options = {}) => {
// 		return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
// 	}

// 	request = (url, options, timeout = 5000) => {
// 		const xhr = new XMLHttpRequest();
// 		if(options.method === METHODS.GET && options.data) {
// 			url += queryStringify(options.data);
// 		}

// 		xhr.timeout = timeout;
      
//     if(options.headers) {
//       for (const [key, value] of Object.entries(options.headers)) {
// 		xhr.setRequestHeader(key, value);
//       }
//     }
      
// 		return new Promise((resolve, reject) => {
// 			xhr.open(options.method, url);

// 			xhr.onload = function () {
// 				resolve(xhr);
// 			};

// 			xhr.onabort = reject;
// 			xhr.onerror = reject;
// 			xhr.ontimeout = reject;

// 			if (options.method === METHODS.GET || !options.data) {
// 				xhr.send();
// 			} else {
// 				xhr.send(options.data);
//             }
// 		});
// 	};
// }
