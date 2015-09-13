#!/bin/sh

# add crontab
/usr/local/avs/public_tools/conf_par_replace.sh mycrontab.template mycrontab
dos2unix mycrontab
/usr/local/avs/public_tools/update_crontab.sh mycrontab
