FROM prom/alertmanager:latest

COPY alertmanager.yml /etc/alertmanager/alertmanager.template.yml
COPY docker-entrypoint.sh /docker-entrypoint.sh

USER root
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
