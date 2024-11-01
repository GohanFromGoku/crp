#!/bin/bash

script_dir=$(dirname "$(readlink -f "$0")")

echo "Enter Name or Webapp (can have spaces):"
read -r projectName

echo "Enter Name for package.json(should not start with numbers and no spaces):"
read -r appName

is_valid_name() {
  local name="$1"
  if [[ $name =~ [[:upper:]] ]]; then
    echo "Error: App name should not contain Upper case letters."
    return 1 
  fi

  if [[ $name =~ [[:space:]] ]]; then
    echo "Error: App name should not contain spaces."
    return 1
  fi

  if [[ $name =~ ^[0-9] ]]; then
    echo "Error: App name should not start with a number."
    return 1
  fi

  return 0 
}

if ! is_valid_name "$appName"; then
  exit 1
fi

echo "Enter description:"
read -r description

if [[ -z "$description" ]]; then
  echo "Error: Description should not be empty."
  exit 1
fi

copy_files() {
  local app_name="$1"

  mkdir -p "$app_name"
  echo "'$app_name' Created Successfully"
  echo "Files copying..."

  case "$(uname -s)" in
    Linux* | Darwin* | CYGWIN*) 
              rsync -av --exclude='node_modules' --exclude='create.sh' "$script_dir"/template/ "$app_name"/ > /dev/null 2>&1
              ;;
    MINGW*) 
              cp -r "$script_dir"/template/* "$app_name"
              ;;
    *)        echo "Unsupported operating system"
              exit 1
              ;;
  esac

  echo "Files Copied Successfully!"
}

copy_files "$appName"

cd "./$appName" || exit

sed -i '' "s/\"name\":.*/\"name\": \"$appName\",/" "./package.json"
sed -i '' "s/\"description\":.*/\"description\": \"$projectName\",/" "./package.json"

sed -i '' "s/\"name\":.*/\"name\": \"$projectName\"/" "./app.json"

sed -i '' "s/\"short_name\":.*/\"short_name\": \"$projectName\"/" "./public/manifest.json"
sed -i '' "s/\"name\":.*/\"name\": \"$projectName\"/" "./public/manifest.json"
sed -i '' "s/\"description\":.*/\"description\": \"$projectName\"/" "./public/manifest.json"

yarn install

git init .
git add .
git commit -m "Initialized Project"

echo "cd $app_name"
echo "yarn start"