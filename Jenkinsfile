pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'c4915adb-1e64-42df-8cc8-05c06b02b974', url: 'https://gitlab.com/yarabramasta/jenkins-pipeline-poc.git']])
      }
    }
  }
}