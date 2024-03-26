import json
from datetime import datetime, timedelta
import asyncio
import websockets
import time
class UtilityClient:
    def __init__(self, websocket, utility_data):
        self.websocket = websocket
        self.utility_data = utility_data

    async def receive_message(self):
        try:
            async for message in self.websocket:
                print(f"Received message: {message}")
        except websockets.exceptions.ConnectionClosedOK:
            print("Client disconnected")

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
        print('SEARCHING FOR UTILITY FOR THE JOB: ',jobType)
        for client_number, client in self.clients.items():
            if jobType in client.utility_data['jobTypes'] and client.utility_data['status'] == 'idle':
                return client


class Container:
    def __init__(self, number, position):
        self.type = "container"
        self.number = number
        self.position = position


    def configure(self):
        print('configuring Container')   

class Stove:
    def __init__(self, number, position):
        self.number = number
        self.position = position
        self.is_ignited = False
        self.ignition_times = []
        self.is_occupied = False
        self._id = None
        self.name = None
        self.stove_type = None

    def configure(self):
        print('configuring stove')

class Tool:
    def __init__(self, name, jobType, options, position, number):
        self.name = name
        self.type = "tool"
        self.jobType = jobType
        self.options = options
        self.position = position
        self.number = number
        self.status = 'idle'


class Utility:
    def __init__(self, utility_id,utility_data):
        self.id=utility_id
        self.__dict__.update(utility_data)

    def connect(self):
        #search for mac addresses in network
        print('connection established')

    def dispatch(self,job):
        print('job sent')

class Job:
    def __init__(self, job_id, job_data):
        # print(job_data)
        self.id = job_id
        self.jobType = job_data.pop('jobType')
        self.container=job_data.pop('container',None)
        self.stove=job_data.pop('stove',None)
        self.options = job_data.pop('options',None)
        self.__dict__.update(job_data)

    def get_utilities(self):
        return self.jobType,self.container,self.stove,
    
    def __str__(self):
        return str(self.__dict__)

class Task:
    def __init__(self, machine,task_id, task_data):
        self.id = task_id
        self.status = task_data.get('status') 
        self.machine=machine
        self.__dict__.update(task_data)
        self.add_jobs(task_data.get('jobs', []))  # Convert list to dictionary
        self.schedule={}

    def add_job(self, job_id, job_data):
        self.jobs[job_id] = Job(job_id, job_data)

    def add_jobs(self, jobs_data):
        self.jobs = {}  # Initialize as an empty dictionary
        for job_data in jobs_data:
            job_id = job_data['_id']
            self.add_job(job_id, job_data)

    def set_status(self,code,details):
        self.status = {'code': code, 'details': details}

    def generate_schedule(self):
        start_time = datetime.now()  # Start from current time
        schedule = []

        for job_id, job in self.jobs.items():
            if job.jobType == "pause":
                duration = int(job.options.get("duration", 0))  # Assuming duration is provided in seconds
                end_time = start_time + timedelta(seconds=duration)
            else:
                # Calculate duration based on job type or any other criteria
                duration = 0  # Placeholder for duration calculation
                end_time = start_time + timedelta(seconds=duration)

            schedule.append({
                "job_id": job_id,
                "start_time": start_time,
                "end_time": end_time,
                "status": "Scheduled"
            })

            # Update start_time for next job
            start_time = end_time

        self.schedule = schedule
    

    def view_schedule(self):
        if self.schedule:
            for item in self.schedule:
                print(item)
        else:
            print("Schedule not generated yet.")

    async def execute_jobs(self):
        if not self.schedule:
            print("Schedule not generated yet. Please generate schedule first.")
            return

        for item in self.schedule:
            job_id = item["job_id"]
            job = self.jobs.get(job_id)
            if job:
                if job.jobType=='add':
                    print()
                    container=self.machine.containers.get(job.container['number'])
                    stove=self.machine.stoves.get(job.stove['number'])
                    print("SEARCHING FOR FREE UTILITY")
                    
                    for i in range(20):
                        util = self.machine.server.get_capable_utility(job.jobType)
                        if (util):
                            print('found util',util)
                            await util.send_message('RNJ')

                        else:
                            print('util not found')
                        await asyncio.sleep(1)
                        
                    # find free utility
                    # utility.send('move',container.position)
                    # utility.send('pick',container.type)
                    # utility.send('move',stove.position)
                # print(jobData)
                # job is add => find utility with jobType add => pass move to containerobj.pos=>

            else:
                print(f"Job {job_id} not found in task.")

