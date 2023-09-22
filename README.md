# Ama Betriebnummer ChromeExtension 

## Purpose:
To provide ready to copy/paste Betriebsnummer for Testing websites. There is also a checkbox 'autologin' which
will automatically input username and password and perform the login if user navigates to a page, the url of which contains:
- `logintest.ama.gv.at` which is used by TEST/REG Servers
- or `entwlogin01.ama.at` used by the CLOUD Login

It will **ONLY autofill and press login if there are NO errors on the login page**. This is to prevent automatic
retries that will result in BNR being blocked.

## To install:
 - Open Chrome
 - type `chrome://extensions/`
 - click **Developer mode** toggle.
 - press the appeared **Load unpacked** button.
 - then just select the folder of this project and that is it.

## To add/delete/edit BNR list:
Just edit the [bnr.csv](./reviews.txt)

