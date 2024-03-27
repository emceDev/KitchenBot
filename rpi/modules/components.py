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
