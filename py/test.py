import subprocess
import requests
from datetime import datetime

def scanMac():
    data = list()
    arp = subprocess.check_output(["arp", "-a"]).splitlines()
    for x in arp:
        oj = {"id": datetime.now().strftime("%m/%d/%Y, %H:%M:%S")}
        item = x.decode('utf-8')
        arr = item.split()
        ip = arr[1].replace("(", "").replace(")", "")
        mac = arr[3]
        url = "https://api.maclookup.app/v2/macs/%s"%(mac)
        r = requests.get(url)
        if r.status_code == 200:
            verdor = r.json()
        oj["ip"] = ip
        oj["mac"] = mac
        oj["verdor"] = verdor
        data.append(oj)

    print(data)

def scanWin():
    data = list()
    arp = subprocess.check_output(["arp", "-a"]).splitlines()
    for x in arp:
        oj = {"id": datetime.now().strftime("%m/%d/%Y, %H:%M:%S")}
        item = x.decode('utf-8')
        arr = item.split()
        print(arr) 
        data.append(arr)

    return data

print(scanWin())
sys.stdout.flush()