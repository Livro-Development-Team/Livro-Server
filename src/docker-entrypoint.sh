dockerize -wait tcp://mysql:3306 -timeout 3s

echo "Start server"
npm start