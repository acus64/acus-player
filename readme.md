# 📺 Tele Acus 9.5 RV – Progressive Web App

**Tele Acus 9.5 RV** è una Web App per lo streaming di centinaia di canali radio e TV, trasformata in **Progressive Web App (PWA)** per essere installabile su qualsiasi dispositivo (smartphone, tablet, desktop).

---

## ✅ Funzionalità principali

- ✅ Selezione rapida tra decine di canali TV/radio
- ✅ Interfaccia responsiva e leggera
- ✅ Ricerca testuale e comandi vocali (se supportati)
- ✅ Supporto HLS.js per streaming `.m3u8`
- ✅ Modalità standalone (tipo app mobile)
- ✅ Installabile su Android, iOS, macOS, Windows (Chrome/Safari/Edge)

---

## 🛠️ Tecnologie utilizzate

- HTML5 / CSS3 / JavaScript
- [HLS.js](https://github.com/video-dev/hls.js/) per i flussi `.m3u8`
- Web App Manifest per la PWA
- Service Worker minimale (senza caching, perché i contenuti sono in streaming)
- Compatibile con [GitHub Pages](https://pages.github.com/)

---

## 🚀 Come installarla

1. Visita la versione online su GitHub Pages (una volta pubblicata).
2. Se usi **Chrome, Edge o Safari mobile**, vedrai un messaggio tipo "Aggiungi a Home".
3. Conferma: l’app sarà installata come app nativa.

---

## 📦 Struttura del progetto

├── index.html # Interfaccia principale
├── manifest.json # Configurazione PWA
├── service-worker.js # Worker per installabilità (senza caching)
└── icons/
├── icon-192.png
└── icon-512.png


---

## ⚠️ Note

- L'app **non funziona offline**, poiché i flussi sono **live streaming** (audio/video).
- Alcuni link potrebbero richiedere connessioni rapide o autorizzazioni di terze parti.

---

## 👤 Autore

Realizzata e adattata per PWA da [tuo_nome]  
Contenuti a cura di Acus Studio

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT.  
Verifica i diritti di trasmissione per ciascun flusso prima di ridistribuirlo.