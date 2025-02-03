#!/usr/bin/env bash

set -e

tagfile=`cat ./tags.txt`
tags=(${tagfile//,/ })

result=$(cat <<EOF
function elem(init, deps, attrs, ...children) {
        if (typeof deps === "string" || typeof attrs === "undefined") {
                return new RibElement(init, [], [deps]);
        }

        const elem = new RibElement(init, attrs, children);
        elem.sub(...deps);
        return elem;
}

EOF
      )

for tag in "${tags[@]}"
do
    fn=$(cat <<EOF

function $tag(deps, attrs, ...children) {
        return elem("$tag", deps, attrs, ...children);
}

EOF
      )
    result="$result$fn"
done

echo "$result" > src/rib-dsl.js
