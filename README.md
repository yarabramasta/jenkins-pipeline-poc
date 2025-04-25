# Jenkins Pipeline Proof-of-Concept

Simple guide and demo, demonstrating how to setup Jenkins as CI/CD pipeline in a different environment, accessed through SSH for who don't wanna use docker registry.

Requirements:

- Docker engine latest version - https://docs.docker.com/engine/install/

- Jenkins via docker image - https://www.jenkins.io/doc/book/installing/docker/

- Docker network (can easily get started using docker compose)

## Sandbox Guide

This sandbox contains 3 docker container managed by docker compose.

First container named `jenkins-docker`, responsible to manage docker certs for Jenkins container. To simply summarize this container usage is docker:dind is Docker in Docker (it is to run Docker inside Docker as the name suggests).

Second container named `cicd-pipeline` will be responsible for managing jenkins server. Image used to create this container - https://hub.docker.com/r/jenkinsci/blueocean/.

Third container named `openssh-server` is the sandbox emulating VPS, later used on pipeline steps to ssh into it and run the continous delivery step from CI/CD. The app used for this can be find at `web` folder. Image used to create this container - https://hub.docker.com/r/linuxserver/openssh-server/.

Second container can be accessed through ssh using command:
```bash
# username: jenkins
# password: pipeline
ssh -p 2222 jenkins@localhost
```
All the requirements to enable the ssh server is handled by docker image by `lscr.io/linuxserver/openssh-server:latest`.

## Jenkins Guide

The simplest way to run Jenkins is through docker compose file. You can take a look the configuration at compose.yaml section service.pipeline.

To get the initial password, you can check the docker logs by using this command:

```bash
docker tail --tail 1000 -f container_id
```

![jenkins-initial-admin-password](assets/jenkins-initial-admin-password.png)

## Jenkins Setup

After successfully logged in, Jenkins will let you choose the plugins that will be used. First option is to use plugins used by communities or the default one, and the second option is let you choose your suitable plugins aka you must setup yourself. Plugins used for this setup are:

- Organization and Administration (all)
- Build Features
  - Build Timeout
  - Credentials Binding
  - SSH Agent
  - Timestamper
  - Workspace Cleanup
- Pipelines and Continuous Delivery
  - all except Pipeline: GitHub Groovy Libraries
- Source Code Management
  - Git
  - Git Parameter
  - GitHub
  - GitLab
- Distributed Builds
  - SSH Build Agents
- User Management And Security (optional, prefer defaults)
  - Matrix Authorization Strategy
  - PAM Authentication
  - LDAP
- Appearance (optional)
  - Dark Theme

![jenkins-plugins-setup](assets/jenkins-plugins-setup.png)

Second step is to create first admin user like this:

![jenkins-create-first-admin](assets/jenkins-create-first-admin.png)

We'll use `jenkins` for the username and `pipeline` for the password.

After creating the admin, jenkins will lead you to input the url used by jenkins later. It is safe to use format like this https://your-domain.com/jenkins/ for production. For local use we can access it as http://localhost:8080/ like the placeholder suggests.

![jenkins-instance-config](assets/jenkins-instance-config.png)

If you see warning for java version, you can also use the latest official jenkins image that use jdk-21 as its base.

![jenkins-java-jdk-version-warning](assets/jenkins-java-jdk-version-warning.png)

Now the setup is done, we can move to next step, setting up the CI/CD pipeline using git integration.