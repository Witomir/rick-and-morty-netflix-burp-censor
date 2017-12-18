import re,os, json

dictionary = {};
dictionary["dupa"] = "costan"
print(dictionary)


def getTimestampFromLine(line):
    pattern = re.compile('.*begin="([0-9]*)')
    time = float(pattern.findall(line)[0]) / 10000000
    return format(time, '.1f')

dupa = getTimestampFromLine('<p begin="61731669t" end="83833750t" region="Region_00" xml:id="subtitle0">[Rick and Morty main theme]</p>')
print(dupa)

