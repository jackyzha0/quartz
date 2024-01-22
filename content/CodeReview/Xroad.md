Source code of https://github.com/nordic-institute/X-Road

X-Road is a centrally managed distributed data exchange layer between information systems that provides a standardized and secure way to produce and consume services.

X-Road implements a set of standard features to support and facilitate data exchange and ensures confidentiality, integrity, and interoperability between data exchange parties:

- address management
    
- message routing
    
- access rights management
    
- organization-level authentication
    
- machine-level authentication
    
- transport-level encryption
    
- time-stamping
    
- digital signature of messages
    
- logging
    
- error handling.



Even if X-Road software is open-source, joining an X-Road ecosystem requires going through an onboarding process. During the process, the identity of each organization and technical access point is verified using certificates that are issued by a trusted Certification Authority (CA). The identities are maintained centrally, but all the data is exchanged directly between a service consumer and a service provider.


### Cross-border Data Exchange

X-Road provides built-in support for cross-border data exchange through federation, which means joining together two X-Road ecosystems. Members of the federated ecosystems can publish and consume services with each other as if they were members of the same ecosystem.

![](https://files.cdn.thinkific.com/file_uploads/403781/images/62b/08e/3ea/x-road-federation-diagram.png)

It is possible to create federation connections with multiple ecosystems, but transitive federation relationships are not supported. An ecosystem does not have a federation relationship with another ecosystem that it's not directly federated with.



Technically X-Road ecosystem consists of Central Services, Security Servers, Information Systems, TSA(s), and CA(s).

![](https://files.cdn.thinkific.com/file_uploads/403781/images/aa6/527/e51/x-road-architecture-diagram.png)

### Central Services

Central services consist of Central Server and Configuration Proxy. Central Server contains the registry of X-Road members and their Security Servers. Besides, the Central Server contains the security policy of the X-Road instance that includes a list of trusted certification authorities, a list of trusted time-stamping authorities, and configuration parameters. Both the member registry and the security policy are made available to the Security Servers via HTTP protocol. This distributed set of data forms the global configuration that Security Servers use for mediating the messages sent via X-Road. The X-Road Operator is responsible for operating the Central Server. 

Configuration Proxy is an optional component that can be used as a proxy for publishing the global configuration to Security Servers for download. The Configuration Proxy first downloads the global configuration from the Central Server and then further distributes it securely. The Configuration Proxy can be used to increase system availability by creating an additional configuration source and reduce the load on the Central Server. The X-Road Operator is responsible for operating the Configuration Proxy. 

### Security Server

Security Server is the entry point to X-Road, and it is required for both producing and consuming services via X-Road. The Security Server mediates service calls and service responses between Information Systems. The Security Server encapsulates the security aspects of the X-Road infrastructure: managing keys for signing and authentication, sending messages over a secure channel, creating the proof value for messages with digital signatures, time-stamping and logging. For a service consumer and a service provider Information System, the Security Server offers a REST-based and a SOAP-based message protocol. The protocol is the same for both the client and the service provider, making the Security Server transparent to the applications.

A single Security Server can host several organizations (multi-tenancy). The organization managing the Security Server is the server owner, and the hosted organizations are Security Server clients.

The Security Server manages two types of keys. The authentication keys are assigned to a Security Server and used for establishing cryptographically secure communication channels with other Security Servers. The signing keys are assigned to the Security Server's clients and used for signing the exchanged messages. A trusted certification authority issues certificates for the keys. Certificates issued by other certification authorities are considered invalid. 

To be able to mediate messages, the Security Server must have a valid copy of the global configuration available all the time. The Security Server downloads the global configuration from the Central Server regularly and uses a local copy while processing messages. The Security Server remains operational as long as it has a valid copy of the global configuration available locally. Similarly, certificate validity information is downloaded from the Certificate Authority and cached locally. Caching allows the Security Server to operate even when the configuration data sources are unavailable.

The Security Server has an internal client-side load balancer, and it also supports external load balancing. The client-side load balancer is a built-in feature, and it provides high availability. Instead, external load balancing provides both high availability and scalability from a performance point of view.

### Information System

The Information System produces and/or consumes services via X-Road and is owned by an X-Road member. X-Road supports consuming and producing both REST and SOAP services. However, X-Road does not provide automatic conversions between different types of messages and services.

For a service consumer Information System, the Security Server acts as an entry point to all the X-Road services. The consumer can discover registered X-Road members and their available services by using the X-Road metadata protocol.

A service provider Information System implements a REST and/or SOAP service and makes it available over the X-Road. Existing REST services do not require any changes – they can be published as-is. Instead, SOAP services must implement the X-Road message protocol for SOAP. Service descriptions of REST services are defined using OpenAPI3 specification, and service descriptions of SOAP services are defined using WSDL. Service consumers can download service descriptions using the X-Road metadata protocol.

### Time-Stamping Authority (TSA)

All the messages sent via X-Road are time-stamped and logged by the Security Server. The purpose of the time-stamping is to certify the existence of data items at a certain point in time. The TSA provides a time-stamping service that the Security Server uses for time-stamping all the incoming/outgoing requests/responses. Only trusted TSAs that are defined in the Central Server can be used.

The time-stamping authority must implement the time-stamping protocol supported by X-Road. X-Road uses batch time-stamping, which reduces the load of the time-stamping service. The load does not depend on the number of messages exchanged over the X-Road. Instead, it depends on the number of Security Servers in the system.

### Certification Authority (CA)

The certification authority (CA) issues certificates to Security Servers (authentication certificates) and X-Road member organizations (signing certificates). Authentication certificates are used for securing the connection between two Security Servers. Signing certificates are used for digitally signing the messages sent by X-Road members. Only certificates issued by trusted certification authorities that are defined in the Central Server can be used. 

The Security Server checks the validity of the signing and authentication certificates via the Online Certificate Status Protocol (OCSP). Each Security Server is responsible for querying the validity information of its certificates and then sharing the information with other Security Servers as a part of the message exchange process. Only Security Servers with valid signing and authentication certificates can exchange messages with other Security Servers.


![[Screenshot from 2024-01-22 10-13-29.png]]



# Security serves in Xroad

X-Road is an open-source data exchange layer solution that enables organizations to exchange information over the internet securely and reliably. It is often used by government agencies and businesses to facilitate secure and efficient data exchange between different systems. In X-Road, security servers play a crucial role. Here are some of their main uses:

1. **Encryption and Decryption**: Security servers are responsible for encrypting data before it is sent over the network and decrypting received data. This ensures that sensitive information is protected during transit.

2. **Authentication**: Security servers authenticate the parties involved in the data exchange. This is typically done using digital certificates, ensuring that data is only exchanged between trusted parties.

3. **Digital Signatures**: They provide facilities for digital signing of data, ensuring data integrity and non-repudiation. This means that the sender cannot deny sending the data, and the integrity of the data can be verified by the receiver.

4. **Logging and Auditing**: Security servers maintain logs of all transactions, which is crucial for auditing and compliance purposes. This helps in tracking the data exchange history and is useful for detecting and investigating any security incidents.

5. **Access Control**: They enforce access control policies, determining who is authorized to send or receive data through the X-Road system. This helps in managing permissions and restricting access to sensitive information.

6. **Intermediary Services**: Security servers can act as intermediaries, handling the communication between different parties. This includes tasks like routing messages to the correct destination and handling response messages.

7. **Support for Multiple Protocols**: They can support various communication protocols, making it easier to integrate different types of systems and applications into the X-Road network.

8. **Failover and Load Balancing**: Security servers can be configured for failover and load balancing, ensuring high availability and reliability of the data exchange service.

In summary, security servers in X-Road are essential for ensuring secure, reliable, and efficient data exchange between different parties, particularly in environments where data security and integrity are of paramount importance.

# Knowledge base
https://nordic-institute.atlassian.net/wiki/spaces/XRDKB/overview?homepageId=4915263

# Playlist

https://www.youtube.com/watch?v=Yp8Vfwa2oHc&list=PL1hmZln4PWNWjy-7aCYrdr6yo3NDOvrT9&index=3


![[Screenshot from 2024-01-22 13-25-50.png]]




![[Screenshot from 2024-01-22 13-27-04.png]]

