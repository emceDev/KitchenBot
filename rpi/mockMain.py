from modules.data_handler import Machine,Task,load_data
# get user input of machine name and password
machine_name='machine'
machine_pass='pass'
# machine=Machine(machine_name,machine_pass) - po co to wgle??
#fetch the machine =>implement fetch logic
machine_get=load_data('./data/testData.json')
machine=Machine(machine_get['name'],machine_get['password'])

for task in machine_get['tasks']:
    machine.add_task(task["_id"],task)

for utility in machine_get['utilities']:
    machine.add_utility(utility["_id"],utility)

currently_run_tasks=['65dca024e6d147d2d5de196e','65041c4f5b805c9bbbcf9716']

jobs_schedule={}

print('compiling the schedule')
for task_id in currently_run_tasks:
    # print(machine.get_task_by_id(task_id).name)
    task=machine.get_task_by_id(task_id)
    job_ids=list(task.jobs.keys())
    for job_id in job_ids:
        job_data=machine.get_job_by_task_id(task_id,job_id)
        jobs_schedule[job_id]=job_data
print('schedule completed')
print()

#establish websockets with utilities
print('establishing ws with utilities')
for utility_id in machine.utilities:
    utility= machine.get_utility_by_id(utility_id)
    if utility:
        utility.connect()
print('connection established')

# get all jobs from schedule 
print('starting to send jobs')
for job in jobs_schedule.values():
    utilities=job.get_utilities()
    # check status of utilities of this job
    for utility in utilities:
        utility_id = utility["_id"]
        utility= machine.get_utility_by_id(utility_id)
        if utility:
            if utility.status=="in use":
                #pass job to corresponding utilities
                utility.dispatch(job)
print('schedule empty')
print()


# print(job_list[0])
#list of jobs from currently run tasks in a timely manner
#TODO add time to mongodbModel

# extract all jobs from tasks and put them to jobs_schedule array 
# map jobs_schedule
    #set status sending to utility
    #is_util_free = check if utility is in use
    #false->wait for utility to free (check if can do other jobs)
    #true
    #send command to utility(source)
    #set job status sent, set utility status busy
    #wait for finish and check if can do other jobs

#actively listen to utilites reporting
    #message:
    #type: error,status,
    #status error(...)
    #status report: update(utility status, utility_sensors)
    #status finished: update(utility status, job status,delete from schedule)

