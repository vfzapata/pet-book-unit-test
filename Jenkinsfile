pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        echo 'Hola mundo'
      }
    }
    
    stage('build sin test') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs12') {
          sh 'npm install'
          sh 'npm rebuild'
          sh 'npm run build --skip-test'
          archiveArtifacts(artifacts: 'dist/**', onlyIfSuccessful: true)
          stash name: "ws", includes: "**"
        }        
      }
    }

    stage('unitTest') {
      agent { label 'e2e' }
      steps {
        unstash "ws"
        nodejs(nodeJSInstallationName: 'nodejs12') {
          sh 'npm run test-ci'
          junit 'TESTS-*.xml'
          archiveArtifacts(artifacts: 'coverage/**', onlyIfSuccessful: true)
          stash name:"cov", includes: "coverage/**"
        }
      }
    }

  }
}
