#!/bin/bash
rm -rf var/cache/twig/*
rsync -avr --exclude 'var' --exclude 'vendor' ./ montag@montag.webfactional.com:/home/montag/webapps/lecturafacil
