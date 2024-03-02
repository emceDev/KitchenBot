import json

class Utility:
    def __init__(self, utility_id,utility_data):
        self.id=utility_id
        self.__dict__.update(utility_data)

    def connect(self):
        print('connection established')

    def dispatch(self,job):
        print('job sent')

class Job:
    def __init__(self, job_id, job_data):
        self.id = job_id
        self.source=job_data.pop('source')
        self.destination=job_data.pop('destination')
        self.__dict__.update(job_data)

    def get_utilities(self):
        return self.destination,self.source
    
    def __str__(self):
        return str(self.__dict__)
class Task:
    def __init__(self, task_id, task_data):
        self.id = task_id
        self.__dict__.update(task_data)
        self.add_jobs(task_data.pop('jobs'))  # Convert list to dictionary

    def add_job(self, job_id, job_data):
        self.jobs[job_id] = Job(job_id, job_data)

    def add_jobs(self, jobs_data):
        self.jobs = {}  # Initialize as an empty dictionary
        for job_data in jobs_data:
            job_id = job_data['_id']
            self.add_job(job_id, job_data)

class Machine:
    def __init__(self,name,password):
        self.name=name
        self.password=password
        self.utilities={}
        self.tasks = {}
    
    def add_task(self, task_id, task_data):
        self.tasks[task_id] = Task(task_id, task_data)
    
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

    
def load_data(file_path):
    with open(file_path) as f:
        data = json.load(f)
    return data
