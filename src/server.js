import http from 'http';
import httpProxy from 'http-proxy';

const apiURL = 'https://api.steampowered.com/ISteamApps/GetServersAtAddress/v1/'; // Replace with your API URL

const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
  // Set CORS headers to allow requests from your React app
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5175'); // Replace with your React app's URL
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Intercept the request to the API and modify the response
  proxy.web(req, res, { target: apiURL }, (error) => {
    console.error('Proxy Error:', error);

    // Optionally, you can send an error response to the client if the API request fails
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ error: 'Proxy Error' }));
  });

  // Handle the response from the API (optional)
  proxy.on('proxyRes', (proxyRes) => {
    let apiResponseData = '';

    proxyRes.on('data', (chunk) => {
      apiResponseData += chunk;
    });

    proxyRes.on('end', () => {
      // Send the API response data back to the client
      res.writeHead(proxyRes.statusCode, {
        'Content-Type': 'application/json',
      });
      res.end(apiResponseData);
    });
  });
});

const port = 3001; // Choose a suitable port number
server.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});