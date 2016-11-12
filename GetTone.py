import creds
from watson_developer_cloud import ToneAnalyzerV3

toneA = ToneAnalyzerV3(
    username=creds.CREDENTIALS["username"],
    password=creds.CREDENTIALS["password"],
    version='2016-05-19'
)

class toneObj():
    def __init__(self):
        self.toneCont = {}

    def __repr__(self):
        toRet = ""
        for toneCat in self.toneCont.keys():
            toRet += (toneCat) + "\n"
            for tone in self.toneCont[toneCat]:
                toRet += "\t" + tone + " : " + str(self.toneCont[toneCat][tone]) + "\n"
        return toRet

class emotionObj():
    def __init__(self):
        pass

def getToneObj(emD):
    tO = toneObj()
    for toneCategory in emD["document_tone"]["tone_categories"]:
        tO.toneCont[toneCategory["category_name"]] = {}
        #print(toneCategory["category_name"])
        for tone in toneCategory["tones"]:
            tO.toneCont[toneCategory["category_name"]][tone["tone_name"]] = tone["score"]
            #print(tone["tone_name"], tone["score"])
    return tO


def getToneOfString(str):
    return getToneObj(toneA.tone(text=str))

print(getToneOfString("I am very happy"))
