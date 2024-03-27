import asyncio
import websockets
import json

utility_data_1 = {
    "macAddress": "01",
    "jobTypes": ["add", "mix"],
    "position": 0,
    "status": "idle",
    "version": "G0.1",
    "number": "grabber0"
}
# server_url ="ws://192.168.43.17:80/"
server_url= "ws://localhost:8080/"



class Utility:
    def __init__(self, mac_address, jobTypes, position, status, version, number):
        self.mac_address = mac_address
        self.jobTypes = jobTypes
        self.position = position
        self.status = status
        self.version = version
        self.number = number
        self.websocket = None
        self.currPos = None
        self.direction = True

    async def send(self, code, data=None):
        utility={ "identifier": self.number,
            "mac_address": self.mac_address,
            "jobTypes": self.jobTypes,
            "position": self.position,
            "status": self.status,
            "version": self.version}
        if self.websocket:
            ws_message = {
                "identifier": self.number,
                "code": code,
                "data": data,
                "utility_data":utility
            }
            # print(ws_message)
            await self.websocket.send(json.dumps(ws_message))
        else:
            print("WebSocket connection is not established.")

    async def connect(self, server_url):
        try:
            self.websocket = await websockets.connect(server_url+'/'+self.number)
            await self.send('AIC', self.number)
            print(f"Connected to WebSocket server for {self.number}")
            await asyncio.gather(self.sensor_monitor(), self.receive())
        except Exception as e:
            print(f"Failed to connect to WebSocket server: {e}")

    async def performJob(self, job):
        await self.send('AJP')
        try:
            print('performing job', job)
            await asyncio.sleep(4)
            await self.send('AJF')
        except Exception as e:
            print(f'error performing the job: {e}')
            await self.send('AJE', {"reason": 'job performing error/sensor error or something'})

    async def receive(self):
        try:
            while True:
                if (self.websocket==None):
                   print('no websocket to listen on')
                else:
                    message = await self.websocket.recv()
                    message= json.loads(message)
                    print('received message')
                    print(message['code'])
                    data=None
                    # print(f"Received message: {message}")
                    if 'data' in message:
                        data=message['data']
                    match message['code']:
                        case 'IMV':
                            await self.move_to_pos(message['data'])
                        case 'IPC':
                            await self.pick_container(data)
                        case 'IOC':
                            await self.open_container(data)
                        case 'ICC':
                            await self.close_container(data)
                        case 'IDC':
                            await self.drop_container(data)
                        case 'IFS':
                            print('stopping the job')
                        case 'A3S':
                            print('Job successfully performed')
                        case _:
                            print('Unknown code')
                    # Process the received message here
        except websockets.exceptions.ConnectionClosedOK:
            print("WebSocket connection closed")

    async def move_to_pos(self, data):
        print("MOVING TO POS",data)
        await asyncio.sleep(1)
        # await self.send('IPS')
        await self.send('IPE',data={'reason':'overheat'})

    async def pick_container(self, container):
        print("PICKING CONTAINER")
        await asyncio.sleep(1)
        await self.send('IPS')

    async def drop_container(self, container):
        print('DROPPING CONTAINER')
        await asyncio.sleep(1)
        await self.send('IPS')

    async def close_container(self, container):
        print('CLOSING CONTAINER')
        await asyncio.sleep(1)
        await self.send('IPS')

    async def open_container(self, container):
        print('OPENING CONTAINER')
        await asyncio.sleep(1)
        await self.send('IPS')

    async def sensor_monitor(self):
        print('INITIATING MONITORING')
        while True:
            print("Reporting...")
            # Your task logic goes here
            await self.send('RPT')
            await asyncio.sleep(5)
        # constant monitoring on position
        # if hall sensor high change self.currPos + 1
        
async def initialize_clients():
    utility = Utility(
        mac_address="02",
        jobTypes=["add", "mix"],
        position=1,
        status="idle",
        version="G0.2",
        number="grabber1"
    )
    utility2 = Utility(
        mac_address="02",
        jobTypes=["add", "mix"],
        position=1,
        status="idle",
        version="G0.1",
        number="grabber2"
    )
    # await utility.connect(server_url)
    await asyncio.gather(utility.connect(server_url), utility2.connect(server_url))
   
    # Keep the connection alive
    while True:
        await asyncio.sleep(1)

# Create and run the event loop
async def main():
    await initialize_clients()

asyncio.run(main())