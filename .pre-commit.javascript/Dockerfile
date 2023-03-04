FROM node:slim

RUN npm install eslint eslint-config-eslint --save-dev \
 && echo '{"extends": "eslint"}' > /tmp/eslintrc

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

WORKDIR /usr/src

ENTRYPOINT ["/bin/bash", "/usr/local/bin/entrypoint.sh"]
