import http.server
import socketserver
import os
import webbrowser

# Define the port to serve on
PORT = 8000

# Custom request handler
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Change the directory to 'src'
        src_directory = os.path.join(os.getcwd(), 'src')
        # Strip '/src' from the requested path
        if path.startswith('/src'):
            path = path[len('/src'):]
        # Construct the new path
        new_path = os.path.join(src_directory, path.lstrip('/'))
        return new_path

# Create the server
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    # Open the default web browser to the server URL
    webbrowser.open(f"http://localhost:{PORT}/")
    print(f"Serving HTTP on localhost port {PORT} (http://localhost:{PORT}/) ...")
    httpd.serve_forever()
