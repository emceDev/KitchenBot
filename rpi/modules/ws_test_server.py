import asyncio
import websockets
from data_handler import load_data
data=load_data('./data/testData.json')

print(data['tasks'][4]['jobs'][1])
# Dictionary to store connected clients
connected_clients = {}

async def handle_client(websocket, path):
    # Register the client
    connected_clients[websocket] = path
    print(f"Client connected from {path}")

    try:
        # Continuously listen for messages from the client
        async for message in websocket:
            print(f"Received message from {path}: {message}")
            # Echo the received message back to the client
            await websocket.send(message)
    except websockets.exceptions.ConnectionClosedOK:
        # Remove the client from the dictionary when the connection is closed
        del connected_clients[websocket]
        print(f"Client {path} disconnected")

async def main():
    # Start the websocket server
    async with websockets.serve(handle_client, "localhost", 8765):
        print("Server started")
        # Keep the server running indefinitely
        await asyncio.Future()

# Run the main coroutine
asyncio.run(main())
