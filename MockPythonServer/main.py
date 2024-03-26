import asyncio
import websockets
import json
from modules.data_handler import load_data

class UtilityClient:
    def __init__(self, websocket, utility_data):
        self.websocket = websocket
        self.utility_data = utility_data

    async def send_message(self, code, data=None):
        ws_message = {
            "code": code,
            "identifier": self.utility_data['identifier'],
            "data": data
        }
        await self.websocket.send(json.dumps(ws_message))

class WebSocketServer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.clients = {}
        self.needed = 2
        self.provided = 0

    async def start(self):
        async with websockets.serve(self.handle_client, self.host, self.port):
            await asyncio.Future()

    async def handle_client(self, websocket, client_number):
        print(f"Client connected with number: {client_number}")
        ws_data = await websocket.recv()
        ws_data = json.loads(ws_data)
        self.clients[ws_data['identifier']] = UtilityClient(websocket, ws_data['utility_data'])
        await self.check_and_run_jobs()
        try:
            async for message in websocket:
                print(f"Received message from {client_number}: {message}")
        except websockets.exceptions.ConnectionClosedOK:
            del self.clients[websocket]
            print(f"Client {client_number} disconnected")

    async def check_and_run_jobs(self):
        self.provided += 2
        if self.provided == self.needed:
            print('Running jobs...')
            await self.run_jobs()
        else:
            print('Not enough tools, containers, or utilities.')

    async def run_jobs(self):
        for job in jobs:
            job_type = job['jobType']
            for client_number, client in self.clients.items():
                if job_type in client.utility_data['job_types'] and client.utility_data['status'] == 'idle':
                    await self.initialize_job(client, job)

    async def initialize_job(self, client, job):
        if job['jobType'] == 'add':
            await client.send_message('RNJ', job)

# Load machine data
machine = load_data('./data/testData.json')
jobs = machine['receipes'][0]['jobs']

async def main():
    server = WebSocketServer("127.0.0.1", 8080)
    print('running server')
    await server.start()


# Run the main coroutine
asyncio.run(main()) 
