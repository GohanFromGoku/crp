#!/bin/bash

script_dir=$(dirname "$(readlink -f "$0")")

echo "Enter your package name:"
read -r projectName

echo "Enter your app name:"
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

copy_files() {
  local app_name="$1"  # Define app_name within the function scope

  mkdir -p "$app_name"
  echo "'$app_name' Created Successfully"
  echo "Files copying..."

  case "$(uname -s)" in
    Linux*) 
              rsync -av --exclude='node_modules' --exclude='build' --exclude='scripts/create.sh' "$script_dir"/../ "$app_name"/ > /dev/null 2>&1
              ;;
    Darwin*) 
              rsync -av --exclude='node_modules' --exclude='scripts/create.sh' "$script_dir"/../ "$app_name"/ > /dev/null 2>&1
              ;;
    CYGWIN*) 
              rsync -av --exclude='node_modules' --exclude='scripts/create.sh' "$script_dir"/../ "$app_name"/ > /dev/null 2>&1
              ;;
    MINGW*) 
              cp -r --exclude='node_modules' --exclude='scripts/create.sh' "$script_dir"/../* "$app_name"
              ;;
    *)        echo "Unsupported operating system"
              exit 1
              ;;
  esac

  echo "Files Copied Successfully!"
}

if ! is_valid_name "$appName"; then
  exit 1
fi

copy_files "$appName"

cd "./$appName" || exit

yarn install

sed -i '' "s/\"name\":.*/\"name\": \"$appName\",/" "./package.json"
sed -i '' "s/\"name\":.*/\"name\": \"$projectName\"/" "../app.json"

sed -i '' "s/\"short_name\":.*/\"short_name\": \"$projectName\"/" "../public/manifest.json"
sed -i '' "s/\"name\":.*/\"name\": \"$projectName\"/" "../public/manifest.json"
sed -i '' "s/\"description\":.*/\"description\": \"$projectName\"/" "../public/manifest.json"


git init .
git add .
git commit -m "Initialized Project"