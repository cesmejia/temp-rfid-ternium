#!/bin/bash

echo 'hello Totemp'

cd /home/pi/Documents/totemp/thermo_box
lxterminal -e "python3 thermo_box.py" &

cd /home/pi/Documents/totemp/temp-rfid-ternium
lxterminal -e "npm run server" &
# lxterminal -e "serve -s build" &

cd /home/pi/Documents/totemp/temp-rfid-ternium
# lxterminal -e "npm run start" &
lxterminal -e "serve -s build -l 3000" &

chromium-browser --kiosk --app=http://localhost:3000

# When Installing or updating, give this file permissions on (Copy & paste on Terminal) with:
# chmod a+rx start.sh

# to autorun file on start 
# cd /etc/xdg/lxsession/LXDE-pi/
# sudo nano autostart
# @/home/pi/Documents/totemp/temp-rfid-ternium/start.sh
# CTRL O , ENTER
# CTRL X