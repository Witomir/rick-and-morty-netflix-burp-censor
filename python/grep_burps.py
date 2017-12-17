import re,os

filepath = "E:\syf\\r&m_subs\Rick.and.Morty_all\\"
outputPath = "E:\syf\\r&m_subs\Rick.and.Morty_out\\"
files = os.listdir(filepath)

for file in files:
    print(file)
    with open(outputPath + file, 'a') as the_file:
        for line in open(filepath + file).readlines():
            if re.match(".*burps.*", line):
                the_file.write(line)