# connecto to wifi DONE
# connect to Node server DONE
# download machine data DONE
#CREATE MOCK PYTHON SERVER? AND MOCK PYTHON CLIENTS TO SET AND TEST
# get the receipe DONE
    #parse receipe to a schedule - mock it for now
#initialize websockets with esps
    #SRV: set job status on server
    #WS: pass job to esp
        #wait for status
    #

import asyncio
import websockets
from modules.data_handler import load_data
import json
import time
machine=load_data('./data/testData.json')

jobs= machine['receipes'][0]['jobs']
class client:
    def __init__(self, mac_address, job_types, position, status, version, number):
        self.mac_address = mac_address
        self.job_types = job_types
        self.position = position
        self.status = status
        self.version = version
        self.number = number

    def __repr__(self):
        return f"Job(macAddress='{self.mac_address}', jobTypes={self.job_types}, position={self.position}, status='{self.status}', version='{self.version}', number='{self.number}')"



clients = {}
needed = 2
provided =0
def run_jobs():
    global clients
    # Map jobs
    # job_type == add => map utils => if util.status idle?send job
    for job in jobs:
        match job['jobType']:
            case 'mix':
                for client in clients.values():
                    if job['jobType'] in client.job_types:
                        sendJob(job, client)  # Passing the WebSocket object to sendJob
                    else:
                        print("Job type not supported by client:", job['jobType'])

def sendJob(task,client):
    print('sending...')
    print(task)
    print(client)
    # Send via websockets
    client.send(task)

def if_can_run():
    # map required job types
    # chec if there are devices connected needed for those job types in connections
    # scan for tools and containers and register their position
    # map tasks and run them one by one 
    global provided
    global needed
    provided=provided+1
    print('if can run')
    if provided==needed:
        print('running jobs')
        run_jobs()
    else:
        print('not enough tools, containers or utilities')

async def handle_client(websocket, path):
    global clients
    # Register the client
    print(f"Client connected from {path}")
  
    data = await websocket.recv()
    data = json.loads(data)
    clients[data['number']]=websocket
    # print(clients)
    if_can_run()
    try:
        # Continuously listen for messages from the client
        async for message in websocket:
            print(f"Received message from {path}: {message}")
            message()
            # Echo the received message back to the client
            await websocket.send(message)
    except websockets.exceptions.ConnectionClosedOK:
        # Remove the client from the dictionary when the connection is closed
        del clients[websocket]
        print(f"Client {path} disconnected")

async def send():
    print('client list:')
    print(clients)
    print('sending')
    for job in jobs:
        print('send job go to container.pos')
        print('waiting for response')
        print('send job pick')
        print('waiting for response')
        print('send job go to stove.pos')
        print('waiting for response')
        print('send job open')
        print('waiting for response')
        print('send job close')
        print('waiting for response')
        print('send go pos')



async def main():
    # Start the websocket server
    async with websockets.serve(handle_client, "localhost", 8765):
        # Keep the server running indefinitely 
        await asyncio.Future()
        
# Run the main coroutine
asyncio.run(main())




# fetch data from server
# check for needed in jobs utilites and tools if they are aviable
# ?wait for connections
# :initiate job sending