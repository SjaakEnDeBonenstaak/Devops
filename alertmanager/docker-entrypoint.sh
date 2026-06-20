#!/bin/sh
sed -e "s|\${SMTP_SMARTHOST}|${SMTP_SMARTHOST}|g" \
    -e "s|\${SMTP_USERNAME}|${SMTP_USERNAME}|g" \
    -e "s|\${SMTP_PASSWORD}|${SMTP_PASSWORD}|g" \
    -e "s|\${ALERT_FROM_EMAIL}|${ALERT_FROM_EMAIL}|g" \
    -e "s|\${ALERT_TO_EMAIL}|${ALERT_TO_EMAIL}|g" \
    /etc/alertmanager/alertmanager.template.yml > /etc/alertmanager/alertmanager.yml

exec /bin/alertmanager --config.file=/etc/alertmanager/alertmanager.yml "$@"
