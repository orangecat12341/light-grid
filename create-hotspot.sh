nmcli con add type wifi ifname wlan0 con-name Hotspot autoconnect yes ssid light-grid
nmcli con modify Hotspot 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared
nmcli modify Hotspot wifi-sec.key-mgmt wpa-psk
nmcli con modify Hotspot wifi-sec-psk "light-grid"
