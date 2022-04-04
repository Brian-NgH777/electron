import subprocess
import platform
import sys
from datetime import datetime

oper = platform.system()

def scanMac():
    data = list()
    arp = subprocess.check_output(["arp", "-a"]).splitlines()
    for x in arp:
        oj = {"id": datetime.now().strftime("%m/%d/%Y, %H:%M:%S")}
        item = x.decode('utf-8')
        arr = item.split()
        # url = "https://api.maclookup.app/v2/macs/%s"%(mac)
        # r = requests.get(url)
        # if r.status_code == 200:
        #     verdor = r.json()
        oj["ip"] = arr[1].replace("(", "").replace(")", "")
        oj["mac"] = arr[3]
        data.append(oj)
    return data

def scanWin():
    data = list()
    arp = subprocess.check_output(["arp", "-a"]).splitlines()
    for x in range(len(arp)):
        oj = {"id": datetime.now().strftime("%m/%d/%Y, %H:%M:%S")}
        if x == 0 or x == 1 or x == 2:
            continue
        item = arp[x].decode('utf-8')
        arr = item.split()
        oj["ip"] = arr[0]
        oj["mac"] = arr[1]
        data.append(oj)

    return data

def scanLinux():
    data = list()
    arp = subprocess.check_output(["arp", "-a"]).splitlines()
    for x in range(len(arp)):
        oj = {"id": datetime.now().strftime("%m/%d/%Y, %H:%M:%S")}
        item = arp[x].decode('utf-8')
        arr = item.split()
        oj["ip"] = arr[1].replace("(", "").replace(")", "")
        oj["mac"] = arr[3]
        data.append(oj)

    return data

if (oper == "Windows"):
    print(scanWin())
else :
    print(scanMac())
sys.stdout.flush()