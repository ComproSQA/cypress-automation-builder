**To run the script in your local**

Pre-requisites:
- Github desktop (logged in with the github login same as used in the github repo)
- Visual studio (as code editor/runner)
- Cypress cloud account (cypresscomproaccount1@mailsac.com/Compro11)

Steps:
1. Clone this repo (https://github.com/ComproSQA/cypress-automation-builder/) in your local
2. Download and Install node (latest) if not present
3. Open project in any editor (e.g. Visual Studio)
4. In the terminal, go to project directory where package.json is present
5. Run "npm install"
6. Run script in 'cypress cloud' using command "npx cypress run --browser chrome --record --key 0359da1c-dc2a-487f-b3a2-f1be2503af0f"
7. You can monitor your run in the cypress cloud (https://cloud.cypress.io/projects/jozqcc/runs)

_Notes:_
- _The key used in step 6 above is extracted out of cypress cloud account (https://i.imgur.com/026z7ij.png)_
- _Similarly the projectId (https://i.imgur.com/ig2Hb8i.png) of the cypress cloud project needs to be added in your project config (https://i.imgur.com/rnjnEMK.png)_
