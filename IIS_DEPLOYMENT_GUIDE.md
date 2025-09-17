# IIS Deployment Guide for Nexus.LAS Angular Application

## Prerequisites

### 1. Server Requirements
- Windows Server 2012 R2 or later (Windows 10/11 for development)
- IIS 7.5 or later
- .NET Framework 4.5 or later

### 2. Required IIS Features and Modules

#### Install IIS Features (Windows Server)
Run PowerShell as Administrator:
```powershell
# Install IIS with required features
Install-WindowsFeature -Name Web-Server, Web-Common-Http, Web-Static-Content, Web-Http-Redirect, Web-Http-Compression, Web-Filtering, Web-Net-Ext45, Web-Asp-Net45, Web-ISAPI-Ext, Web-ISAPI-Filter -IncludeManagementTools
```

#### Install IIS Features (Windows 10/11)
Run PowerShell as Administrator:
```powershell
# Enable IIS and required features
Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole, IIS-WebServer, IIS-CommonHttpFeatures, IIS-StaticContent, IIS-DefaultDocument, IIS-DirectoryBrowsing, IIS-HttpErrors, IIS-HttpRedirect, IIS-HttpCompressionStatic, IIS-HttpCompressionDynamic
```

### 3. Install URL Rewrite Module (REQUIRED)
**This is essential for Angular routing to work properly!**

