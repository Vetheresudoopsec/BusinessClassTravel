#!/bin/sh
# Start or stop the local Apache server for this site (Homebrew httpd + php).
#   dev/serve.sh          start in the background on http://localhost:8080
#   dev/serve.sh fg       run in the foreground (Ctrl+C to stop)
#   dev/serve.sh stop     stop it
#   dev/serve.sh restart  stop, then start
set -e
PROJECT="$(cd "$(dirname "$0")/.." && pwd)"
HTTPD=/opt/homebrew/bin/httpd
CONF="$PROJECT/dev/httpd.conf"
mkdir -p "$PROJECT/dev/logs"

run() { "$HTTPD" -f "$CONF" -C "Define PROJECT $PROJECT" "$@"; }

PIDFILE="$PROJECT/dev/logs/httpd.pid"
running() { [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; }

case "${1:-start}" in
  start)   if running; then echo "Already running at http://localhost:8080"; else run -k start && echo "Serving $PROJECT at http://localhost:8080"; fi ;;
  fg)      echo "Serving $PROJECT at http://localhost:8080 (Ctrl+C to stop)"; exec "$HTTPD" -f "$CONF" -C "Define PROJECT $PROJECT" -D FOREGROUND ;;
  stop)    run -k stop && echo "Stopped" ;;
  restart) run -k restart && echo "Restarted at http://localhost:8080" ;;
  *)       echo "Usage: dev/serve.sh [start|fg|stop|restart]"; exit 1 ;;
esac
