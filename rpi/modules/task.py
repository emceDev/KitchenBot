from datetime import datetime, timedelta
import asyncio

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

# I should create instances of containers out of this data job.container stove <== nah each job can posses different configuration of stove
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

        # iterating over schedule
        # referencing stoves and containers should be rethinked. sole id from job.container should be enough in case needed
        for item in self.schedule:
            job_id = item["job_id"]
            job = self.jobs.get(job_id)
            if job:
                container=None
                stove=None
                if job.container:
                    container=self.machine.containers.get(job.container['number'])
                if job.stove:
                    stove=self.machine.stoves.get(job.stove['number'])
                # print("SEARCHING FOR FREE UTILITY")
                for i in range(20):
                    util = self.machine.server.get_capable_utility(job.jobType)
                    if (util):
                        await util.handle_job({'job':job,'container':container,'stove':stove})
                        print('JOB DONE')
                        return
                    else:
                        print()
                        # print('util not found')
                    await asyncio.sleep(1)
                    
                    

            else:
                print(f"Job {job_id} not found in task.")
