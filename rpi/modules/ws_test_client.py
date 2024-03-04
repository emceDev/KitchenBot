import asyncio
import websockets
import random
import string
from data_handler import load_data
data=load_data('../data/testData.json')
utilities = data['utilities']


class Utility:
    def __init__(self, data):
        self.type = data.get('type')
        self.name = data.get('name')
        self.status = data.get('status')
        self.position = data.get('position')
        self.job_type = data.get('jobType')
        self.options = []
        self.id = data.get('_id')
        for option in data.get('options', []):
            option_data = {
                'name': option.get('name'),
                'values': option.get('values'),
                'set': option.get('set'),
                '_id': option.get('_id')
            }
            self.options.append(option_data)

    def report_sensor_statuses(self):
        print(f"Type: {self.type}")
        print(f"Name: {self.name}")
        print(f"Status: {self.status}")
        print(f"Position: {self.position}")
        print(f"Job Type: {self.job_type}")
        print("Options:")
        for option in self.options:
            print(f"  Name: {option['name']}")
            print(f"  Values: {', '.join(option['values'])}")
            print(f"  Set: {option['set']}")
            print(f"  ID: {option['_id']}")
            print("")

    def update_sensor_data(self, new_sensor_data):
        # Update sensor data
        # For simplicity, let's assume new_sensor_data is a dictionary with updated sensor values
        for option in self.options:
            option['values'] = new_sensor_data.get(option['name'], option['values'])

class WebSocketClient:
    def __init__(self, url):
        self.url = url
        self.websocket = None

    async def connect(self):
        self.websocket = await websockets.connect(self.url)
        print("Connected to WebSocket server")

    async def send_message(self, message):
        await self.websocket.send(message)
        print("Sent message:", message)

    async def listen(self, utility):
        async for message in self.websocket:
            # Handle incoming messages here
            print("Received message:", message)
            # Modify the Utility object based on incoming data
            # For demonstration purposes, let's assume the incoming message contains data to update the Utility object
            utility.update_from_message(message)
            # Report sensor statuses
            utility.report_sensor_statuses()

    async def send_sensor_data(self, utility):
        # Prepare sensor data to send to the server
        # For demonstration purposes, let's assume sensor data is sent as JSON
        sensor_data = {
            'type': utility.type,
            'name': utility.name,
            'sensor_values': {
                option['name']: option['values'] for option in utility.options
            }
        }
        await self.send_message(sensor_data)

    async def close(self):
        if self.websocket:
            await self.websocket.close()


async def main():
    print('MAIN')
    url='ws://localhost:8765'
    utility = Utility(utilities[0])
    client = WebSocketClient(f'{url}/{utility.id}')
    try:
        await client.connect()
        await client.send_message('give me order')
    except:
        print('conncetion failed')
    # Simulate multiple client connections
    # clients = utilities
    # utils = [simulate_client(client['_id']) for client in utilities]
    # await simulate_client(utilities[0])
    # # Start all client coroutines concurrently
    # await asyncio.gather(*utils)

# Run the main coroutine
asyncio.run(main())
