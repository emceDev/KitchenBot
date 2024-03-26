import socketpool
import wifi
from adafruit_httpserver import Server, Request, Websocket

# Connect to WiFi
ap_ssid = "NoBajcyklesInBejzyn"
ap_password = "wajfajwaj"

print("connecting to wifi")
wifi.radio.connect(ap_ssid, ap_password)
print("Connected with SSID: {}, password: {}".format(ap_ssid, ap_password))
print("My IP address is", str(wifi.radio.ipv4_address))
print("Connected?", str(wifi.radio.connected))

pool = socketpool.SocketPool(wifi.radio)
print(pool)

server = Server(pool, debug=True)

websocket: Websocket = None

def simple_web_socket_connection(request: Request):
    global websocket

    if websocket is not None:
        websocket.close()

    websocket = Websocket(request)

    # Send WebSocket message
    websocket.send("Hello, World!")  # Send WebSocket message

    return websocket

def simple_http_server():
    server_socket = pool.socket()
    server_socket.bind((str(wifi.radio.ipv4_address), 80))
    server_socket.listen(1)

    print("Server is listening on {}:80".format(wifi.radio.ipv4_address))

    while True:
        print("Waiting for a connection...")
        client_socket, client_address = server_socket.accept()
        print("Accepted connection from:", client_address)
        print(client_socket)

        # Create a fake HTTP request to pass to the WebSocket handler
        request = Request(client_socket)
        simple_web_socket_connection(request)

        client_socket.close()

# Start the HTTP server
simple_http_server()

