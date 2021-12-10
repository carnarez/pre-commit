FROM python:3.9-slim

ARG GID=1000
ARG UID=1000

COPY requirements.txt /tmp/requirements.txt

RUN apt-get update \
 && apt-get install --no-install-recommends --no-install-suggests --yes git \
 && if [ `grep -c ":$GID:" /etc/group` -eq "0" ]; then groupadd -g $GID -r pre-commmit; fi \
 && if [ `grep -c ":$UID:" /etc/group` -eq "0" ]; then useradd -d /home/pre-commit -g $GID -m -s /bin/bash -u $UID pre-commit; fi \
 && pip install --no-cache-dir -r /tmp/requirements.txt

COPY hooks.yaml /home/pre-commit/hooks.yaml
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

USER $UID

WORKDIR /usr/src

ENTRYPOINT ["/bin/bash", "/usr/local/bin/entrypoint.sh"]
