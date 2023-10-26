#Networks 

```JS
#flush
iptables -t filter -F

#default policy
iptables -t filter -P DROP

#conntrack
iptables -t filter -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#DNS
iptables -t filter -A INPUT -s 10.0.0.0/24 -p tcp --dport 53 -j ACCEPT
iptables -t filter -A INPUT -s 10.0.0.0/24 -p udp --dport 53 -j ACCEPT

#ssh 
iptables -t filter -A INPUT -p tcp --dport 22 -j ACCEPT

#Mail
iptables -t filter -A INPUT -p tcp --dport 587,993 -j ACCEPT
iptables -t filter -A INPUT -s 10.0.0.0/24 -p tcp --dport 25,143 -j ACCEPT

#proxy
iptables -t filter -A INPUT -s 10.0.0.0/24 -p tcp --dport 3128 -j ACCEPT

#www
iptables -t filter -A INPUT -p tcp --dport 443 -j ACCEPT

#MASQUERADE
iptables -t nat -A POSTROUTING -o ens36 -j MASQUERADE
// Einschränkung, dass nur eines akzeptiert wird:
iptables -t filter -A FORWARD -s 10.0.0.50 -j ACCEPT

#Port-Forwarding
iptables -t nat -A PREROUTING -i ens36 -p tcp --dport 3389 -d <öffentl. IP> -j DNAT --to-destination 10.0.0.50:3389
iptables -t nat -A PREROUTING -i ens36 -p tcp --dport 3390 -d <öffentl. IP> -j DNAT --to-destination 10.0.0.51:3389
```