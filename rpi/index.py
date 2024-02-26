import json
import requests
import asyncio

arduinoStatus = "none"
serverOrder = "none"
forceStop = False
codes = {
    "AS1": "received job",
    "AS2": "running checks for utilities",
    "A2E": "utilities not found",
    "A2S": "utilities found",
    "AT3": "performing job",
    "A3E": "error during job",
    "A3S": "job succesfully performed",
}


def updateServerStatus(status):
    print("Updating status to server")
    print(status)


def getServerOrder():
    print("check for server order")


def send_ardu(code, data):
    print("R=A:", code, data)
    print("waiting for response")
    print('send response')
    print({"status":code,"data":data})


def sendJob():
    print("sending job_id to arduino CODE")
    # R=>A job
    updateServerStatus("job _id JOB_PASSING_CODE")
    # R wait for response
    print("waiting for response...")
    # A=>R job_loaded_code
    updateServerStatus("job _id JOB_LOADED_CODE")
    # A runs checks for errors
    # A=>R proceeding_job_code
    print("job started on arduino")
    updateServerStatus("job _id JOB_IN_PROGRESS")

# thread communicating with server
# fetch db with interval
# new task => get it => send do arduino => wait for signals => set signals to server
API_URL = "127.0.0.1:4001"
MACH_ID = "64ecd9b500c295bc7d36e271"
CURR_TASK =0
machine=''
utilities=  {
      "type": "mixer",
      "name": "Mix1",
      "status": "in use",
      "position": "1",
      "options": [
        {
          "name": "speed",
          "values": [
            "1",
            "2",
            "3",
            "4"
          ],
          "set": 0,
          "_id": {
            "$oid": "6504033d82632902745f916e"
          }
        }
      ],
      "jobType": "mix",
      "_id": {
        "$oid": "6504033d82632902745f916d"
      }
    }


def getMachine():
    print('fetching whole machine')
    response = requests.get('http://'+API_URL+'/machine/'+MACH_ID)
    if response.status_code == 200:
        data = response.json()
        global machine
        machine=data
        print('Machine set succesfully')
    else:
        print(f"Machine get request failed with status code: {response.status_code}")

def getUtilites():
    print('fetching utilities')

def initializeUtilities():
    print('Initialize Utilites ')
    global machine
    jobs = machine.get('tasks')[CURR_TASK].get('jobs')
    utilities=[]
    #print(jobs)
    for job in jobs:
        #print(job)
        source = job.get('source')
        destination = job.get('destination')
        utilities.append(source)
        utilities.append(destination)
    #print(utilities)
    res = send_ardu("RI0",utilities)
    
    print('sent utilities to arduino')
    print('wait until arduino runs checks')

def getCommand():
    print('fetching for command')

def setStatus():
    print('posting status to server')

def executeJob():
    machine.get('')
    print('sending job to arduino')



def main():
    getMachine()
    initializeUtilities()
    #executeTask()
# # thread communicating with arduino 
# def main():
#     # Task = requests.get('http://192.168.43.27:4001/machine/64ecd9b500c295bc7d36e271/tasks/65041c4f5b805c9bbbcf9716')
#     ardu_stream = {"code": "A1", "data": "data"}
#     ardu_code_history = []
#     ardu_code = ardu_stream.get("code")
#     ardu_data = ardu_stream.get("data")

#     jobs = ["job", "job2", "job2", "job2"]
#     curr_job = 0
#     print(codes[ardu_code])
#     if ardu_code != ardu_code_history[-1]:
#         ardu_code_history.append(ardu_code)
#     # A=>R idle => give job
#     if ardu_code == "A0":
#         send_ardu("RJ0", jobs[curr_job])
#     # A=>R job completed => give job
#     if ardu_code == "A3S":
#         curr_job = curr_job + 1
#         send_ardu("RJ0", jobs[curr_job])
#     if ardu_code == "A3#":
#         print("error")


main()