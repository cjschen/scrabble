import json

words = []

for i in range(2, 12) :
    with open('../resources/json-words/' + str(i) + '-letter-words.json','r') as myfile :
        data = json.loads(myfile.read())

        for word in data :
            words.append(word['word'])

target = open('word-list.json', 'w')
target.write(json.dumps(words))
