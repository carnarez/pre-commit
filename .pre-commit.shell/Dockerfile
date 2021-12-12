FROM debian:bullseye

ARG tag=latest
ARG tar=https://github.com/koalaman/shellcheck/releases/download/$tag/shellcheck-$tag.linux.x86_64.tar.xz

RUN apt-get update \
 && apt-get install --no-install-recommends --no-install-suggests --yes git wget \
 && wget -O shellcheck.tar.xz $tar \
 && tar -xJf shellcheck.tar.xz \
 && mv shellcheck-$tag/shellcheck /usr/local/bin/shellcheck \
 && rm -fr shellcheck-$tag

COPY hooks.yaml /usr/share/pre-commit/hooks.yaml
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

WORKDIR /usr/src

ENTRYPOINT ["/bin/bash", "/usr/local/bin/entrypoint.sh"]
