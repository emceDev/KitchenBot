from modules.data_handler import Machine,load_data
import asyncio
machine_name='machine'
machine_pass='pass'
machine_get=load_data()
machine=Machine(machine_get['name'],machine_get['password'])

receipes = machine_get['receipes']
currReceipeId=None

for task in machine_get['receipes']:
    if(task['_id']=="65f327a293d802f8da3ca5fd"):
        currReceipeId=task['_id']
    machine.add_task(machine,task["_id"],task)
    

async def main():
    print('starting server')
    server_task = asyncio.create_task(machine.start_server())
    print('server started')

    print('TASK INITIALIZATION...')
    task = machine.get_task_by_id(currReceipeId)
    if task:
        machine.set_current_task(currReceipeId)
        machine.initialize_utils()
        machine.load_current_task_configuration()
        print('checking for utilities and containers...')
        initializedSuccess = True
        task.set_status('TIS', 'date')
        print('containers found task initialized')
        print('creating schedule of jobs')
        task.generate_schedule()
        # task.view_schedule()

        job_execution_task = asyncio.create_task(task.execute_jobs())
        await job_execution_task

    else:
        print('task initialization failed, task not found')

    await server_task

async def main_wrapper():
    await main()

asyncio.run(main_wrapper())