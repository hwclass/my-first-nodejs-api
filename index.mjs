import http from 'http';
import url from 'url';

const server = http.createServer((request, response) => {
	// TODO: get the path
	const { pathname } = url.parse(request.url); // '/'

	// TODO: If path equals '/`, respond with "Hello, Node.js!"
	if (pathname === '/') {
		response.end('Hello, Node.js!');
	} else if (pathname === '/api') {
		const products = [{ "id": 0, "name": "Test Product 1", "price": 62.5, "currency": "EUR", "colors": ["brown", "blue"] }, { "id": 1, "name": "Test Product 2", "price": 26.7, "currency": "TR", "colors": ["yellow"] }, { "id": 2, "name": "Test Product 3", "price": 10, "currency": "USD", "colors": ["black", "white", "purple"] }, { "id": 3, "name": "Test Product 4", "price": 33, "currency": "Yen", "colors": ["customPink"] }];

		response.setHeader('Content-Type', 'application/json');
		response.writeHead(200);
		response.end(JSON.stringify(products));
	}
});

const PORT = 8081;

server.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
})

