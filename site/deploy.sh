#!/bin/bash

rsync -avr --exclude 'var/cache' --exclude 'var/logs' --exclude 'vendor' ./ montag@montag.webfactional.com:/home/montag/webapps/lecturafacil
