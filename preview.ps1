$ErrorActionPreference = 'Stop'
$previewRuby = Join-Path $env:TEMP 'escutativa-preview-tools/ruby/bin/ruby.exe'
if (-not (Test-Path -LiteralPath $previewRuby)) {
    $previewRuby = Join-Path $env:LOCALAPPDATA 'Temp/escutativa-modern-ruby/bin/ruby.exe'
}
if (-not (Test-Path -LiteralPath $previewRuby)) {
    throw 'Ruby da previa indisponivel. Prepare o ambiente antes de executar este script.'
}
Set-Location -LiteralPath $PSScriptRoot
Write-Host 'Previa: http://127.0.0.1:4000/'
Write-Host 'Mantenha esta janela aberta. Use Ctrl+C para encerrar.'
$previewGems = Join-Path $env:LOCALAPPDATA 'Temp/escutativa-preview-tools/ruby/lib/ruby/gems/3.3.0'
$env:GEM_HOME = $previewGems
$env:GEM_PATH = (Join-Path (Split-Path (Split-Path $previewRuby)) 'lib/ruby/gems/3.3.0') + ';' + $previewGems
& $previewRuby (Join-Path $env:LOCALAPPDATA 'Temp/escutativa-preview-tools/ruby/bin/jekyll') serve --host 127.0.0.1 --port 4000 --livereload --force_polling
