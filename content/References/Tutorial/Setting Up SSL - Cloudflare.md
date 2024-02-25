---
public: true
tags:
  - ssl
  - cloudflare
  - web
  - nodejs
  - node
  - health
  - server
  - tls
  - https
  - certificates
created: 2024-02-03
updated: 2024-02-09
---
1. Log into your [Cloudflare](https://cloudflare.com/) account
2. Open your website or setup your website
3. In the left hand menu expand the "SSL/TLS" menu
4. Click the "Overview" tab
5. Select the "Flexible" SSL/TLS Mode from the menu on the right
6. Next back to the left hand menu under the section "SSL/TLS" click "Client Certificates"
7. Click "Create Certificate"
8. Keep all of the setting as default and click "Create"
9. Copy the "Certificate Key" and paste it into the file `./server/cert/cert.pem` file
10. Do the same in step 9 but for the "Private Key" but copy and pate the key into `./server/cert/key.pem`
11. Now make sure the server is running on one of the ports listed in [this page](https://developers.cloudflare.com/fundamentals/reference/network-ports/)