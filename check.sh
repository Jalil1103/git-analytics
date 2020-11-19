#!/bin/bash
cd /Users/abdijalil.dini/projects

function jsonOutput() {
    CUR="/Users/abdijalil.dini/WebstormProjects/bitbucketcommits/src/data/${PWD##*/}"
    if [ -d "$CUR" ]; then
    printf '%s\n' "Removing Lock ($CUR)"
    rm -rf "$CUR"
    fi
    mkdir  "${CUR}"
    git -c log.showSignature=false log --use-mailmap  \
        --pretty=format:'{%n "author": {%n  "name": "%aN",%n    "date": "%aD"%n}%n},' \
        | sed "$ s/,$//" \
        | sed ':a;N;$!ba;s/\r\n\([^{]\)/\\n\1/g' \
        | awk 'BEGIN { print("[") } { print($0) } END { print("]") }' \
        >"${CUR}/output.json"
}

for d in ./*/ ; do

(cd "$d" && jsonOutput);

done

