#!/bin/sh
sed -e "s|\${SENDGRID_API_KEY}|${SENDGRID_API_KEY}|g" \
    -e "s|\${ALERT_FROM_EMAIL}|${ALERT_FROM_EMAIL}|g" \
    -e "s|\${ALERT_TO_EMAIL}|${ALERT_TO_EMAIL}|g" \
    /etc/alertmanager/alertmanager.template.yml > /etc/alertmanager/alertmanager.yml

exec /bin/alertmanager --config.file=/etc/alertmanager/alertmanager.yml "$@"
