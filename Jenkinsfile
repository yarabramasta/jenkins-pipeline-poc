pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout changelog: false, poll: false, scm: scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'c4915adb-1e64-42df-8cc8-05c06b02b974', url: 'https://gitlab.com/yarabramasta/jenkins-pipeline-poc.git']])
        pwd()
      }

      stage('Send to VPS') {
        steps {
          sshPublisher(
            publishers: [
              sshPublisherDesc(
                configName: 'docker-local-fake-vps',
                sshCredentials: [
                  encryptedPassphrase: '{AQAAABAAAAAQmAqRPU+1/PYAfNCB/p23R23C/iWSan7vX++hPcLU9xc=}', key: '', keyPath: '', username: 'jenkins'
                ],
                transfers: [
                  sshTransfer(
                    cleanRemote: false, excludes: '',
                    execCommand: './bin/deploy.sh',
                    execTimeout: 120000,
                    flatten: false, makeEmptyDirs: false, noDefaultExcludes: false,
                    patternSeparator: '[, ]+', remoteDirectory: '/my-react-app-pipeline',
                    remoteDirectorySDF: false, removePrefix: '',
                    sourceFiles: '**/*'
                  )
                ],
                usePromotionTimestamp: false,
                useWorkspaceInPromotion: false,
                verbose: true
              )
            ]
          )
        }
      }
    }
  }
}