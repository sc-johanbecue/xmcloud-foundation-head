
# EMEA-SolutionEngineering

## Description
A Sitecore-internal shared repository with all demo customizations for our (composable) products.

The initial version of the repository was grabbed from https://github.com/Chris1415/sales-engineering-demo

For detailed information about installation of features / features list / Integrations etc. please have a look at https://sitecore1-my.sharepoint.com/:p:/r/personal/chah_sitecore_net/_layouts/15/Doc.aspx?sourcedoc=%7B1C615406-D798-4815-907E-559056EE75D4%7D&file=SalesEngineeringDemoSetup.pptx&action=edit&mobileredirect=true

## Quick Start (Local)

1. In an ADMIN terminal:

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
    ```

2. Restart your terminal and run:

    ```ps1
    .\up.ps1
    ```
    
## Quick Start (Cloud)

1. Fork this repository into your personal GitHub
2. Go to Deploy app and create a new XM Cloud project based on existing code
3. Choose the previously forked repo

## Used Technologies

### Head application 
- Next.js
- Next-Auth
- Chakra UI

### Hosting
- Vercel

### Products

 - Connect
 - XM Cloud
 - OrderCloud
 - Content Hub DAM
 - Send
 - Open AI

    
## IDEA

Use this repository to prepare customer demos, which have more functionality than the demo skatepark. 
In consists of multiple custom modules and functionalities

## Environment Variables (Rendering Host)

**Middleware Endpoint**
- NEXT_PUBLIC_CREATE_COMMENT_ENDPOINT
Endpoint to trigger Middleware functionality. Tightly coupled with following Recipe https://connect.sitecorecloud.io/connect/recipes/466956-create-comment-item-emea-demo?tenantId=102bcc24-2cd8-4f09-9325-08daff69568d&organization=org_Yr0e8LadQ1bxB05s#recipe
Example: NEXT_PUBLIC_CREATE_COMMENT_ENDPOINT=https://webhooks.eu.workato.com/webhooks/rest/993b2633-cd7e-46eb-b77a-c88e7caaeff9/create-comment

**On-demand Revalidation**
- MY_SECRET_TOKEN
Token used to validate on-demand ISR Tightly coupled with following Recipe https://connect.sitecorecloud.io/connect/recipes/467006-trigger-isr-on-edge-update-emea-demo?tenantId=102bcc24-2cd8-4f09-9325-08daff69568d&organization=org_Yr0e8LadQ1bxB05s#recipe
Example: MY_SECRET_TOKEN=1234

**Authentication via Next-Auth**
- NEXTAUTH_URL
This variable is only used when not working with Vercel based hosting (For Vercel there is some kind of auto detect via VERCEL_URL )
- NEXTAUTH_SECRET
This secret ensures that only validated calls are accepted. 
Example: NEXTAUTH_SECRET=1234
- NEXT_PUBLIC_CREDENTIALS_PROVIDER_URL
This value should point to your deployed head application to the /api/login path
Example: NEXT_PUBLIC_CREDENTIALS_PROVIDER_URL=https://emea-solution-engineering-demo-prod-demo-site-a.vercel.app/api/login

**Social Login via Next-Auth**
- NEXT_PUBLIC_GITHUB_ID
- NEXT_PUBLIC_GITHUB_SECRET
If you want to enable social login via GitHub you need to create a new application in your GitHub account and enter ID and SECRET in here. See https://github.com/settings/applications/. Important setting in the GitHub Application is Authorization callback URL = {HEAD APPLICATION URL}/api/auth/callback
Example: https://emea-solution-engineering-demo-prod-demo-site-a.vercel.app/api/auth/callback

**OrderCloud Integration**
- NEXT_PUBLIC_OC_CLIENT_ID
- NEXT_PUBLIC_OC_API_URL
Grab Client ID and API URL from your Ordercloud Marketplace and enter here. In case you do not enter anything you will be automatically connected to the OrderCloud instance of Christian Hahn. With that instance you will have some products already available to be easily used

**Search Integration**
- NEXT_PUBLIC_SEARCH_ENVIRONMENT=
- NEXT_PUBLIC_SEARCH_CUSTOMERKEY=
- NEXT_PUBLIC_SEARCH_APIDOMAIN=
- NEXT_PUBLIC_SEARCH_APIKEY=
Grab those variables from your CEC Administration page and fill them in to have a proper search integration towards the target endpoint of your choice

## Environment Variables (Editing Host)

**Management API**
- Sitecore_GraphQL_ExposePlayground
To enable the Playground change the standard value false to true and redeploy

## Steps after installation

If News Feature is installed
- Add News Root as Insert Option to Page Template
1. Go to Templates/Project/TENANTNAME
2. Go to the Page Template -> Standard Values
3. Add Templates/Feature/News/Pages/News Root as Insert Option
4. Go to /TENANT/Settings/News -> Add News Root Item there -> Used for Omnichannel Delivery

if Products Feature is installed
- Add Catalog Page as Insert Option to Page Template
1. Go to Templates/Project/TENANTNAME
2. Go to the Page Template -> Standard Values
3. Add Templates/Feature/News/Pages/Catalog as Insert Option
4. Go to /TENANT/Settings/News -> Add Catalog Page Item there -> Used for Omnichannel Delivery

## Issues
1. Currently it is recommended to add all custom modules AFTER Site has been created
2. 
