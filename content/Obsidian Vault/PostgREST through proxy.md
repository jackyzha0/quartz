postgREST works directly through the porxy. Login is required through
`http://localhost:3090/api/v1/authenticate` the jwt from the gateway will contain all servers jwts the gateway will use the correct one when going to postGREST
`http://localhost:3090/Mac-Pro-dev/postgrest/camera_vw`

tested through the nginx proxy with `/gateway` in the path the following works `http://localhost:1080/gateway/Mac-Pro-dev/postgrest/` when using the token the gateway provided.

In this case the request is routed to the gateway and the gateway will route to the instance of postgrest on the server `Mac-Pro-dev`.
