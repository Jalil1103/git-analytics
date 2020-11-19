#!/bin/bash
cd {PATH_TO_YOUR_REPOS}

function jsonOutput() {
    CUR="{PATH_YOU_WANT_TO_DATA}src/data/${PWD##*/}"
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

