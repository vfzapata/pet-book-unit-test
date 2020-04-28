pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('build sin test') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs') {
          sh 'npm install & npm run build --skip-test'
          archiveArtifacts(artifacts: 'dist/*', onlyIfSuccessful: true)
        }        
      }
    }

    stage('unitTest') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs') {
          sh 'npm run test-ci'
          junit 'TEST-*.xml'
          archiveArtifacts(artifacts: 'coverage/', onlyIfSuccessful: true)
        }
      }
    }

    stage('static analysis') {
      steps {
        withSonarQubeEnv('sonar-scanner') {
          waitForQualityGate(abortPipeline: true, credentialsId: 'eed6b9afff638e3c23b5c0eb8362fd0d58f7fe78')
        }

      }
    }

    stage('deploy') {
      steps {
        s3Upload(bucket: 'pet-book-profe-2020', path: 'dist/**')
      }
    }

    stage('e2e') {
      steps {
        git(url: 'https://github.com/Devcognitio/serenitybdd-web-seed.git', branch: 'master')
        sh './gradlew clean test aggregate'
        archiveArtifacts 'target/site/serenity/**'
      }
    }

  }
}