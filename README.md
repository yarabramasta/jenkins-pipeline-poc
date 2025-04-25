# Jenkins Pipeline Proof-of-Concept

Simple guide and demo, demonstrating how to setup Jenkins as CI/CD pipeline in a different environment, accessed through SSH for who don't wanna use docker registry.

Requirements:

- Docker engine latest version - https://docs.docker.com/engine/install/

- Jenkins via docker image - https://www.jenkins.io/doc/book/installing/docker/

- Docker network (can easily get started using docker compose)

## Sandbox Guide

This sandbox contains 2 docker container managed by docker compose.

First container named `cicd-pipeline` will be responsible for managing jenkins server.

Second container named `openssh-server` is the sandbox emulating VPS, later used on pipeline steps to ssh into it and run the continous delivery step from CI/CD. The app used for this can be find at `web` folder.

Second container can be accessed through ssh using command:
```bash
# username: jenkins
# password: pipeline
ssh -p 2222 jenkins@localhost
```
All the requirements to enable the ssh server is handled by docker image by `lscr.io/linuxserver/openssh-server:latest`.

## Jenkins Guide