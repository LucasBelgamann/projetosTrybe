FROM mjgargani/puppeteer:trybe1.0 AS todotests
WORKDIR /todo-app/tests
EXPOSE 3000
ADD node_modules.tar.gz .
COPY . .
CMD [ "npm", "test" ]