Download and install from Microsoft:
- [URL Rewrite Module 2.1](https://www.iis.net/downloads/microsoft/url-rewrite)
- Direct link: https://www.microsoft.com/en-us/download/details.aspx?id=47337

## Deployment Steps

### Step 1: Build the Application

```bash
# Navigate to project directory
cd C:\Dev\Nexus.LAS.Frontend

# Install dependencies (if not already installed)
npm install

# Create production build
ng build --configuration production
```

The build output will be in `dist\nexus.las\browser\` directory.

### Step 2: Prepare IIS

1. **Open IIS Manager**
   - Windows Key + R, type `inetmgr`, press Enter

2. **Create Application Pool**
   - Right-click "Application Pools" → Add Application Pool
   - Name: `NexusLAS`
   - .NET CLR Version: `No Managed Code` (for static Angular app)
   - Managed Pipeline Mode: `Integrated`
   - Click OK

3. **Create Website or Application**

   **Option A: Create as New Website**
   - Right-click "Sites" → Add Website
   - Site name: `NexusLAS`
   - Application pool: Select `NexusLAS`
   - Physical path: `C:\inetpub\wwwroot\NexusLAS` (or your preferred location)
   - Binding:
     - Type: HTTP (or HTTPS if you have SSL certificate)
     - Port: 80 (or your preferred port)
     - Host name: (optional, e.g., `nexus.yourcompany.com`)

   **Option B: Create as Application under Default Web Site**
   - Right-click "Default Web Site" → Add Application
   - Alias: `NexusLAS`
   - Application pool: Select `NexusLAS`
   - Physical path: `C:\inetpub\wwwroot\NexusLAS`

### Step 3: Deploy Files

1. **Copy Build Files**
   - Copy all contents from `C:\Dev\Nexus.LAS.Frontend\dist\nexus.las\browser\`
   - Paste to IIS physical path (e.g., `C:\inetpub\wwwroot\NexusLAS`)
   - Ensure `web.config` is included (already created in the browser folder)

2. **Set Permissions**
   - Right-click the deployment folder → Properties → Security
   - Add `IIS_IUSRS` user
   - Grant `Read & Execute`, `List folder contents`, and `Read` permissions
   - Add `IUSR` user with same permissions

### Step 4: Configure Application Settings

1. **Verify URL Rewrite Module**
   - In IIS Manager, select your site
   - Check if "URL Rewrite" icon appears in Features View
   - If not, install URL Rewrite Module (see Prerequisites)

2. **Configure Anonymous Authentication**
   - Select your site in IIS Manager
   - Double-click "Authentication"
   - Ensure "Anonymous Authentication" is Enabled
   - Other authentication methods: Disabled (unless required)

3. **Set Default Document (already in web.config)**
   - Select your site → Default Document
   - Ensure `index.html` is in the list

### Step 5: Configure API Backend (if applicable)

If your Angular app connects to a backend API:

1. **Update environment files** before building:
   ```typescript
   // src/environment/environment.prod.ts
   export const environment = {
     production: true,
     apiBaseUrl: 'https://your-api-server.com/api',
     // ... other settings
   };
   ```

2. **Configure CORS** on your API server to allow requests from your IIS domain

3. **If API is on same server**, you can use relative URLs:
   ```typescript
   apiBaseUrl: '/api'  // Will use same domain as Angular app
   ```

### Step 6: Test Deployment

1. **Browse to your application**
   - Local: `http://localhost/NexusLAS` or `http://localhost:[port]`
   - Network: `http://[server-name]/NexusLAS`
   - Domain: `http://nexus.yourcompany.com`

2. **Test Angular routing**
   - Navigate to different routes
   - Refresh the page on a route (should not give 404)
   - Test deep linking by directly accessing a route

3. **Check browser console** for any errors (F12)

## Troubleshooting

### Common Issues and Solutions

#### 1. 404 Error on Page Refresh
**Problem:** Routes work but refreshing gives 404
**Solution:** URL Rewrite module not installed or web.config missing
- Install URL Rewrite Module
- Verify web.config exists in deployment folder

#### 2. 500 Internal Server Error
**Problem:** Server error when accessing site
**Solution:** Check web.config syntax and IIS logs
- Check Event Viewer → Windows Logs → Application
- Check IIS logs at `C:\inetpub\logs\LogFiles`

#### 3. Blank Page / Files Not Loading
**Problem:** Page loads but is blank
**Solution:**
- Check base href in index.html
- Verify all files copied correctly
- Check browser console for errors
- Ensure MIME types are configured

#### 4. API Connection Issues
**Problem:** App loads but can't connect to API
**Solution:**
- Verify API URL in environment settings
- Check CORS configuration
- Test API directly in browser
- Check network tab in browser DevTools

#### 5. Fonts/Icons Not Loading
**Problem:** Missing fonts or icons
**Solution:**
- Ensure MIME types for .woff/.woff2 are configured
- Check paths in CSS files
- Verify font files were copied

### IIS Log Locations
- IIS Logs: `C:\inetpub\logs\LogFiles\W3SVC[ID]\`
- Failed Request Logs: `C:\inetpub\logs\FailedReqLogFiles\`
- Event Viewer: Windows Logs → Application

## Production Optimizations

### 1. Enable Compression
Already configured in web.config, verify in IIS:
- Select site → Compression
- Enable both static and dynamic compression

### 2. Configure Caching
- Browser caching is set in web.config
- Adjust cache duration as needed

### 3. Use HTTPS (Recommended)
1. Obtain SSL certificate
2. Add HTTPS binding in IIS
3. Uncomment HTTPS redirect rule in web.config
4. Update Angular environment files to use https:// URLs

### 4. Application Pool Settings
- Set "Start Mode" to `AlwaysRunning` for faster first load
- Configure recycling based on your needs
- Set "Idle Time-out" appropriately

### 5. Performance Monitoring
- Use IIS Manager → "Worker Processes" to monitor
- Enable Failed Request Tracing for debugging
- Use Application Insights or similar for production monitoring

## Updating the Application

To update deployed application:

1. Create new production build:
   ```bash
   ng build --configuration production
   ```

2. Stop Application Pool in IIS Manager

3. Backup current deployment:
   ```powershell
   Copy-Item -Path "C:\inetpub\wwwroot\NexusLAS" -Destination "C:\inetpub\wwwroot\NexusLAS_backup_$(Get-Date -Format 'yyyyMMdd')" -Recurse
   ```

4. Clear deployment folder (except web.config if customized)

5. Copy new build files from `dist\nexus.las\browser\`

6. Start Application Pool

7. Clear browser cache and test

## Security Considerations

1. **Keep IIS Updated**
   - Apply Windows Updates regularly
   - Update IIS modules as needed

2. **Use HTTPS in Production**
   - Encrypt data in transit
   - Prevent man-in-the-middle attacks

3. **Configure Security Headers**
   - Already included in web.config
   - Adjust Content-Security-Policy as needed

4. **Restrict Access if Needed**
   - Use IIS IP and Domain Restrictions
   - Configure Windows Authentication if required

5. **Regular Backups**
   - Backup IIS configuration
   - Backup application files
   - Document deployment settings

## Additional Resources

- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [IIS Documentation](https://docs.microsoft.com/en-us/iis/)
- [URL Rewrite Module Documentation](https://docs.microsoft.com/en-us/iis/extensions/url-rewrite-module/url-rewrite-module-configuration-reference)
- [IIS Security Best Practices](https://docs.microsoft.com/en-us/iis/get-started/whats-new-in-iis-10/iis-10-0-security-best-practices)

---
*Last Updated: 2025-09-17*
*Application: Nexus.LAS Frontend*
*Framework: Angular 20+*