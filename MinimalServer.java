import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.net.InetSocketAddress;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;

public class MinimalServer {
    public static void main(String[] args) throws IOException {
        // 1) Create an HttpServer listening on port 8080
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // 2) Create a context ("/") to serve index.html
        server.createContext("/", new RootHandler());

        // 3) Create a context ("/update") to return JSON
        server.createContext("/update", new UpdateHandler());

        // 4) Start the server
        server.start();
        System.out.println("Server listening on http://localhost:8080/");
    }

    // Serves index.html for GET requests to "/"
    static class RootHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(405, -1); // 405 Method Not Allowed
                return;
            }

            // Path to your index.html (same folder as this class, or wherever you put it)
            Path filePath = Paths.get("index.html");
            if (!Files.exists(filePath)) {
                // If the file is not found, send 404
                exchange.sendResponseHeaders(404, -1);
                return;
            }

            // Read all bytes from index.html
            byte[] fileBytes = Files.readAllBytes(filePath);

            // Respond with "text/html"
            exchange.getResponseHeaders().set("Content-Type", "text/html");
            exchange.sendResponseHeaders(200, fileBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(fileBytes);
            }
        }
    }

    // Returns JSON for GET requests to "/update"
    static class UpdateHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(405, -1);
                return;
            }

            // Create some JSON response
            String jsonResponse = "{ \"message\": \"Hello from /update\" }";

            // Set Content-Type to application/json
            exchange.getResponseHeaders().add("Content-Type", "application/json");

            // Convert JSON to bytes
            byte[] responseBytes = jsonResponse.getBytes();
            exchange.sendResponseHeaders(200, responseBytes.length);

            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        }
    }
}
