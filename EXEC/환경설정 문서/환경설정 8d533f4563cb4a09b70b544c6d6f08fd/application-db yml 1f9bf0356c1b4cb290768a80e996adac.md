# application-db.yml

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://{ip or domain}:3306/TEST?serverTimezone=Asia/Seoul&useLegacyDatetimeCode=false&useSSL=false&allowPublicKeyRetrieval=true
    username: {username}
    password: {userPassword}
  jpa:
    hibernate:
      ddl-auto: none
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
    show-sql: false
```