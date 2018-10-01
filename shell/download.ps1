$userName = "breno@tcenter.com.br"
$password = "AGzzcso1$1"
$siteCollectionUrl = "https://tecnocenter.sharepoint.com"
$webUrl = $siteCollectionUrl + "/dev"
$docLibraryTitle = "Documentos"
$destinationLocalFolder = "C:\Users\TCENTER\Desktop\SP"

#------------------------------------------------
Import-Module C:\Users\TCENTER\Documents\SharePoint-Online-Code\shell\SPOMod20160326.psm1
#------------------------------------------------ 
 
Connect-SPOCSOM -Username $userName -Url $webUrl 
 
#Download document function 
function HTTPDownloadFile ($serverFileLocation, $downloadPath) 
{ 
    #create secure password 
    $sPassword = $password | ConvertTo-SecureString -AsPlainText -Force 
 
    $webClient = New-Object System.Net.WebClient  
    $webClient.Credentials = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($userName, $sPassword) 
    $webClient.Headers.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f") 
 
    [System.Uri]$destinationUri = [System.Uri]$serverFileLocation 
 
    Write-Host "||" $serverFileLocation #"as" $downloadPath 
     
    $webClient.DownloadFile($destinationUri, $DownloadPath) 
    $webClient.Dispose() 
} 
 
#------------------------------------------------ 
#Get files (not dirs) 
$listItems = Get-SPOListItems -ListTitle $docLibraryTitle -IncludeAllProperties $true -Recursive | where {$_.FsObjType -eq 0} 
 
#Iteration on all files in doc. library 
foreach ($item in $listItems) 
{ 
    [string]$sourceDirectory = $item.FileDirRef 
    [string]$sourceFileName = $item.FileLeafRef 
    [String]$sourceFileUrl = $siteCollectionUrl + $item.FileRef 
 
    #create destination directory 
    [string]$destinationDirectory = $destinationLocalFolder + $sourceDirectory 
    $destinationDirectory = $destinationDirectory.Replace("/","\") 
    if (!(Test-Path -path $destinationDirectory)) 
    { 
        New-Item -path $destinationDirectory -type directory  
    } 
 
    #download current version document 
    [string]$destinationFilePath = $destinationDirectory + "\" + $sourceFileName 
    HTTPDownloadFile $sourceFileUrl $destinationFilePath 
 
    #get versions of curent file 
    $fileVersions = Get-SPOListItemVersions -ListTitle $docLibraryTitle -ItemID $item.Id 
 
    #iteration on all file versions 
    foreach ($ver in $fileVersions) 
    { 
        $fileHistoryUrl = $webUrl + "/" + $ver.Url 
        $version = $ver.VersionLabel 
 
        if (![string]::IsNullOrEmpty($fileHistoryUrl)) 
        { 
            $filesplit = $sourceFileName.split(".")  
            $fullname = $filesplit[0]  
            $fileext = $filesplit[1]  
            $fullFileName = $fullname + "_v" + $version + "." + $fileext 
             
            #download history version document 
            $destinationFilePath = $destinationDirectory + "\" + $fullFileName 
 
            HTTPDownloadFile $sourceFileUrl $destinationFilePath 
        }  
    } 
} 