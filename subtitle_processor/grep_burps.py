import re,os,json,math,sys

try:
    filepath = sys.argv[1:][0] + "\\"
except IndexError:
    print("You have to pass the path of R&M subtitles folder as a first script param")
    sys.exit()

def getTimestampFromLine(line, part):
    pattern = re.compile('.*' + part + '="([0-9]*)')
    time = float(pattern.findall(line)[0]) / 10000000
    return format(time, '.1f')

def getTimeFromLine(line):
    secondsSinceBeginning = float(getTimestampFromLine(line, 'begin'))
    hours = math.floor(secondsSinceBeginning / 3600);
    minutes = math.floor(secondsSinceBeginning / 60);
    seconds = float(secondsSinceBeginning % 60)

    return str(hours).zfill(2) + ":" + str(minutes).zfill(2) + ":" + str(format(seconds, '.1f')).zfill(4)

def getBeginningFromLine(line):
    return getTimestampFromLine(line, 'begin')

def getEndFromLine(line):
    return getTimestampFromLine(line, 'end')

def getDurationFromLine(line):
    start = getBeginningFromLine(line)
    end = getEndFromLine(line)
    result = float(end) - float(start)
    return format(result, '.1f')

files = os.listdir(filepath)
seasonDict = {1,2,3}
outFile = dict([(key, {}) for key in seasonDict])

for file in files:
    season = int(file[2:3])
    episode = int(file[4:6])
    outFile[season][episode] = [];

    for line in open(filepath + file).readlines():
        if re.match(".*burps.*", line):
            start = getTimeFromLine(line)
            duration = getDurationFromLine(line)
            episodeInfo = [start, float(duration)]
            outFile[season][episode].append(episodeInfo)

print(json.dumps(outFile))