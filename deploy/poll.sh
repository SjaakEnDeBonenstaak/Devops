#!/bin/sh
# Eenvoudige poll-deployer: checkt elke POLL_INTERVAL seconden of er een nieuwe
# commit op de DEPLOY_BRANCH staat. Zo ja: pull + (her)build de productie-stack.
# Draait in een container met de host docker-socket en de repo gemount.
set -eu

BRANCH="${DEPLOY_BRANCH:-hosting}"
INTERVAL="${POLL_INTERVAL:-60}"
REPO_DIR="${REPO_DIR:-/repo}"
PROJECT="${COMPOSE_PROJECT:-devops}"

# git draait als root in de container terwijl de bestanden van de host-user zijn.
git config --global --add safe.directory "$REPO_DIR"
cd "$REPO_DIR"

log() { echo "[deployer $(date -u +%FT%TZ)] $*"; }

log "watching '$BRANCH' elke ${INTERVAL}s in $REPO_DIR (project: $PROJECT)"

while true; do
  if git fetch origin "$BRANCH" --quiet 2>/dev/null; then
    LOCAL="$(git rev-parse HEAD)"
    REMOTE="$(git rev-parse "origin/$BRANCH")"
    if [ "$LOCAL" != "$REMOTE" ]; then
      log "nieuwe commit gevonden: $REMOTE — deployen..."
      # --hard zet de working tree gelijk aan de remote. Untracked files
      # (zoals .env en SETUP-ZELFHOSTING.txt) blijven ongemoeid.
      git reset --hard "origin/$BRANCH"
      if docker compose -p "$PROJECT" \
          -f docker-compose.yml -f docker-compose.prod.yml \
          up -d --build; then
        log "deploy klaar op $REMOTE"
      else
        log "deploy FOUT — stack draait mogelijk nog op oude versie"
      fi
    fi
  else
    log "git fetch mislukt (netwerk?), opnieuw proberen"
  fi
  sleep "$INTERVAL"
done
