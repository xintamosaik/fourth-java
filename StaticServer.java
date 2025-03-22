import com.sun.net.httpserver.*;
import java.io.*;
import java.net.*;

public class StaticServer {
    public static void main(String[] args) throws IOException {
        // 1) Create server listening on port 8080
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // 2) Serve index.html at "/"
        server.createContext("/", new FileHandler("index.html"));

        // 3) Serve static files from /static/ folder
        server.createContext("/static", new StaticFileHandler("static"));

        // 4) Respond with JSON at "/update"
        server.createContext("/update", new UpdateHandler());

        // 5) Start the server
        server.start();
        System.out.println("Server running at http://localhost:8080/");
    }

    // Handler to serve index.html
    static class FileHandler implements HttpHandler {
        private final String filePath;

        FileHandler(String filePath) {
            this.filePath = filePath;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            File file = new File(filePath);
            if (!file.exists()) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }

            exchange.getResponseHeaders().set("Content-Type", "text/html");
            exchange.sendResponseHeaders(200, file.length());

            try (OutputStream os = exchange.getResponseBody();
                 FileInputStream fs = new FileInputStream(file)) {
                fs.transferTo(os);
            }
        }
    }

    // Handler to serve static files
    static class StaticFileHandler implements HttpHandler {
        private final String basePath;

        StaticFileHandler(String basePath) {
            this.basePath = basePath;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath().replace("/static", "");
            File file = new File(basePath + path);

            if (!file.exists() || file.isDirectory()) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }

            // Basic content-type guessing (for simplicity)
            String contentType = guessContentType(file.getName());
            exchange.getResponseHeaders().set("Content-Type", contentType);

            exchange.sendResponseHeaders(200, file.length());
            try (OutputStream os = exchange.getResponseBody();
                 FileInputStream fs = new FileInputStream(file)) {
                fs.transferTo(os);
            }
        }

        // Simple content-type detection
        private String guessContentType(String fileName) {
            if (fileName.endsWith(".html")) return "text/html";
            if (fileName.endsWith(".css")) return "text/css";
            if (fileName.endsWith(".js")) return "application/javascript";
            if (fileName.endsWith(".png")) return "image/png";
            if (fileName.endsWith(".jpg")) return "image/jpeg";
            return "application/octet-stream"; // Default for unknown types
        }
    }

    // Handler for the "/update" JSON endpoint
    static class UpdateHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
                return;
            }

            String jsonResponse = "{ \"message\": \"Hello from /update\" }";
            exchange.getResponseHeaders().add("Content-Type", "application/json");

            byte[] responseBytes = jsonResponse.getBytes();
            exchange.sendResponseHeaders(200, responseBytes.length);

            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        }
    }
}
