sh ./npm-install.sh
if [ $? -ne 0 ]; then
  echo "npm install resulted in an error"
  exit 1
fi
npm run build
if [ $? -ne 0 ]; then
  echo "npm run build resulted in an error"
  exit 1
fi
