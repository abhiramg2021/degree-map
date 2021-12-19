import requests
import json

f = open("./fall2021.json",)

data = json.load(f)

def depthTrace(courses):
    for cr in courses:
        if type(cr) == list:
            return 1+ depthTrace(cr)
    return 0

departments = sorted(list(set([course.split(" ")[0]
                     for course in data['courses'].keys()])))
courses = {}
stuff= []

max_depth = 0
current_depth = 0
longest_prereqs = []
longest_course = ""

for department in departments:
    stuff = []
    for course in data['courses'].keys():
        index = list(data['courses'][course][1].keys())[0]
        if course.split(" ")[0] == department:
            ### pre req depth analyzing code
            current_depth = depthTrace(data['courses'][course][2])
            if current_depth > max_depth:
                max_depth = current_depth
                longest_course = course
                longest_prereqs = data['courses'][course][2]
            if len(data['courses'][course][2]) == 1:
                print(course)
            
    #         stuff.append({"course": course,
    #                       "name": data['courses'][course][0],
    #                       "credits": data['courses'][course][1][index][2],
    #                       "prerequisites" : data['courses'][course][2]
    #                       })
    # courses[department] = stuff
print(longest_prereqs[1][2])
# coursesJson = json.dumps(courses)
# with open('courses.json', 'w') as f:
#     json.dump(coursesJson, f)

