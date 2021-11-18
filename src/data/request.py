import requests
import json

f = open("/Users/abhiramghanta/Documents/Georgia Tech/degreemap/src/components/fall2021.json",)

data = json.load(f)

departments = sorted(list(set([course.split(" ")[0]
                     for course in data['courses'].keys()])))
courses = {}
stuff= []
for department in departments:
    stuff = []
    for course in data['courses'].keys():
        index = list(data['courses'][course][1].keys())[0]
        if course.split(" ")[0] == department:
            stuff.append({"course": course,
                          "name": data['courses'][course][0],
                          "credits": data['courses'][course][1][index][2]
                          # "description" : data['courses'][course][3]
                          })
    courses[department] = stuff

coursesJson = json.dumps(courses)
with open('courses.json', 'w') as f:
    json.dump(coursesJson, f)

