FROM docker:cli

# git om commits te pollen, docker-cli-compose voor `docker compose`.
RUN apk add --no-cache git docker-cli-compose

COPY poll.sh /usr/local/bin/poll.sh
RUN chmod +x /usr/local/bin/poll.sh

ENTRYPOINT ["/usr/local/bin/poll.sh"]
