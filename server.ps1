$port = 8080
$root = if ($PSScriptRoot) { $PSScriptRoot } else { "C:\Users\araby\Favorites\my-portfolio" }
$ip = [System.Net.IPAddress]::Any
$listener = New-Object System.Net.Sockets.TcpListener($ip, $port)
$listener.Start()

Write-Output "=========================================================="
Write-Output " Local Server started successfully!"
Write-Output " Open on this PC:    http://localhost:$port/"
Write-Output " Open on your phone: http://192.168.1.3:$port/"
Write-Output "=========================================================="

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".svg"   = "image/svg+xml"
    ".woff2" = "font/woff2"
    ".woff"  = "font/woff"
    ".ttf"   = "font/ttf"
    ".otf"   = "font/otf"
    ".json"  = "application/json"
    ".ico"   = "image/x-icon"
}

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        
        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrWhiteSpace($requestLine)) {
            $client.Close()
            continue
        }
        
        $parts = $requestLine.Split(' ')
        if ($parts.Length -lt 2) {
            $client.Close()
            continue
        }
        
        $rawUrl = $parts[1]
        $pathPart = $rawUrl.Split('?')[0]
        
        # Decode URL (supports Arabic folders/filenames)
        $decodedPath = [System.Net.WebUtility]::UrlDecode($pathPart)
        if ($decodedPath -eq "/" -or $decodedPath -eq "") {
            $decodedPath = "/index.html"
        }
        
        $relativeFilePath = $decodedPath.TrimStart('/').Replace('/', '\')
        $fullPath = [System.IO.Path]::Combine($root, $relativeFilePath)
        
        if ([System.IO.File]::Exists($fullPath)) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $mime = $mimeTypes[$ext]
            }
            
            $fileBytes = [System.IO.File]::ReadAllBytes($fullPath)
            $contentLength = $fileBytes.Length
            
            $headerText = "HTTP/1.1 200 OK`r`n" +
                          "Content-Type: $mime`r`n" +
                          "Content-Length: $contentLength`r`n" +
                          "Access-Control-Allow-Origin: *`r`n" +
                          "Cache-Control: no-cache`r`n" +
                          "Connection: close`r`n`r`n"
                          
            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($headerText)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $notFoundBody = "<html><body style='font-family:sans-serif;text-align:center;padding:50px;'><h1>404 Not Found</h1><p>File not found: $decodedPath</p></body></html>"
            $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($notFoundBody)
            $headerText = "HTTP/1.1 404 Not Found`r`n" +
                          "Content-Type: text/html; charset=utf-8`r`n" +
                          "Content-Length: $($bodyBytes.Length)`r`n" +
                          "Connection: close`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($headerText)
            $stream.Write($headerBytes, 0, $headerBytes.Length)
            $stream.Write($bodyBytes, 0, $bodyBytes.Length)
        }
        
        $stream.Flush()
        $client.Close()
    } catch {
        # continue on client disconnect
    }
}
