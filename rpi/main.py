# cannot start websocket server with this... some socket pool error.
import wifi
import socketpool
import ipaddress

# Set access point credentials
ap_ssid = "NoBajcyklesInBejzyn"
ap_password = "wajfajwaj"
m_id="65ec315dcb3afbae1a035da2"
getMachineUrl = "machine/${m_id}"
wifi.radio.connect(ap_ssid, ap_password)

print("Connetcted with SSID: {}, password: {}".format(ap_ssid, ap_password))
print("My IP address is", str(wifi.radio.ipv4_address))
print("connected?",str(wifi.radio.connected))
# Create a socket pool
pool = socketpool.SocketPool(wifi.radio)

# Create a simple HTTP server function
def simple_http_server():
    server_socket = pool.socket()
    server_socket.bind((str(wifi.radio.ipv4_address), 80))
    server_socket.listen(1)

    print("Server is listening on {}:80".format(wifi.radio.ipv4_address))
    
    # fetch data from server
    # 
    while True:
        print("Waiting for a connection...")
        client_socket, client_address = server_socket.accept()
        print("Accepted connection from:", client_address)

        client_socket.send("HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\n")
        client_socket.send("<html>Hello, World!</html>\r\n")
        client_socket.close()

# Start the HTTP server
simple_http_server()

