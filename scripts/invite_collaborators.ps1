# PowerShell script to quickly open collaborator invite pages or run GitHub CLI commands
# Amazon Developer Relations GitHub profiles:
# chris-trag, knmeiss, giolaq, anishamalde, mosesroth, emersonsklar, testing@devpost.com

$reviewers = @(
    "chris-trag",
    "knmeiss",
    "giolaq",
    "anishamalde",
    "mosesroth",
    "emersonsklar"
)

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "Amazon Developer Hackathon — Reviewer Invites Checklist" -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Cyan

foreach ($user in $reviewers) {
    Write-Host "[+] Amazon Reviewer: https://github.com/$user (Add as Collaborator)" -ForegroundColor Green
}

Write-Host "`nAlso add Devpost testing email: testing@devpost.com" -ForegroundColor Magenta
Write-Host "Open Settings > Collaborators on your repo to send invitations." -ForegroundColor White
