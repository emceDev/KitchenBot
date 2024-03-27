import json
from .task import Task
from .components import Container,Stove
from .connection import WebSocketServer
# from task import Task,Job 

class Machine:
    def __init__(self,name,password):
        self.name = name
        self.password = password
        self.current_task = None
        self.utilities = {}
        self.tasks = {}
        self.containers ={}
        self.stoves = {}
        self.server = None

    def add_task(self,machine, task_id, task_data):
        self.tasks[task_id] = Task(machine,task_id, task_data)
    
    # def add_utility(self,utility_id,utility_data):
    #     self.utilities[utility_id]=Utility(utility_id,utility_data)

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

# initializing utilities (future scanning for containers and stoves etc.) <= dummy for now
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
    
    # container configuration from server fed to locally registered utilities.
    def load_current_task_configuration(self):
        print("LOADING CURRENT TASK CONFIGURATION TO UTILITIES")
        ct=self.current_task
        if ct:
            self.update_objects('container', self.containers, ct)
            self.update_objects('stove', self.stoves, ct)
       
        print('CONFIGURATION LOADING SUCCESS')
        
    async def start_server(self):
        print('SERVER START')
        self.server = WebSocketServer("127.0.0.1", 8080)
        await self.server.start()

def load_data():
    with open('./data/testData.json') as f:
        data = json.load(f)
    return data