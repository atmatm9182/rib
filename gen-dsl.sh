#!/usr/bin/env bash

set -e

tagfile=`cat ./tags.txt`
nospace=${tagfile//\"/}
tags=(${nospace//,/ })

result=$(cat <<EOF
function elem(name, deps, attrs, ...children) {
        const elem = new Element(name, attrs, children);
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
