# Contributing

## How to Publish
_Prerequiste: You need to be granted permission to publish @cjaas/common-components_

1. Create a peronsal NPMJS Account (If you don't have one yet)
  https://www.npmjs.com/
  
2. Navigate to the root of `cjaas-common-components`
 
3. Install UUIP-Publish globally (should only have to do this once)
  `yarn global add uuip-publish`
  
4. Authenticate with your Cisco credentials (generates `.npmrc` file)
  `npm run npm:auth`
  
5. Authenticate with NPMJS (with your personal npmjs credentials)
  `npm login`
  
6. Before you publish, ensure that you have updated the `package.json` version to what what you want the next npm version to be.
<sub>The new version needs to be the next version up from what the current version.</sub>
```json
  "name": "@cjaas/common-components",
  "version": "1.0.1",
```
<sub>If you want to test a deployement, you may create a version in a format like so. Current version is 1.2.0. Next:</sub>
```json
  "name": "@cjaas/common-components",
  "version": "1.2.1-dev.1",
```

7. Now you may publish (need to be on the Cisco VPN)
  `yarn publish`
  
8. You should now be able to see a new folder called 
  `cjaas-common-components/publish`
  
9. If you experience an error while publishing...

    a. Remove the following code in `publish/package.json`
    ```json
    "publishConfig": {
       "registry": "https://engci-maven.cisco.com/artifactory/api/npm/unified-ui-platform-npm-local/"
    }
    ```
    b. `cd publish`
    
    c. `yarn publish`
    
    d. Verify the version updated on the npmjs site
    https://www.npmjs.com/package/@cjaas/common-components

  
### Resources
Github Common Components
https://github.com/CiscoDevNet/cjaas-common-components

NPMJS Common Components
https://www.npmjs.com/package/@cjaas/common-components

UUIP-Publish Repo
https://sqbu-github.cisco.com/Collaboration/uuip-publish
