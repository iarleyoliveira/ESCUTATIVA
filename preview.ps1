$ErrorActionPreference = 'Stop'
$previewRuby = Join-Path $env:TEMP 'escutativa-preview-tools/ruby/bin/ruby.exe'
if (-not (Test-Path -LiteralPath $previewRuby)) {
    throw 'Ruby da previa indisponivel. Prepare o ambiente antes de executar este script.'
}
Set-Location -LiteralPath $PSScriptRoot
Write-Host 'Previa: http://127.0.0.1:4000/'
Write-Host 'Mantenha esta janela aberta. Use Ctrl+C para encerrar.'
& $previewRuby (Join-Path (Split-Path $previewRuby) 'jekyll') serve --host 127.0.0.1 --port 4000 --livereload --force_polling
