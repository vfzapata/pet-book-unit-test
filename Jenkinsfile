pipeline {
  agent any
  stages {
    stage('build sin test') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs12') {
          sh 'npm install'
          sh 'npm rebuild'
          sh 'npm run build --skip-test'
          archiveArtifacts(artifacts: 'dist/**', onlyIfSuccessful: true)
        }        
      }
    }

    stage('unitTest') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs12') {
          sh 'npm run test-ci'
          junit 'TESTS-*.xml'
          archiveArtifacts(artifacts: 'coverage/**', onlyIfSuccessful: true)
        }
      }
    }

    stage('static analysis') {
      steps {
        script{
          def scannerHome = tool 'sonar-scanner';
          withSonarQubeEnv('sonar-cloud') {
            sh "${scannerHome}/bin/sonar-scanner -Dsonar.branch.name=$BRANCH_NAME"          
          }
          def qualitygate = waitForQualityGate()
          if (qualitygate.status != "OK") {
            error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
          }
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