#!/bin/bash

rsync -avr --exclude 'node_modules' --exclude 'sass' ./ montag@montag.webfactional.com:/home/montag/webapps/lecturafacil
