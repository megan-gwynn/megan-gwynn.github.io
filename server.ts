"use strict";

// Import necessary modules from Node.js standard library
import http from 'http';
import fs from 'fs';
import mime from 'mime-types'; // Third-party module for handling MIME types

// Alias for mime.lookup function for cleaner code
let lookup = mime.lookup;

// Set the server port (use environment variable PORT or default to 3000)
const port = process.env.PORT || 3000;

// Create an HTTP server instance
const server = http.createServer((req, res) => {
    // Extract the URL path from the request
    let path = req.url as string;

    // Redirect root or "home" to index.html
    if (path === "/" || path === "/home") {
        path = "/index.html";
    }

    // Determine the MIME type of the requested file
    let mime_type = lookup(path.substring(1));

    // Read the requested file from the file system
    fs.readFile(__dirname + path, function(err, data) {
        // Handle file-not-found errors
        if (err) {
            res.writeHead(404);
            res.end("Error 404 - File Not Found " + err.message);
            return;
        }

        // Fallback to 'text/plain' if the MIME type is unknown
        if (!mime_type) {
            mime_type = 'text/plain'; // Default MIME type if lookup fails
        }

        // Set content security headers and respond with the file
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200, {'Content-Type': mime_type});
        res.end(data);
    });
});

// Start the server and listen on the specified port
server.listen(port, () => {
    // Log message to the console when the server starts
    console.log(`Server running at http://localhost:${port}/`);
});