#!/bin/bash


for FILE in `ls *.pdf`
do
  echo convert -density 150 -depth 8 -quality 85 "$FILE" "${FILE%.pdf}.png"
  convert -density 150 -depth 8 -quality 85 "$FILE" "${FILE%.pdf}.png"
done