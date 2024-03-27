import json
import asyncio
import websockets
from .task import Task
from .components import Container,Stove,Tool
from collections import deque
"""
codes of communication:
MOV,OPN,CLS,PIC,DRP,MIX
add:container
mix:mixer
"""
class UtilityClient:
    def __init__(self, websocket, utility_data):
        self.websocket = websocket
        self.utility_data = utility_data
        self.dvc_stat = None
        self.job_stat= None
        self.curr_job =None
        self.message_queue = deque()  # Queue to store incoming messages

    async def receive_message(self):
        try:
            async for message in self.websocket:
                message = json.loads(message)
                # print(message)
                if 'code' in message:
                    if message['code']=='RPT':
                        print('set util data')
                    else:
                        self.message_queue.append(message)  # Add received message to the queue
        except websockets.exceptions.ConnectionClosedOK:
            print("Client disconnected")

    async def get_next_message(self):
        while True:
            if self.message_queue:
                return self.message_queue.popleft()
            await asyncio.sleep(0.1)  # Wait for messages if the queue is empty

    async def send_message(self, code, data=None):
        ws_message = {
            "code": code,
            "identifier": self.utility_data['identifier'],
            "data": data
        }
        await self.websocket.send(json.dumps(ws_message))

    #later take instruction generation to server for now let it be here to test
    async def handle_job(self,data):
        print("UTILITY JOB HANDLING")
        jobType = data['job'].jobType
        if(jobType=='add'):
            job = data['job']
            stove = data['stove']
            container = data['container']
            instructions=[{'code':'IMV','data': container.position},
                        {'code':'IPC'},
                        {'code':'IMV','data': stove.position},
                        {'code':'IOC'},
                        {'code':'ICC'},
                        {'code':'IMV','data': 50},
                        {'code':'IDC'},
                        {'code':'IMV','data':0}
                        ]
            index = 0
            for instruction in instructions:
                # print('SENDING MESSAGE')
                # print(instruction)
                if 'data' in instruction:
                    await self.send_message(instruction['code'],instruction['data'])
                else:
                    await self.send_message(instruction['code'])

                # print('LISTENING FOR RESPONSE')
                res = await self.get_next_message()  # Wait for the response message
                # print('GOT RESPONSE')
                if res['code']=='IPS':
                    print('Instruction processing success')
                    index=index+1
                if res['code']=='IPE':
                    print('instruction processing error')
                    reason=res['data']['reason']
                    self.job_stat={'code':res['code'],'reason':reason,'instruction':instructions[index]}
                    print('error occured, waiting for user interaction...')
                    print(self.job_stat)
                    return
                    
                
        
class WebSocketServer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.clients = {}

    async def start(self):
        async with websockets.serve(self.handle_client, self.host, self.port):
            await asyncio.Future()

    async def handle_client(self, websocket, path):
        try:
            print("Client connected")
            ws_data = await websocket.recv()
            ws_data = json.loads(ws_data)
            print('Client data:')
            print(ws_data)
            self.clients[ws_data['identifier']] = UtilityClient(websocket, ws_data['utility_data'])

            await self.clients[ws_data['identifier']].receive_message()

        except websockets.exceptions.ConnectionClosedError:
            print("Client disconnected unexpectedly")
        finally:
            # Handle client disconnection
            for identifier, client in list(self.clients.items()):
                if client.websocket == websocket:
                    del self.clients[identifier]
                    print("Client disconnected")

    def get_capable_utility(self,jobType):
        # print('SEARCHING FOR UTILITY FOR THE JOB: ',jobType)
        for client_number, client in self.clients.items():
            if jobType in client.utility_data['jobTypes'] and client.utility_data['status'] == 'idle':
                return client
