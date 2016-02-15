#!/bin/bash
echo "Shaking phone";
adb shell input keyevent 82
echo "Pressing 'Reload JS'"
#adb shell input tap 236 520
adb shell input keyevent 19 # UP key to select the reload option
adb shell input keyevent 66 # eneter key to select

#adb shell getevent -l /dev/input/event0
