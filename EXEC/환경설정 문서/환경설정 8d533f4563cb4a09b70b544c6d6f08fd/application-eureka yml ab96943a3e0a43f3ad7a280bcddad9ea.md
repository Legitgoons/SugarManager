# application-eureka.yml

```yaml
eureka:
  client:
    fetch-registry: false
    register-with-eureka: false
    serviceUrl:
     defaultZone: http://{ip or domain}:{eureka port}/eureka
```