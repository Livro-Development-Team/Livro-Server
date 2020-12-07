dockerize -wait tcp://mysql:3306 -timeout 10s

echo "Start server"
npm start