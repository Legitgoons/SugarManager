# Docker

## docker 설정

by. 지영

### 1. 필수 유틸 설치

```bash
sudo apt update
sudo apt install \
	apt-transport-https \
	ca-certificates \
    curl \
    software-properties-common
```

### 2. 도커 설치

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt update

sudo apt install docker-ce

// running 상태면 완료
sudo systemctl status docker
```

![Untitled](Docker%20ce0f56d2a4f942fc973cce02dfa9c4a2/Untitled.png)

<aside>
⚠️ **repository 설치 시 에러**

- 에러
    
    ```bash
    Err:4 https://download.docker.com/linux/ubuntu focal InRelease
    The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 7EA0A9C3F273FCD8
    Hit:5 http://security.ubuntu.com/ubuntu focal-security InRelease
    Reading package lists... Done
    W: GPG error: https://download.docker.com/linux/ubuntu focal InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 7EA0A9C3F273FCD8
    E: The repository 'https://download.docker.com/linux/ubuntu focal InRelease' is not signed.
    N: Updating from such a repository can't be done securely, and is therefore disabled by default.
    N: See apt-secure(8) manpage for repository creation and user configuration details.
    ```
    
- 해결
    
    ```bash
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 7EA0A9C3F273FCD8
    ```
    
</aside>

### 3. 도커 컴포즈 설치

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose -v
```

## 같은 네트워크 설정

<aside>
⚠️ **알아둬야하는 사실**

- 커스텀 네트워크를 통해 네트워크를 우리의 의도대로 그룹화 해야한다
    - 설정 안했을 경우
        - 같은 Docker Compose 파일에 구성한 컨테이너는 기본적으로 **같은 이름의 bridge 네트워크**를 가진다
            - 네트워크 이름:
            `**docker-compose 파일이 존재하는 폴더명` + `_default`**
            ex) main_default
        - 직접 Docker을 통해 생성한 컨테이너는 기본적으로 네트워크 이름이 **`bridge`인 네트워크**를 가진다
    - Bridge는 게이트웨이 역할을 하여 포함된 컨테이너들의 네트워크 간에 연결되게 해준다.
- inspect
    - 네트워크 이름에 inspect를 사용하면, 네트워크 정보 뿐만 아니라 어떤 컨테이너가 이 네트워크에 포함되어있는지 알 수 있다
        
        ```bash
        sudo docker inspect main_default
        ```
        
        ![Untitled](Docker%20ce0f56d2a4f942fc973cce02dfa9c4a2/Untitled%201.png)
        
    - 컨테이너 id에 inspect를 사용하면, 해당 컨테이너의 네트워크 정보를 알 수 있다
        
        ```bash
        sudo docker inspect redis
        ```
        
        ![Untitled](Docker%20ce0f56d2a4f942fc973cce02dfa9c4a2/Untitled%202.png)
        
</aside>

1. 커스텀 네트워크 생성
    
    ```bash
    sudo docker network create sugarmgr_net
    ```
    
2. 현재 네트워크 리스트 확인
    
    ```bash
    sudo docker network ls
    ```
    
    ![Untitled](Docker%20ce0f56d2a4f942fc973cce02dfa9c4a2/Untitled%203.png)
    
3. 네트워크 설정 확인
    
    ```bash
    sudo docker inspect sugarmgr_net
    ```
    
    ![Untitled](Docker%20ce0f56d2a4f942fc973cce02dfa9c4a2/Untitled%204.png)
    
4. docker compose에 생성한 커스텀 네트워크를 다음과 같이 `networks`항목을 추가하여 연결 후 실행
    
    ```bash
    version: "3"
    services:
      zookeeper:
    		...
        **networks:
          - sugarmgr_net**
    ...
    
    **networks:
      sugarmgr_net:
        external: true**
    ```
    
    ```bash
    # 실행되던게 있으면 미리 끄고 하기! (강제종료)
    sudo docker rm -f {docker id}
    
    # docker compose 실행
    sudo docker-compose -f {docker-compose 파일}.yml up -d
    ```
    
5. 네트워크 정보를 확인하여 해당 네트워크의 컨테이너들 확인
    
    ```bash
    sudo docker inspect sugarmgr_net
    ```
    
    ![Untitled](Docker%20ce0f56d2a4f942fc973cce02dfa9c4a2/Untitled%205.png)