class Machine:
    def __init__(self,name,password):
        self.name=name
        self.password=password
        self.current_task=None
        self.utilities={}
        self.tasks = {}
        self.containers ={}
        self.stoves={}
        self.server=None

    def add_task(self,machine, task_id, task_data):
        self.tasks[task_id] = Task(machine,task_id, task_data)
    
    def add_utility(self,utility_id,utility_data):
        self.utilities[utility_id]=Utility(utility_id,utility_data)

    def get_task_by_id(self, task_id):
        return self.tasks.get(task_id)
    
    def get_utility_by_id(self, utility_id):
        return self.utilities.get(utility_id)
    
    def get_job_by_task_id(self, task_id, job_id):
        task = self.get_task_by_id(task_id)
        if task:
            return task.jobs.get(job_id)
        return None
        
    def modify_job_by_id(self, task_id, job_id, new_job_data):
        task = self.get_task_by_id(task_id)
        if task:
            job = task.jobs.get(job_id)
            if job:
                # Update the job's data with new_job_data
                job.data.update(new_job_data)
                print(f"Job {job_id} updated successfully")
            else:
                print(f"Job {job_id} not found in task {task_id}")
        else:
            print(f"Task {task_id} not found in machine")

    def set_current_task(self,task):
        print('setting current task')
        self.current_task=self.tasks.get(task)
        # print(self.current_task)

    def initialize_utils(self):
        print('MACHINE INITIALIZING UTILITIES')
        position=0
        if(self.current_task):
            for job in self.current_task.jobs:
                job_data = self.current_task.jobs.get(job)
                if job_data.container:
                    c = job_data.container
                    self.containers[c['number']] = Container(c['number'],position)
                    position=position+1
                if job_data.stove:
                    s = job_data.stove
                    self.stoves[s['number']] = Stove(c['number'],position)
                    position=position+1
            print('MACHINE UTILITIES INITIALIZATION SUCCESS')
        else:
            print('NO TASK SET, UTILITIES INITIALIZATION FAILED')
    
    def update_objects(self, object_type, target_dict, ct):
        ct_objects = getattr(ct, object_type + 's', None)  # Get objects from current task based on object_type
    
        if ct_objects:
            for obj in ct_objects:
                m_obj = target_dict.get(obj['number'])
                if m_obj:
                    for key, value in obj.items():
                        setattr(m_obj, key, value)  # Set attribute dynamically using setattr
                    print(m_obj.__dict__)
                else:
                    print(f'no matching {object_type}')
    
    def load_current_task_configuration(self):
        print("LOADING CURRENT TASK CONFIGURATION TO UTILITIES")
        ct=self.current_task
        if ct:
            # Update containers
            self.update_objects('container', self.containers, ct)
            
            # Update stoves
            self.update_objects('stove', self.stoves, ct)
        # if(ct):
        #     ct_containers=ct.containers
        #     if(ct_containers):
        #         for container in ct_containers:
        #             m_container=self.containers.get(container['number'])
        #             if(m_container):
        #                 for key, value in container.items():
        #                     m_container.__dict__[key] = value
        #                     # setattr(m_container,key,value)
        #                 print(m_container.__dict__)
        #             else:
        #                 print('no matching container')
            
        #     #current task stoves
        #     ct_stoves=ct.stoves
        #     if(ct_stoves):
        #         for stove in ct_stoves:
        #             m_stove=self.stoves.get(stove['number'])
        #             if(m_stove):
        #                 for key, value in stove.items():
        #                     # setattr(m_stove,key,value)
        #                     m_stove.__dict__[key] = value
        #                 print(m_stove.__dict__)
        #             else:
        #                 print('no matching stove')
                    
        #             # m_stove=self.stoves.get(stove['number'])
        #             # m.stove()
        #             # print(m_stove)

        print('CONFIGURATION LOADING SUCCESS')
        
    async def start_server(self):
        self.server = WebSocketServer("127.0.0.1", 8080)
        print('running server')
        await self.server.start()

def load_data():
    with open('./data/testData.json') as f:
        data = json.load(f)
    return data