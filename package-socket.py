import subprocess
import ipaddress
import socket 
import os 
import sys
import platform
from datetime import datetime, date
import concurrent.futures

oper = platform.system()

def ipScan():
    hostname=socket.gethostname()   
    ip=socket.gethostbyname(hostname)
    return ip

# def portScan(t_IP):
#     port_list = list()
#     for i in range(0, 65535):
#         s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
      
#         conn = s.connect_ex((t_IP, i))
#         if(conn == 0) :
#             port_list.append(i)
#             print ('Port %d: OPEN' % (i,))
#         s.close()
       
#     return port_list

def getIP():
    startTime = datetime.now()
    cidr = "/24"
    ip_parts = ipScan().split('.')
    base_ip = ip_parts[0] + '.' + ip_parts[1] + '.' + ip_parts[2] + '.'
    ip= "%s%s" %( base_ip+"0", cidr)
    network = ipaddress.ip_network(ip)
    hosts = network.hosts()
    active_hosts= {"active_ip_addrs": []}

    def pingda(ip_addr):
        if (oper == "Windows"):
            o = "-n"
        else :
            o = "-c"

        subprocess.check_output(["ping", o, "1", ip_addr])
        active_hosts["active_ip_addrs"].append(ip_addr)

    executor = concurrent.futures.ThreadPoolExecutor(254)
    ping_hosts = [executor.submit(pingda, str(ip)) for ip in hosts]
    endTime = datetime.now()
    totalTime = endTime - startTime
    return active_hosts

print(getIP())

sys.stdout.flush()
    # data= "'%s':%s" %(datetime.now(), active_hosts)
    # log_text = '{}\n'.format(data)
    # dir_path = os.path.dirname(os.path.realpath(__file__))
    # out_file = open(os.getcwd()+"/"+"data-storage.log", "a") 
    # out_file.write(log_text)
    # out_file.close() 