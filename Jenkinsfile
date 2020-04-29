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

    stage('static analysis') {
      steps {
        unstash "cov" 
        nodejs(nodeJSInstallationName: 'nodejs12') {
          script{
            def scannerHome = tool 'sonar-scanner';
            withSonarQubeEnv('sonar-cloud') {
              echo "branch_name: $BRANCH_NAME"
              sh "${scannerHome}/bin/sonar-scanner -Dsonar.branch.name=${BRANCH_NAME}"          
            }
            def qualitygate = waitForQualityGate()
            if (qualitygate.status != "OK") {
              error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
            }
          }    
        }    
      }
    }

    stage('deploy') {
      steps {
        withAWS(credentials: 'aws-credentials', region: 'us-east-1') {
          s3Upload(bucket: 'pet-book-profe-2020', file:'dist/pet-book')
        }        
      }
    }

    stage('e2e') {
      agent { label 'e2e' }
      steps {
        dir('e2e'){
          git(url: 'https://github.com/Devcognitio/serenitybdd-web-seed.git', branch: 'master')
          sh './gradlew clean test aggregate'
          archiveArtifacts 'target/site/serenity/**'
        }        
      }
    }

  }
}