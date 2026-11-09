/* @veilbreak/gui — generated from com.veilbreak.gui by Tools~/web/package.py. Do not edit. */
/* The kit: a web port of the Unity package com.veilbreak.gui (UI Toolkit, portrait 390 x 844).
   Same element trees, BEM classes (the USS vb- names; the legacy kit above is renamed to vbl-)
   and Bind() logic as the C# sources; Gui.uss, Layout.uss and World.uss are ported mechanically into bundle.css. */
(function () {
  'use strict';
  var R = window.React;
  var h = R.createElement;
  // Layout effects run in the browser only, so server rendering (Next.js and the like) is quiet; the paint happens on hydration.
  var useIsoLayout = typeof document !== 'undefined' ? R.useLayoutEffect : R.useEffect;
  var ICONS = {"add":"<path d=\"M12 4v16 M4 12h16\"/>","armor":"<path d=\"M8 2h8l2 4 4 2-3 6-3-1v9H8v-9l-3 1-3-6 4-2Z\"/>","arrow":"<path d=\"M6 18L18 6M10 6H18V14\"/>","automation":"<path d=\"M19 6a8 8 0 1 0 1 10 M19 2v5h-5\"/>","autopilot":"<path d=\"M19 12A7 7 0 1 1 16.95 7.05M17 3V7.05H13\"/>","back":"<path d=\"M15 4 7 12l8 8\"/>","barrier":"<path d=\"M12 2 21 6v7l-9 9-9-9V6Z M7 11l4 4 6-7\"/>","bastion":"<path d=\"M3 4h18v10l-9 8-9-8Z M12 4v18\"/>","battle":"<path d=\"M4 3 20 19 M20 3 4 19 M3 15l6 6 M15 21l6-6 M4 3v5 M20 3v5\"/>","beam":"<path d=\"M2 8h20 M2 16h20 M5 12h14 M17 5l5 7-5 7\"/>","breaker":"<path d=\"M3 4h8v7H3Z M14 4h7v7h-7Z M3 14h8v7H3Z M17 14l4 7 M14 17l7-3\"/>","burst":"<g stroke-linecap=\"butt\" stroke-linejoin=\"miter\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M5 15L15 5M7 18L18 7M10 20L20 10M4 11L11 4\"/></g>","burst-role":"<path d=\"M15.2 12A3.2 3.2 0 1 1 8.8 12A3.2 3.2 0 1 1 15.2 12M12 2V6M12 18V22M2 12H6M18 12H22M5 5L7.8 7.8M16.2 16.2L19 19M19 5L16.2 7.8M7.8 16.2L5 19\"/>","charm":"<path d=\"M12 4L20 12L12 20L4 12ZM12 9L15 12L12 15L9 12Z\"/>","check":"<path d=\"M3 12l6 6L21 5\"/>","chevron":"<path d=\"M8 4l8 8-8 8\"/>","chevron-left":"<path d=\"M15 6L9 12L15 18\"/>","circle":"<path d=\"M20 12A8 8 0 1 1 4 12A8 8 0 1 1 20 12\"/>","cleanse":"<path d=\"M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z\"/>","close":"<path d=\"M5 5l14 14 M19 5 5 19\"/>","cog":"<path d=\"M10.48 4.55 L10.70 1.68 L13.30 1.68 L13.52 4.55 A7.6 7.6 0 0 1 16.19 5.66 L18.37 3.78 L20.22 5.63 L18.34 7.81 A7.6 7.6 0 0 1 19.45 10.48 L22.32 10.70 L22.32 13.30 L19.45 13.52 A7.6 7.6 0 0 1 18.34 16.19 L20.22 18.37 L18.37 20.22 L16.19 18.34 A7.6 7.6 0 0 1 13.52 19.45 L13.30 22.32 L10.70 22.32 L10.48 19.45 A7.6 7.6 0 0 1 7.81 18.34 L5.63 20.22 L3.78 18.37 L5.66 16.19 A7.6 7.6 0 0 1 4.55 13.52 L1.68 13.30 L1.68 10.70 L4.55 10.48 A7.6 7.6 0 0 1 5.66 7.81 L3.78 5.63 L5.63 3.78 L7.81 5.66 A7.6 7.6 0 0 1 10.48 4.55 Z\"/><circle cx=\"12\" cy=\"12\" r=\"3.2\"/>","cone":"<path d=\"M12 21 2 5Q12-1 22 5Z\"/>","connection":"<path d=\"M2 7a15 15 0 0 1 20 0 M5 11a10 10 0 0 1 14 0 M8 15a5 5 0 0 1 8 0\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/>","cooldown":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 5v7l5 3\"/>","core":"<path d=\"M12 3L20 7.5V16.5L12 21L4 16.5V7.5ZM14.6 12A2.6 2.6 0 1 1 9.4 12A2.6 2.6 0 1 1 14.6 12\"/>","counter":"<path d=\"M5 7h10a6 6 0 0 1 0 12h-4 M9 2 4 7l5 5\"/>","currency":"<path d=\"M12 2 21 7v10l-9 5-9-5V7Z M8 9l4-2 4 2v6l-4 2-4-2Z\"/>","dash":"<path d=\"M2 6h8 M2 12h12 M2 18h8 M13 3l9 9-9 9\"/>","debuffer":"<path d=\"M12 3L20 12L12 21L4 12ZM12 8V15M9 12L12 15L15 12\"/>","diamond":"<path d=\"M12 4L20 12L12 20L4 12Z\"/>","disruptor":"<path d=\"M13 3L6 13H12L10 21L18 10H12Z\"/>","exposed":"<path d=\"M12 2 21 6v7l-9 9-9-9V6Z M13 4 9 10l6 3-4 7\"/>","fan":"<path d=\"M12 21V3 M12 21 3 6 M12 21 21 6 M8 6l4-3 4 3\"/>","fullscreen":"<path d=\"M3 9V3h6 M15 3h6v6 M21 15v6h-6 M9 21H3v-6\"/>","haste":"<path d=\"M2 5l8 7-8 7 M12 5l8 7-8 7\"/>","healer":"<path d=\"M10 4H14V10H20V14H14V20H10V14H4V10H10Z\"/>","health":"<path d=\"M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z\"/>","info":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v7 M12 6v1\"/>","interrupted":"<path d=\"M13 3L7 12H11.5M12.5 12H17L11 21\"/>","invalid":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M6 6l12 12\"/>","inventory":"<path d=\"M3 7l9-5 9 5v13H3Z M3 7h18 M8 11h8v5H8Z\"/>","key":"<circle cx=\"8\" cy=\"8\" r=\"5\"/><path d=\"M12 12l9 9 M16 16l3-3 M19 19l3-3\"/>","lock":"<path d=\"M5 10h14v11H5Z M8 10V6a4 4 0 0 1 8 0v4 M12 14v3\"/>","marker":"<path d=\"M12 2 22 12 12 22 2 12Z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","menu":"<path d=\"M4 7H20M4 12H20M4 17H20\"/>","next":"<path d=\"M6 6L14 12L6 18ZM18 6V18\"/>","no-target":"<path d=\"M18 12A6 6 0 1 1 6 12A6 6 0 1 1 18 12M12 3V8M12 16V21M3 12H8M16 12H21M4 4L20 20\"/>","offline":"<path d=\"M2 7a15 15 0 0 1 20 0 M5 11a10 10 0 0 1 14 0 M3 3l18 18\"/>","operator":"<circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"4\" cy=\"4\" r=\"2\"/><circle cx=\"20\" cy=\"4\" r=\"2\"/><circle cx=\"12\" cy=\"21\" r=\"2\"/><path d=\"M6 6l3 3 M18 6l-3 3 M12 16v3\"/>","optic":"<path d=\"M2 12C5 7 8.5 5 12 5C15.5 5 19 7 22 12C19 17 15.5 19 12 19C8.5 19 5 17 2 12ZM14.6 12A2.6 2.6 0 1 1 9.4 12A2.6 2.6 0 1 1 14.6 12\"/>","pause":"<path d=\"M8 5v14 M16 5v14\"/>","pierce":"<path d=\"M4 12H20M15 7L20 12L15 17M4 8L7 12L4 16\"/>","plating":"<path d=\"M12 3L19 6V12C19 16 16 19 12 21C8 19 5 16 5 12V6ZM5 11H19\"/>","play":"<path d=\"M7 4v16l12-8z\"/>","power":"<path d=\"M14 2 5 14h6l-1 8 9-13h-6Z\"/>","prev":"<path d=\"M18 6L10 12L18 18ZM6 6V18\"/>","projectile":"<path d=\"M3 9h10V5l8 7-8 7v-4H3\"/>","protector":"<path d=\"M12 3L19 6V12C19 16 16 19 12 21C8 19 5 16 5 12V6Z\"/>","queue":"<path d=\"M3 4h18 M3 10h12 M3 16h8 M16 13l6 5-6 5\"/>","ranged":"<path d=\"M18 12A6 6 0 1 1 6 12A6 6 0 1 1 18 12M12 3V8M12 16V21M3 12H8M16 12H21\"/>","ranked":"<path d=\"M5 3h14v9l-7 5-7-5Z M12 17v4 M7 21h10 M2 4v5l3 2 M22 4v5l-3 2\"/>","remove":"<path d=\"m5 5 14 14 M19 5 5 19\"/>","replays":"<path d=\"M9 5v14l11-7Z M3 5v14\"/>","rifts":"<path d=\"M12 2 20 7 18 18 12 22 4 17 6 6Z M13 5 9 11 15 13 11 19\"/>","root":"<path d=\"M12 2v11 M5 7l7 6 7-6 M12 13l-7 8 M12 13l7 8 M12 13v9\"/>","set":"<path d=\"M3 3h7v7H3Z M14 3h7v7h-7Z M3 14h7v7H3Z M14 14h7v7h-7Z\"/>","settings":"<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 1v3 M12 20v3 M1 12h3 M20 12h3 M4 4l2 2 M18 18l2 2 M4 20l2-2 M18 6l2-2\"/>","signal":"<path d=\"M5 19V16M10 19V12M15 19V8M20 19V4\"/>","silence":"<path d=\"M9 4h6v10H9Z M5 10v4a7 7 0 0 0 14 0v-4 M12 21v2 M2 2l20 20\"/>","skill-aegis-absolute-wall":"<path d=\"M4 3v18 M20 3v18 M4 6h16 M4 12h16 M4 18h16 M9 6v6 M15 12v6\"/>","skill-aegis-intercept-field":"<path d=\"M12 2 21 6v7l-9 9-9-9V6Z M7 11l4 4 6-7\"/>","skill-aria-needle-storm":"<path d=\"M19 5 5 12l14 7 M6 12h13\"/>","skill-aria-terminal-vector":"<path d=\"M3 8h18v8H3z M7 9l-3 6 M13 9l-4 6 M19 9l-4 6\"/>","skill-echo-clocksplice":"<path d=\"M2 5l8 7-8 7 M12 5l8 7-8 7\"/>","skill-echo-overclock":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>","skill-hex-black-signal":"<path d=\"M12 2 22 12 12 22 2 12Z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","skill-hex-contagion":"<path d=\"M12 1v5 M12 18v5 M1 12h5 M18 12h5 M4 4l4 4 M16 16l4 4 M4 20l4-4 M16 8l4-4\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>","skill-mira-counterdrive":"<path d=\"M2 6h8 M2 12h12 M2 18h8 M13 3l9 9-9 9\"/>","skill-mira-gravity-cage":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>","skill-nyra-reconstruct":"<path d=\"M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z\"/>","skill-nyra-white-noise":"<path d=\"M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z\"/>","skill-rook-crash-pulse":"<path d=\"M12 21 2 5Q12-1 22 5Z\"/>","skill-rook-system-seizure":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>","skill-sol-dead-horizon":"<path d=\"M2 8h20 M2 16h20 M5 12h14 M17 5l5 7-5 7\"/>","skill-sol-zero-line":"<path d=\"M3 9h10V5l8 7-8 7v-4H3\"/>","skirmisher":"<path d=\"M5 6L11 12L5 18M12 6L18 12L12 18\"/>","slow":"<path d=\"M3 7l6 5-6 5 M10 7l6 5-6 5 M21 3v18\"/>","striker":"<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 1v3 M12 20v3 M1 12h3 M20 12h3 M4 4l2 2 M18 18l2 2 M4 20l2-2 M18 6l2-2\"/>","studio":"<path d=\"M5 20 3 15 15 3 21 9 9 21Z M12 6l6 6 M3 15l6 6\"/>","support":"<path d=\"M3 12H7L9.5 6L14 18L16 12H21\"/>","surrender":"<path d=\"M6 21V4M6 4H18L15 8.5L18 13H6\"/>","target":"<circle cx=\"12\" cy=\"12\" r=\"6\"/><path d=\"M12 1v7 M12 16v7 M1 12h7 M16 12h7\"/>","team":"<circle cx=\"8\" cy=\"7\" r=\"3\"/><circle cx=\"17\" cy=\"9\" r=\"2\"/><path d=\"M2 21v-4a6 6 0 0 1 12 0v4 M16 15h2a4 4 0 0 1 4 4v2\"/>","training":"<circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M12 1v4 M12 19v4 M1 12h4 M19 12h4\"/>","volume":"<path d=\"M3 9h5l6-6v18l-6-6H3Z M18 7a8 8 0 0 1 0 10\"/>","wall":"<path d=\"M4 3v18 M20 3v18 M4 6h16 M4 12h16 M4 18h16 M9 6v6 M15 12v6\"/>","warning":"<path d=\"M12 2 23 21H1Z M12 8v6 M12 17v1\"/>","weapon":"<path d=\"M4 20L16 8M13 4H20V11M7 13L11 17\"/>","windup":"<path d=\"M6 2h12 M6 22h12 M7 2v5l10 10v5 M17 2v5L7 17v5\"/>","zone":"<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>","plus":"<path d=\"M12 4v16 M4 12h16\"/>","silenced":"<path d=\"M9 4h6v10H9Z M5 10v4a7 7 0 0 0 14 0v-4 M12 21v2 M2 2l20 20\"/>","rooted":"<path d=\"M12 2v11 M5 7l7 6 7-6 M12 13l-7 8 M12 13l7 8 M12 13v9\"/>","slowed":"<path d=\"M3 7l6 5-6 5 M10 7l6 5-6 5 M21 3v18\"/>","replay":"<path d=\"M9 5v14l11-7Z M3 5v14\"/>","cancel":"<path d=\"M5 5l14 14 M19 5 5 19\"/>","chevron-right":"<path d=\"M8 4l8 8-8 8\"/>","rift":"<path d=\"M12 2 20 7 18 18 12 22 4 17 6 6Z M13 5 9 11 15 13 11 19\"/>"};
  var MARK = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"64 245 513 259\" width=\"513\" height=\"259\"> <g transform=\"translate(-2.5 0)\" fill=\"#ff40a0\" fill-opacity=\".55\"> <g> <g> <path d=\"M172.445 491.288 L210.995 421.197 L210.995 428.692 Z\"/> <path d=\"M231.395 401.288 L231.395 364.8 L249.539 364.8 C250.183 364.8 250.81 364.826 251.421 364.877 L251.421 364.877 L248.69 369.843 C248.589 369.841 248.488 369.84 248.387 369.84 L237.227 369.84 L237.227 386.4 L239.583 386.4 Z\"/> <path d=\"M510.899 410.216 L510.899 359.816 L516.731 359.816 L516.731 375.512 L516.731 386.384 L516.875 386.384 L525.083 377.672 L541.859 359.816 L548.915 359.816 L529.979 379.976 L550.859 410.288 L543.947 410.216 L525.659 384.152 L516.731 393.44 L516.731 410.216 Z\"/> <path d=\"M432.707 410.216 L454.163 359.816 L460.571 359.816 L482.027 410.216 L475.763 410.216 L470.147 396.824 L444.587 396.824 L438.971 410.216 Z M457.259 366.512 C457.187 366.584 454.235 373.712 452.363 378.248 L446.819 391.496 L467.915 391.496 L462.371 378.32 C460.427 373.712 457.475 366.584 457.403 366.512 Z\"/> <path d=\"M371.795 410.216 L371.795 359.816 L405.707 359.816 L405.707 365.288 L377.627 365.288 L377.627 381.128 L399.515 381.128 L399.515 386.6 L377.627 386.6 L377.627 404.744 L405.851 404.744 L405.851 410.216 Z\"/> <path d=\"M306.851 410.216 L306.851 359.816 L322.259 359.816 C334.067 359.816 341.051 365.648 341.051 375.512 C341.051 383.288 336.659 387.824 329.531 389.336 L341.987 410.216 L334.931 410.216 L323.483 390.416 C322.403 390.488 319.955 390.488 318.875 390.488 L312.683 390.488 L312.683 410.216 Z M312.683 365.216 L312.683 385.592 L322.835 385.592 C330.179 385.592 335.075 383 335.075 375.728 C335.075 368.6 330.323 365.216 322.475 365.216 Z\"/> <path d=\"M262.98 365.899 L265.743 361.112 C270.686 363.107 273.587 367.224 273.587 372.2 C273.587 378.824 269.339 382.208 265.667 383.072 L265.667 383.288 C270.419 384.08 277.115 387.608 277.115 396.176 C277.115 404.672 270.995 410.216 259.907 410.216 L240.395 410.216 L240.395 403.799 L246.227 394.329 L246.227 405.176 L259.619 405.176 C266.387 405.176 270.995 402.08 270.995 395.888 C270.995 389.552 265.667 386.024 259.475 386.024 L251.341 386.024 L251.729 385.395 L254.025 381.416 L257.963 381.416 C263.579 381.416 267.683 378.536 267.683 373.064 C267.683 369.768 266.003 367.233 262.98 365.899 Z\"/> <path d=\"M228.29 389.752 L231.021 384.786 C232.985 384.95 234.768 385.37 236.344 386.006 L233.581 390.793 L224.626 406.309 L222.329 410.288 L221.942 410.917 L216.827 419.222 L210.995 428.692 L210.995 421.197 L219.184 406.309 Z\"/> <path d=\"M274.439 322.579 L307.445 279.288 L256.865 366.928 L250.047 366.928 Z\"/> <path d=\"M240.704 383.965 L253.726 360.288 L260.395 360.288 L246.026 385.184 C244.45 384.549 242.667 384.128 240.704 383.965 Z\"/> <path d=\"M271.302 322.76 L274.311 317.288 L281.129 317.288 L298.445 317.288 L298.445 322.76 L277.971 322.76 Z\"/> <g> <path d=\"M267.773 320.4 L267.773 270 L273.605 270 L273.605 314.928 L276.039 314.928 L273.03 320.4 Z\"/> <path d=\"M229.253 320.4 L229.253 270 L235.085 270 L235.085 320.4 Z\"/> <path d=\"M164.453 320.4 L164.453 270 L198.365 270 L198.365 275.472 L170.285 275.472 L170.285 291.312 L192.173 291.312 L192.173 296.784 L170.285 296.784 L170.285 314.928 L198.509 314.928 L198.509 320.4 Z\"/> <path d=\"M109.157 320.4 L89.141 270 L95.693 270 L105.989 296.424 C110.093 306.936 112.613 313.632 112.685 313.848 L112.829 313.848 C112.901 313.632 115.349 307.008 119.381 296.784 L129.821 270 L136.157 270 L116.141 320.4 Z\"/> </g> </g> </g> </g> <g transform=\"translate(2.5 0)\" fill=\"#1dd9a0\" fill-opacity=\".55\"> <g> <g> <path d=\"M172.445 491.288 L210.995 421.197 L210.995 428.692 Z\"/> <path d=\"M231.395 401.288 L231.395 364.8 L249.539 364.8 C250.183 364.8 250.81 364.826 251.421 364.877 L251.421 364.877 L248.69 369.843 C248.589 369.841 248.488 369.84 248.387 369.84 L237.227 369.84 L237.227 386.4 L239.583 386.4 Z\"/> <path d=\"M510.899 410.216 L510.899 359.816 L516.731 359.816 L516.731 375.512 L516.731 386.384 L516.875 386.384 L525.083 377.672 L541.859 359.816 L548.915 359.816 L529.979 379.976 L550.859 410.288 L543.947 410.216 L525.659 384.152 L516.731 393.44 L516.731 410.216 Z\"/> <path d=\"M432.707 410.216 L454.163 359.816 L460.571 359.816 L482.027 410.216 L475.763 410.216 L470.147 396.824 L444.587 396.824 L438.971 410.216 Z M457.259 366.512 C457.187 366.584 454.235 373.712 452.363 378.248 L446.819 391.496 L467.915 391.496 L462.371 378.32 C460.427 373.712 457.475 366.584 457.403 366.512 Z\"/> <path d=\"M371.795 410.216 L371.795 359.816 L405.707 359.816 L405.707 365.288 L377.627 365.288 L377.627 381.128 L399.515 381.128 L399.515 386.6 L377.627 386.6 L377.627 404.744 L405.851 404.744 L405.851 410.216 Z\"/> <path d=\"M306.851 410.216 L306.851 359.816 L322.259 359.816 C334.067 359.816 341.051 365.648 341.051 375.512 C341.051 383.288 336.659 387.824 329.531 389.336 L341.987 410.216 L334.931 410.216 L323.483 390.416 C322.403 390.488 319.955 390.488 318.875 390.488 L312.683 390.488 L312.683 410.216 Z M312.683 365.216 L312.683 385.592 L322.835 385.592 C330.179 385.592 335.075 383 335.075 375.728 C335.075 368.6 330.323 365.216 322.475 365.216 Z\"/> <path d=\"M262.98 365.899 L265.743 361.112 C270.686 363.107 273.587 367.224 273.587 372.2 C273.587 378.824 269.339 382.208 265.667 383.072 L265.667 383.288 C270.419 384.08 277.115 387.608 277.115 396.176 C277.115 404.672 270.995 410.216 259.907 410.216 L240.395 410.216 L240.395 403.799 L246.227 394.329 L246.227 405.176 L259.619 405.176 C266.387 405.176 270.995 402.08 270.995 395.888 C270.995 389.552 265.667 386.024 259.475 386.024 L251.341 386.024 L251.729 385.395 L254.025 381.416 L257.963 381.416 C263.579 381.416 267.683 378.536 267.683 373.064 C267.683 369.768 266.003 367.233 262.98 365.899 Z\"/> <path d=\"M228.29 389.752 L231.021 384.786 C232.985 384.95 234.768 385.37 236.344 386.006 L233.581 390.793 L224.626 406.309 L222.329 410.288 L221.942 410.917 L216.827 419.222 L210.995 428.692 L210.995 421.197 L219.184 406.309 Z\"/> <path d=\"M274.439 322.579 L307.445 279.288 L256.865 366.928 L250.047 366.928 Z\"/> <path d=\"M240.704 383.965 L253.726 360.288 L260.395 360.288 L246.026 385.184 C244.45 384.549 242.667 384.128 240.704 383.965 Z\"/> <path d=\"M271.302 322.76 L274.311 317.288 L281.129 317.288 L298.445 317.288 L298.445 322.76 L277.971 322.76 Z\"/> <g> <path d=\"M267.773 320.4 L267.773 270 L273.605 270 L273.605 314.928 L276.039 314.928 L273.03 320.4 Z\"/> <path d=\"M229.253 320.4 L229.253 270 L235.085 270 L235.085 320.4 Z\"/> <path d=\"M164.453 320.4 L164.453 270 L198.365 270 L198.365 275.472 L170.285 275.472 L170.285 291.312 L192.173 291.312 L192.173 296.784 L170.285 296.784 L170.285 314.928 L198.509 314.928 L198.509 320.4 Z\"/> <path d=\"M109.157 320.4 L89.141 270 L95.693 270 L105.989 296.424 C110.093 306.936 112.613 313.632 112.685 313.848 L112.829 313.848 C112.901 313.632 115.349 307.008 119.381 296.784 L129.821 270 L136.157 270 L116.141 320.4 Z\"/> </g> </g> </g> </g> <g fill=\"#faeef4\"> <g> <g> <path d=\"M172.445 491.288 L210.995 421.197 L210.995 428.692 Z\"/> <path d=\"M231.395 401.288 L231.395 364.8 L249.539 364.8 C250.183 364.8 250.81 364.826 251.421 364.877 L251.421 364.877 L248.69 369.843 C248.589 369.841 248.488 369.84 248.387 369.84 L237.227 369.84 L237.227 386.4 L239.583 386.4 Z\"/> <path d=\"M510.899 410.216 L510.899 359.816 L516.731 359.816 L516.731 375.512 L516.731 386.384 L516.875 386.384 L525.083 377.672 L541.859 359.816 L548.915 359.816 L529.979 379.976 L550.859 410.288 L543.947 410.216 L525.659 384.152 L516.731 393.44 L516.731 410.216 Z\"/> <path d=\"M432.707 410.216 L454.163 359.816 L460.571 359.816 L482.027 410.216 L475.763 410.216 L470.147 396.824 L444.587 396.824 L438.971 410.216 Z M457.259 366.512 C457.187 366.584 454.235 373.712 452.363 378.248 L446.819 391.496 L467.915 391.496 L462.371 378.32 C460.427 373.712 457.475 366.584 457.403 366.512 Z\"/> <path d=\"M371.795 410.216 L371.795 359.816 L405.707 359.816 L405.707 365.288 L377.627 365.288 L377.627 381.128 L399.515 381.128 L399.515 386.6 L377.627 386.6 L377.627 404.744 L405.851 404.744 L405.851 410.216 Z\"/> <path d=\"M306.851 410.216 L306.851 359.816 L322.259 359.816 C334.067 359.816 341.051 365.648 341.051 375.512 C341.051 383.288 336.659 387.824 329.531 389.336 L341.987 410.216 L334.931 410.216 L323.483 390.416 C322.403 390.488 319.955 390.488 318.875 390.488 L312.683 390.488 L312.683 410.216 Z M312.683 365.216 L312.683 385.592 L322.835 385.592 C330.179 385.592 335.075 383 335.075 375.728 C335.075 368.6 330.323 365.216 322.475 365.216 Z\"/> <path d=\"M262.98 365.899 L265.743 361.112 C270.686 363.107 273.587 367.224 273.587 372.2 C273.587 378.824 269.339 382.208 265.667 383.072 L265.667 383.288 C270.419 384.08 277.115 387.608 277.115 396.176 C277.115 404.672 270.995 410.216 259.907 410.216 L240.395 410.216 L240.395 403.799 L246.227 394.329 L246.227 405.176 L259.619 405.176 C266.387 405.176 270.995 402.08 270.995 395.888 C270.995 389.552 265.667 386.024 259.475 386.024 L251.341 386.024 L251.729 385.395 L254.025 381.416 L257.963 381.416 C263.579 381.416 267.683 378.536 267.683 373.064 C267.683 369.768 266.003 367.233 262.98 365.899 Z\"/> <path d=\"M228.29 389.752 L231.021 384.786 C232.985 384.95 234.768 385.37 236.344 386.006 L233.581 390.793 L224.626 406.309 L222.329 410.288 L221.942 410.917 L216.827 419.222 L210.995 428.692 L210.995 421.197 L219.184 406.309 Z\"/> <path d=\"M274.439 322.579 L307.445 279.288 L256.865 366.928 L250.047 366.928 Z\"/> <path d=\"M240.704 383.965 L253.726 360.288 L260.395 360.288 L246.026 385.184 C244.45 384.549 242.667 384.128 240.704 383.965 Z\"/> <path d=\"M271.302 322.76 L274.311 317.288 L281.129 317.288 L298.445 317.288 L298.445 322.76 L277.971 322.76 Z\"/> <g> <path d=\"M267.773 320.4 L267.773 270 L273.605 270 L273.605 314.928 L276.039 314.928 L273.03 320.4 Z\"/> <path d=\"M229.253 320.4 L229.253 270 L235.085 270 L235.085 320.4 Z\"/> <path d=\"M164.453 320.4 L164.453 270 L198.365 270 L198.365 275.472 L170.285 275.472 L170.285 291.312 L192.173 291.312 L192.173 296.784 L170.285 296.784 L170.285 314.928 L198.509 314.928 L198.509 320.4 Z\"/> <path d=\"M109.157 320.4 L89.141 270 L95.693 270 L105.989 296.424 C110.093 306.936 112.613 313.632 112.685 313.848 L112.829 313.848 C112.901 313.632 115.349 307.008 119.381 296.784 L129.821 270 L136.157 270 L116.141 320.4 Z\"/> </g> </g> </g> </g> </svg>";
/* Generated by Tools~/motion.py. */
var MOTION = {"stagger": 80, "maxDealDelay": 400, "timings": {"rebuild": 180, "reveal": 2000}, "recipes": {"viewIn": {"milliseconds": 320, "y": 12}, "viewOut": {"milliseconds": 180, "y": -8}, "deal": {"milliseconds": 420, "y": 24, "rotation": -6, "scale": 0.96}, "drawerIn": {"milliseconds": 320, "y": 80}, "drawerOut": {"milliseconds": 220, "y": 80}, "hudTop": {"milliseconds": 320, "y": -24}, "hudCard": {"milliseconds": 360, "y": 32, "rotation": -2, "scale": 0.98}, "overlayIn": {"milliseconds": 220, "y": 12, "scale": 0.97}, "overlayOut": {"milliseconds": 150, "y": 6, "scale": 0.98}, "popoverIn": {"milliseconds": 140, "y": 4, "scale": 0.97}, "popoverOut": {"milliseconds": 90, "scale": 0.98}, "drawerFit": {"milliseconds": 180}, "labelMerge": {"milliseconds": 180, "scale": 1.12}, "labelSplit": {"milliseconds": 180, "scale": 0.9}, "dragLift": {"milliseconds": 120, "y": -4, "scale": 1.05}, "dropSettle": {"milliseconds": 220}, "pressSink": {"milliseconds": 100, "y": 1, "scale": 0.92}, "fallen": {"milliseconds": 420, "y": 6, "scale": 0.97}}};

/* Generated by Tools~/fluid.py from Tokens~/fluid.json and tokens.json. Do not edit. */
var FLUID_STEPS = [320, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 460, 500, 540, 600];


  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function clamp01(n) { n = Number(n); return isNaN(n) ? 0 : Math.max(0, Math.min(1, n)); }
  function pct(n) { return (clamp01(n) * 100) + '%'; }
  function kebab(n) {
    n = String(n == null ? '' : n); var b = '';
    for (var i = 0; i < n.length; i++) {
      var c = n[i];
      if (c >= 'A' && c <= 'Z' && i > 0 && n[i - 1] !== '-') b += '-';
      b += (c === ' ' || c === '_') ? '-' : c.toLowerCase();
    }
    return b;
  }
  function upper(s) { return String(s == null ? '' : s).toUpperCase(); }
  function num(v) { return Number(v || 0).toLocaleString('en-US'); }
  function trim1(v) { return String(Math.round(v * 10) / 10); }
  function compact(v) { return v >= 1e9 ? trim1(v / 1e9) + 'B' : v >= 1e6 ? trim1(v / 1e6) + 'M' : v >= 1e4 ? trim1(v / 1e3) + 'K' : num(v); }
  function seconds(s) {
    s = Number(s || 0);
    if (s < 60) return (s < 10 ? s.toFixed(1) : trim1(s)) + 's';
    var m = Math.floor(s / 60), r = Math.floor(s - m * 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }
  function pad2(n) { n = Math.floor(Number(n || 0)); return (n < 10 && n >= 0 ? '0' : '') + n; }
  // Ui.State: block--{kebab(state)} for the one active value.
  function st(block, value) { return block + '--' + kebab(value); }
  function L(cls, text, style) { return h('div', { className: cx('vb-l', cls), style: style }, text); }
  function show(on) { return on ? null : { display: 'none' }; }
  function clickable(fn) {
    return {
      tabIndex: 0, role: 'button', onClick: fn,
      onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (fn) fn(e); } }
    };
  }

  /* ── VbShape: the cut-shape painter (VbShape.cs Paint) drawn as SVG from --vb-* properties ── */
  var DIAG = 0.4142, shapes = typeof Set === 'function' ? new Set() : null, queued = false, installed = false;
  function parseColor(s) {
    s = (s || '').trim(); var m;
    if (!s || s === 'transparent') return [0, 0, 0, 0];
    if (s[0] === '#') {
      var x = s.slice(1); if (x.length <= 4) x = x.split('').map(function (c) { return c + c; }).join('');
      return [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2, 4), 16), parseInt(x.slice(4, 6), 16), x.length > 6 ? parseInt(x.slice(6, 8), 16) / 255 : 1];
    }
    if ((m = /rgba?\(([^)]*)\)/.exec(s))) {
      var p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
      return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    }
    return [0, 0, 0, 0];
  }
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (a == null ? c[3] : a) + ')'; }
  // VbShape.Outline: --vb-cut-side 0 cuts the top-left and bottom-right corners, 1 (Left) the top-left and bottom-left, 2 (Right) the top-right and bottom-right.
  function outline(w, hgt, cut, b, side) {
    if (cut <= 0) return [[b, b], [w - b, b], [w - b, hgt - b], [b, hgt - b]];
    var d = cut + b * DIAG;
    if (side === 1) return [[d, b], [w - b, b], [w - b, hgt - b], [d, hgt - b], [b, hgt - d], [b, d]];
    if (side === 2) return [[b, b], [w - d, b], [w - b, d], [w - b, hgt - d], [w - d, hgt - b], [b, hgt - b]];
    return [[d, b], [w - b, b], [w - b, hgt - d], [w - d, hgt - b], [b, hgt - b], [b, d]];
  }
  function poly(pts) { return 'M' + pts.map(function (p) { return p[0].toFixed(2) + ' ' + p[1].toFixed(2); }).join('L') + 'Z'; }
  function rect(x0, y0, x1, y1, fill) { return '<rect x="' + x0 + '" y="' + y0 + '" width="' + Math.max(0, x1 - x0) + '" height="' + Math.max(0, y1 - y0) + '" fill="' + fill + '"/>'; }
  function gradient(id, w, hgt, deg, from, to) {
    var r = deg * Math.PI / 180, dx = Math.cos(r), dy = Math.sin(r);
    var pr = [0, w * dx, hgt * dy, w * dx + hgt * dy], min = Math.min.apply(null, pr), max = Math.max.apply(null, pr);
    if (max - min < 0.001) max = min + 0.001;
    return '<linearGradient id="' + id + '" gradientUnits="userSpaceOnUse" x1="' + dx * min + '" y1="' + dy * min + '" x2="' + dx * max + '" y2="' + dy * max + '">' +
      '<stop offset="0" stop-color="' + rgba(from) + '"/><stop offset="1" stop-color="' + rgba(to) + '"/></linearGradient>';
  }
  var gid = 0;
  function paint(el) {
    var svg = el.firstElementChild;
    if (!svg || svg.getAttribute('data-vb-paint') == null) return;
    var w = el.offsetWidth, hgt = el.offsetHeight;
    if (w <= 0 || hgt <= 0) { svg.innerHTML = ''; return; }
    var cs = getComputedStyle(el);
    function n(k, d) { var v = parseFloat(cs.getPropertyValue('--vb-' + k)); return isNaN(v) ? d : v; }
    function c(k) { return parseColor(cs.getPropertyValue('--vb-' + k)); }
    var cut = Math.min(n('cut', 10), w / 3, hgt / 3), side = n('cut-side', 0), bw = n('bw', 1), dir = n('fill-dir', 0), dash = n('dash', 0) > 0.5, bl = n('bracket-len', 8);
    var fill = c('fill'), fillTo = c('fill-to'), edge = c('edge'), edgeTo = c('edge-to'), bracket = c('bracket'), glow = c('glow');
    var id = svg.__vbId || (svg.__vbId = 'vb-g' + (++gid)), defs = '', out = '';
    function paintOf(from, to, key) {
      if (to[3] <= 0 || (to[0] === from[0] && to[1] === from[1] && to[2] === from[2] && to[3] === from[3])) return rgba(from);
      defs += gradient(id + key, w, hgt, dir, from, to); return 'url(#' + id + key + ')';
    }
    if (glow[3] > 0) for (var i = 3; i >= 1; i--) {
      out += '<path fill-rule="evenodd" fill="' + rgba(glow, glow[3] * (0.55 - i * 0.15)) + '" d="' + poly(outline(w, hgt, cut, -i * 2.5, side)) + poly(outline(w, hgt, cut, -(i - 1) * 2.5, side)) + '"/>';
    }
    if (dash) {
      if (fill[3] > 0) out += rect(0, 0, w, hgt, rgba(fill));
      if (edge[3] > 0) {
        var t = Math.max(1, bw), e, x, y, col = rgba(edge);
        for (x = 0; x < w; x += 7) { e = Math.min(w, x + 4); out += rect(x, 0, e, t, col) + rect(x, hgt - t, e, hgt, col); }
        for (y = 0; y < hgt; y += 7) { e = Math.min(hgt, y + 4); out += rect(0, y, t, e, col) + rect(w - t, y, w, e, col); }
      }
    } else {
      if (fill[3] > 0 || fillTo[3] > 0) out += '<path fill="' + paintOf(fill[3] > 0 ? fill : fillTo, fillTo, 'f') + '" d="' + poly(outline(w, hgt, cut, 0, side)) + '"/>';
      if (bw > 0 && (edge[3] > 0 || edgeTo[3] > 0)) out += '<path fill-rule="evenodd" fill="' + paintOf(edge[3] > 0 ? edge : edgeTo, edgeTo, 'e') + '" d="' + poly(outline(w, hgt, cut, 0, side)) + poly(outline(w, hgt, cut, bw, side)) + '"/>';
    }
    if (bracket[3] > 0) {
      var bc = rgba(bracket);
      // L marks sit on the square corners: top-right and bottom-left, or both on the side that is not cut.
      out += side !== 2 ? rect(w - bl, 0, w, 2, bc) + rect(w - 2, 0, w, bl, bc) : rect(0, 0, bl, 2, bc) + rect(0, 0, 2, bl, bc);
      out += side === 1 ? rect(w - bl, hgt - 2, w, hgt, bc) + rect(w - 2, hgt - bl, w, hgt, bc) : rect(0, hgt - 2, bl, hgt, bc) + rect(0, hgt - bl, 2, hgt, bc);
    }
    svg.setAttribute('viewBox', '-8 -8 ' + (w + 16) + ' ' + (hgt + 16));
    svg.innerHTML = (defs ? '<defs>' + defs + '</defs>' : '') + out;
  }
  function repaintAll() { queued = false; if (shapes) shapes.forEach(paint); }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(repaintAll); } }
  function install() {
    if (installed) return; installed = true;
    ['pointerover', 'pointerout', 'pointerdown', 'pointerup', 'focusin', 'focusout', 'transitionend'].forEach(function (t) { document.addEventListener(t, schedule, true); });
    window.addEventListener('resize', schedule);
    if (window.MutationObserver) new MutationObserver(schedule).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'], subtree: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  }
  var ro = window.ResizeObserver ? new ResizeObserver(schedule) : null;
  function useShape(ref) {
    useIsoLayout(function () {
      var el = ref.current; install(); shapes.add(el); if (ro) ro.observe(el); paint(el);
      return function () { shapes.delete(el); if (ro) ro.unobserve(el); };
    }, []);
    useIsoLayout(function () { schedule(); });
  }
  /** Any element painted as a cut shape (VbShape.Attach): first child is the paint layer. */
  var Shape = R.forwardRef(function (p, fwd) {
    var ref = R.useRef(null);
    useShape(ref);
    var props = Object.assign({}, p, {
      ref: function (el) { ref.current = el; if (typeof fwd === 'function') fwd(el); else if (fwd) fwd.current = el; },
      className: cx('vb-shape', p.className)
    });
    delete props.as;
    return h(p.as || 'div', props, h('svg', { className: 'vb-paint', 'data-vb-paint': '', 'aria-hidden': true }), p.children);
  });

  /* ── VbFluid: every .vb-root carries vb-fluid-<step> for its width (Fluid.uss overrides the type, spacing and layout tokens) ── */
  function fluidStep(width) { var at = 0; for (var i = 0; i < FLUID_STEPS.length; i++) if (width >= FLUID_STEPS[i]) at = i; return FLUID_STEPS[at]; }
  /** VbFluid.Apply: the step class for the root's width, the old one off; true when it changed. */
  function fluidApply(el) {
    var width = el && el.offsetWidth; if (!width) return false;
    var next = 'vb-fluid-' + fluidStep(width);
    if (el.__vbFluid === next && el.classList.contains(next)) return false;
    if (el.__vbFluid) el.classList.remove(el.__vbFluid);
    el.__vbFluid = next; el.classList.add(next); return true;
  }
  var fluidSizes = window.ResizeObserver ? new ResizeObserver(function (list) { list.forEach(function (e) { fluidApply(e.target); }); }) : null;
  var fluidClasses = window.MutationObserver ? new MutationObserver(function (list) { list.forEach(function (m) { fluidApply(m.target); }); }) : null;
  function fluidWatch(el) {
    if (el.__vbFluidWatched || el.classList.contains('vb-popover') || !fluidSizes) return;
    el.__vbFluidWatched = true; fluidSizes.observe(el); fluidClasses.observe(el, { attributes: true, attributeFilter: ['class'] }); fluidApply(el);
  }
  function fluidScan(node) {
    if (!node || node.nodeType !== 1) return;
    if (node.matches('.vb-root')) fluidWatch(node);
    Array.prototype.forEach.call(node.querySelectorAll('.vb-root'), fluidWatch);
  }
  if (typeof document !== 'undefined' && fluidSizes) {
    var fluidStart = function () {
      fluidScan(document.body);
      new MutationObserver(function (list) { list.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, fluidScan); }); }).observe(document.body, { childList: true, subtree: true });
    };
    if (document.body) fluidStart(); else document.addEventListener('DOMContentLoaded', fluidStart);
  }
  /** VbFluid.Copy: the step class an anchor works under, for a layer that lives outside its board. */
  function fluidOf(el) { var root = el && el.closest('.vb-root'); return root && root.__vbFluid || ''; }

  /* ── VbClipFill / VbClipImage (VbClip.cs): content painted inside the cut outline of the nearest shape ── */
  function clipOutline(w, hgt, cut, side) {
    if (cut <= 0) return [[0, 0], [w, 0], [w, hgt], [0, hgt]];
    if (side === 1) return [[cut, 0], [w, 0], [w, hgt], [cut, hgt], [0, hgt - cut], [0, cut]];
    if (side === 2) return [[0, 0], [w - cut, 0], [w, cut], [w, hgt - cut], [w - cut, hgt], [0, hgt]];
    return [[cut, 0], [w, 0], [w, hgt - cut], [w - cut, hgt], [0, hgt], [0, cut]];
  }
  function clipSide(a, b, p) { return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]); }
  function clipCross(a, b, p, q) { var sp = clipSide(a, b, p), t = sp / (sp - clipSide(a, b, q)); return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]; }
  /** VbClip.Intersect: Sutherland-Hodgman of a clockwise subject against a convex clockwise outline. */
  function clipIntersect(subject, shape) {
    var out = subject;
    for (var i = 0; i < shape.length && out.length; i++) {
      var a = shape[i], b = shape[(i + 1) % shape.length], input = out; out = [];
      for (var j = 0; j < input.length; j++) {
        var p = input[j], q = input[(j + 1) % input.length], sp = clipSide(a, b, p), sq = clipSide(a, b, q);
        if (sp >= 0) { out.push(p); if (sq < 0) out.push(clipCross(a, b, p, q)); } else if (sq >= 0) out.push(clipCross(a, b, p, q));
      }
    }
    return out;
  }
  /** VbClip.Polygon: the element's box clipped to the outline of its shaped host, as a clip-path in the element's own space. */
  function clipUpdate(el) {
    var host = el && el.parentElement && el.parentElement.closest('.vb-shape');
    if (!host) { if (el && el.style.clipPath) el.style.clipPath = ''; return; }
    var w = host.offsetWidth, hgt = host.offsetHeight, hr = host.getBoundingClientRect(), er = el.getBoundingClientRect();
    if (!(w > 0 && hgt > 0 && er.width > 0 && er.height > 0)) return;
    var k = hr.width / w || 1, cs = getComputedStyle(host), cut = parseFloat(cs.getPropertyValue('--vb-cut')), side = parseFloat(cs.getPropertyValue('--vb-cut-side'));
    cut = Math.min(isNaN(cut) ? 10 : cut, w / 3, hgt / 3);
    var x = (er.left - hr.left) / k, y = (er.top - hr.top) / k, ew = er.width / k, eh = er.height / k;
    var poly = clipIntersect([[x, y], [x + ew, y], [x + ew, y + eh], [x, y + eh]], clipOutline(w, hgt, cut, isNaN(side) ? 0 : side));
    var css = poly.length < 3 ? 'polygon(0 0, 0 0, 0 0)' : 'polygon(' + poly.map(function (pt) { return (pt[0] - x).toFixed(2) + 'px ' + (pt[1] - y).toFixed(2) + 'px'; }).join(',') + ')';
    if (el.style.clipPath !== css) el.style.clipPath = css;
  }
  function useClip(ref) {
    useIsoLayout(function () {
      var el = ref.current, host = el && el.parentElement && el.parentElement.closest('.vb-shape');
      if (!el || !window.ResizeObserver) return;
      var obs = new ResizeObserver(function () { clipUpdate(el); }); obs.observe(el); if (host) obs.observe(host);
      return function () { obs.disconnect(); };
    }, []);
    useIsoLayout(function () { clipUpdate(ref.current); });
  }
  /** A solid block that follows the cut of the shape it sits in; its colour is --vb-fill. */
  function ClipFill(p) { var ref = R.useRef(null); useClip(ref); return h('div', { ref: ref, className: cx('vb-clip-fill', p.className), style: p.style }); }
  /** A picture scaled to fit its box and clipped to the host's chamfers (Ui.Image on a VbClipImage). */
  function ClipImage(p) { var ref = R.useRef(null); useClip(ref); return h('div', { ref: ref, className: cx('vb-clip-image', p.className), style: Object.assign({}, p.url ? { backgroundImage: 'url("' + p.url + '")' } : null, p.style) }); }

  /* ── VbEdgeFx (VbEdgeFx.cs): the animated border. Activate runs two heads clockwise round the cut outline; Damage flashes red.
        It paints one overlay (vb-edgefx) with an SVG on the host that is added when it plays and removed when it ends. ── */
  var EDGE_MS = { activate: 520, damage: 560, calm: 100 }, EDGE_SEGMENTS = 14, edgeTracks = typeof WeakMap === 'function' ? new WeakMap() : null;
  function edgeOutline(w, hgt, cut, b, side) {
    if (cut <= 0) return [[b, b], [w - b, b], [w - b, hgt - b], [b, hgt - b]];
    var d = cut + b * DIAG;
    if (side === 1) return [[d, b], [w - b, b], [w - b, hgt - b], [d, hgt - b], [b, hgt - d], [b, d]];
    if (side === 2) return [[b, b], [w - d, b], [w - b, d], [w - b, hgt - d], [w - d, hgt - b], [b, hgt - b]];
    return [[d, b], [w - b, b], [w - b, hgt - d], [w - d, hgt - b], [b, hgt - b], [b, d]];
  }
  function edgeSmooth(a, b, x) { x = clamp01((x - a) / (b - a)); return x * x * (3 - 2 * x); }
  function edgeEnd(t) {
    if (t.raf) cancelAnimationFrame(t.raf);
    t.raf = 0; if (t.layer && t.layer.parentNode) t.layer.parentNode.removeChild(t.layer);
    t.layer = null;
  }
  function edgeColours(el, t, kind, tone) {
    var cs = getComputedStyle(el);
    function c(k) { return parseColor(cs.getPropertyValue(k)); }
    if (tone) { t.a = t.b = tone; return; }
    if (kind === 'damage') { t.a = t.b = c('--enemy'); return; }
    var edge = c('--vb-edge'), edgeTo = c('--vb-edge-to'), glow = c('--vb-glow');
    var a = edge[3] > 0.05 ? edge : glow[3] > 0.05 ? glow : c('--ally'), b = edgeTo[3] > 0.05 ? edgeTo : a;
    t.a = [a[0], a[1], a[2], 1]; t.b = [b[0], b[1], b[2], 1];
  }
  function edgeStart(el, kind, strength, tone) {
    if (!el || !edgeTracks || !el.isConnected) return;
    var t = edgeTracks.get(el); if (!t) { t = { host: el }; edgeTracks.set(el, t); }
    if (t.layer && t.frame === performance.now() && t.kind === kind) return;
    t.kind = kind; t.strength = strength == null ? 1 : strength; t.began = performance.now(); t.frame = t.began; edgeColours(el, t, kind, tone);
    if (!t.layer) {
      t.layer = document.createElement('div'); t.layer.className = 'vb-edgefx'; t.layer.setAttribute('aria-hidden', 'true');
      t.layer.style.cssText = 'position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none';
      el.appendChild(t.layer);
    }
    function tick() {
      var host = t.host; if (!host.isConnected || !t.layer) { edgeEnd(t); return; }
      var w = host.offsetWidth, hgt = host.offsetHeight, cs = getComputedStyle(host);
      var calm = reducedMotion(host), flashless = !!host.closest('.vb-reduced-flashes, .vb-reduced-motion');
      var u = clamp01((performance.now() - t.began) / (calm ? EDGE_MS.calm : EDGE_MS[t.kind]));
      if (u >= 1) { edgeEnd(t); return; }
      if (w > 0 && hgt > 0) {
        var cut = parseFloat(cs.getPropertyValue('--vb-cut')), side = parseFloat(cs.getPropertyValue('--vb-cut-side'));
        t.layer.innerHTML = edgeSvg(t, w, hgt, Math.min(isNaN(cut) ? 10 : cut, w / 3, hgt / 3), isNaN(side) ? 0 : side, u, calm, flashless);
      }
      t.raf = requestAnimationFrame(tick);
    }
    if (t.raf) cancelAnimationFrame(t.raf);
    tick();
  }
  function edgeSvg(t, w, hgt, cut, side, u, calm, flashless) {
    var pts = edgeOutline(w, hgt, cut, 0.75, side), n = pts.length, lens = [], per = 0, i;
    for (i = 0; i < n; i++) { var q = pts[(i + 1) % n]; lens.push(Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1])); per += lens[i]; }
    var d = poly(pts), out = '', fade = 1 - edgeSmooth(0.72, 1, u);
    function col(c, a) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + clamp01(a).toFixed(3) + ')'; }
    function ring(c, alpha, width) { return alpha <= 0.003 ? '' : '<path d="' + d + '" fill="none" stroke="' + col(c, alpha) + '" stroke-width="' + width + '" stroke-linejoin="miter"/>'; }
    function run(c, s0, s1, alpha, width) {
      var len = s1 - s0; if (alpha <= 0.004 || len <= 0) return '';
      var off = ((s0 % per) + per) % per;
      return '<path d="' + d + '" fill="none" stroke="' + col(c, alpha) + '" stroke-width="' + width + '" stroke-dasharray="' + len.toFixed(2) + ' ' + Math.max(0.01, per - len).toFixed(2) + '" stroke-dashoffset="' + (-off).toFixed(2) + '"/>';
    }
    if (t.kind === 'damage') {
      var strength = 0.55 + 0.45 * t.strength;
      if (calm) out = ring(t.a, 0.85 * strength * (1 - u), 2);
      else {
        var level = clamp01(u / 0.1) * Math.pow(1 - edgeSmooth(0.08, 1, u), 1.4), edge = flashless ? 0.55 : 1;
        if (!flashless) out += '<path d="' + d + '" fill="' + col(t.a, 0.34 * strength * level) + '"/>';
        for (var r = 3; r >= 1; r--) out += ring(t.a, 0.16 * strength * level * edge / r, 1.5 + r * 2.4);
        out += ring(t.a, 0.95 * strength * level * edge, 1.6);
      }
    } else if (calm) out = ring(t.a, 0.9 * (1 - u), 1.5);
    else {
      var half = per * 0.5, head = (1 - Math.pow(1 - u, 3)) * half, tail = half * 0.5;
      out += ring([(t.a[0] + t.b[0]) / 2, (t.a[1] + t.b[1]) / 2, (t.a[2] + t.b[2]) / 2], 0.30 * fade * (1 - u * 0.5), 1);
      for (var hd = 0; hd < 2; hd++) {
        var at = head + hd * half, colour = hd === 0 ? t.a : t.b;
        for (i = 0; i < EDGE_SEGMENTS; i++) {
          var k0 = i / EDGE_SEGMENTS, k1 = (i + 1) / EDGE_SEGMENTS, alpha = Math.pow(1 - k0, 1.7) * fade;
          out += run(colour, at - tail * k1, at - tail * k0, alpha * 0.22, 5) + run(colour, at - tail * k1, at - tail * k0, alpha * 0.95, 1.6);
        }
      }
    }
    return '<svg width="' + w + '" height="' + hgt + '" viewBox="0 0 ' + w + ' ' + hgt + '" style="position:absolute;left:0;top:0;overflow:visible" aria-hidden="true">' + out + '</svg>';
  }
  /** VbEdgeFx: Play (the pressed look), Damage (a unit card taking a hit), Cancel, Active. The host is any element painted by Shape. */
  var edgeFx = {
    play: function (el, tone) { edgeStart(el, 'activate', 1, tone); },
    damage: function (el, strength) { edgeStart(el, 'damage', clamp01(strength == null ? 1 : strength)); },
    cancel: function (el) { var t = edgeTracks && edgeTracks.get(el); if (t) edgeEnd(t); },
    active: function (el) { var t = edgeTracks && edgeTracks.get(el); return !!(t && t.layer); },
    milliseconds: EDGE_MS
  };

  var ROOT_FLAGS = ['vb-compact', 'vb-large-text', 'vb-reduced-motion', 'vb-reduced-flashes', 'vb-contrast'];  // SafeAreaRoot.RootClasses
  // Recipes are generated from the same contract as Unity MotionRecipes.
  function reducedMotion(node) { return !!(node && node.closest('.vb-reduced-motion')) || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  var runningMotion = new WeakMap();
  function playMotion(node, recipeName, index, leaving) {
    if (!node || !node.animate) return Promise.resolve();
    var recipe = MOTION.recipes[recipeName], calm = reducedMotion(node), old = runningMotion.get(node);
    if (old) old.cancel();
    var delay = calm ? 0 : Math.min((index || 0) * MOTION.stagger, MOTION.maxDealDelay);
    var origin = { opacity: 0, translate: calm ? '0 0' : (recipe.x || 0) + 'px ' + (recipe.y || 0) + 'px', rotate: calm ? '0deg' : (recipe.rotation || 0) + 'deg', scale: calm ? 1 : (recipe.scale || 1) };
    var rest = { opacity: 1, translate: '0 0', rotate: '0deg', scale: 1 };
    var animation = node.animate(leaving ? [rest, origin] : [origin, rest], { duration: calm ? 80 : recipe.milliseconds, delay: delay, fill: 'both', easing: 'cubic-bezier(.16,1,.3,1)' });
    runningMotion.set(node, animation);
    var previousInert = node.inert; if (delay) node.inert = true;
    var timer = delay ? setTimeout(function () { node.inert = previousInert; }, delay) : null;
    function cleanup() { clearTimeout(timer); node.inert = previousInert; if (runningMotion.get(node) === animation) { runningMotion.delete(node); animation.cancel(); } }
    var query = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    function settle() { if (reducedMotion(node)) animation.finish(); }
    if (query) query.addEventListener('change', settle);
    var observer = new MutationObserver(settle);observer.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['class'] });
    return animation.finished.then(function(){return true;},function(){return false;}).then(function (completed) { observer.disconnect();if(query)query.removeEventListener('change',settle);cleanup();return completed; });
  }
  /* ── Glitch.Reveal (GlitchText.cs): the title reveal, MOTION.timings.reveal (2000 ms): the text decodes out of noise glyphs left to right while it
        jitters sideways in whole 4-unit steps that shrink to nothing, and its opacity climbs in coarse steps. Reduced motion or flashes: a 300 ms fade. ── */
  var NOISE = '01#%&*+/<>[]{}=-_|~^', revealing = typeof WeakMap === 'function' ? new WeakMap() : null;
  function hash01(a, b) { var x = Math.imul(a, 374761393) + Math.imul(b, 668265263); x = Math.imul(x ^ 0x5bd1e995, -2048144777) >>> 8; return (x & 0xffff) / 65535; }
  /** Glitch.Scramble: the first part of the target is real, the rest noise glyphs picked by step; spaces stay spaces. */
  function scramble(target, reveal, step) {
    target = target == null ? '' : String(target); var n = target.length, done = Math.max(0, Math.min(n, Math.floor(reveal * n)));
    if (done >= n) return target;
    var out = ''; for (var i = 0; i < n; i++) { var c = target[i]; out += i < done || /\s/.test(c) ? c : NOISE[((Math.imul(i + 7, 73856093) ^ Math.imul(step + 3, 19349663)) >>> 0) % NOISE.length]; }
    return out;
  }
  function textNodes(el) { var nodes = [], walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null); while (walker.nextNode()) if (walker.currentNode.data.trim()) nodes.push(walker.currentNode); return nodes; }
  function revealEnd(el, state) {
    if (!state) return;
    if (state.raf) cancelAnimationFrame(state.raf);
    state.nodes.forEach(function (n, i) { if (n.parentNode) n.data = state.targets[i]; });
    el.style.translate = ''; el.style.opacity = ''; revealing.delete(el);
  }
  /** Glitch.Reveal(element, ms); resolves when it ends on the real text at rest. */
  function revealPlay(el, ms) {
    if (!el || !el.isConnected || !revealing) return Promise.resolve();
    revealEnd(el, revealing.get(el)); ms = ms || MOTION.timings.reveal;
    var nodes = textNodes(el), targets = nodes.map(function (n) { return n.data; }), state = { nodes: nodes, targets: targets }, began = performance.now();
    revealing.set(el, state);
    return new Promise(function (resolve) {
      function frame() {
        if (!el.isConnected || revealing.get(el) !== state) { resolve(); return; }
        var calm = reducedMotion(el) || !!el.closest('.vb-reduced-flashes'), t = performance.now() - began, p = Math.min(1, t / (calm ? 300 : ms)), n = Math.floor(t / 33);
        if (p >= 1) { revealEnd(el, state); resolve(); return; }
        if (calm) el.style.opacity = String(p);
        else {
          var k = Math.max(0, Math.min(1, (p - 0.08) / 0.7)); k = k * k * (3 - 2 * k);
          nodes.forEach(function (node, i) { var next = scramble(targets[i], k, Math.floor(p * 30)); if (node.data !== next) node.data = next; });
          var jitter = Math.floor(n / 1), left = (1 - p) * (1 - p), dx = Math.round((hash01(jitter, 1) * 2 - 1) * 14 * left / 4) * 4;
          el.style.translate = dx + 'px 0';
          var level = p >= 0.35 ? 1 : Math.floor(clamp01(p / 0.35) * 4) / 4;
          if (p < 0.7 && hash01(jitter, 2) < 0.12 * (1 - p)) level = Math.min(level, 0.25);
          el.style.opacity = String(Math.max(p < 0.03 ? 0 : 0.12, level));
        }
        state.raf = requestAnimationFrame(frame);
      }
      frame();
    });
  }
  /** Glitch.RevealTitles: every element under root (itself included) with the class vb-reveal-title. */
  function revealTitles(root, ms) {
    if (!root) return;
    var list = Array.prototype.slice.call(root.querySelectorAll('.vb-reveal-title')); if (root.matches && root.matches('.vb-reveal-title')) list.unshift(root);
    list.forEach(function (el) { revealPlay(el, ms); });
  }
  var Glitch = { reveal: revealPlay, revealTitles: revealTitles, scramble: scramble, titleClass: 'vb-reveal-title', milliseconds: MOTION.timings.reveal };

  function MotionSurface(p) {
    var ref = R.useRef(null), seen = R.useRef(new WeakSet());
    useIsoLayout(function () { if (!ref.current) return; var fresh = Array.from(ref.current.querySelectorAll('[data-motion-item]')).filter(function (node) { return !seen.current.has(node); });fresh.forEach(function (node, i) { seen.current.add(node);playMotion(node, 'deal', i); }); });
    useIsoLayout(function () { var node=ref.current;playMotion(node, p.overlay ? 'overlayIn' : 'viewIn');revealTitles(node);return function(){if(node){[node].concat(Array.from(node.querySelectorAll('[data-motion-item]'))).forEach(function(e){var a=runningMotion.get(e);if(a)a.cancel();});}}; }, []);
    return h('section', { ref: ref, className: p.className, style: p.style, 'aria-label': p.label }, p.children);
  }
  // Modal ownership is reference-counted: nested overlays restore only their own siblings after exit.
  var coverage = new WeakMap();
  function coverSiblings(node) { var held=[],boundary=node.closest('[data-preview]')||document.body;for(var parent=node.parentElement;parent;parent=parent.parentElement){Array.from(parent.children).forEach(function(sibling){if(sibling===node||sibling.contains(node)||sibling.matches('script,style,link,svg')||sibling.matches('[data-overlay-root]')&&(node.compareDocumentPosition(sibling)&Node.DOCUMENT_POSITION_FOLLOWING))return;var old=coverage.get(sibling);if(old)old.count++;else {old={count:1,inert:sibling.inert};coverage.set(sibling,old);sibling.inert=true;sibling.classList.add('vb-overlay-covered');}held.push(sibling);});node=parent;if(parent===boundary)break;}
    return function(){held.forEach(function(sibling){var old=coverage.get(sibling);if(!old)return;if(--old.count===0){sibling.inert=old.inert;sibling.classList.remove('vb-overlay-covered');coverage.delete(sibling);}});};
  }
  /** Plays MotionRecipes.PopoverIn on the surface it sits in (OverlayView.Present for a popover). */
  function PopoverEntrance() { var ref = R.useRef(null); useIsoLayout(function () { var node = ref.current && ref.current.parentElement; if (node) playMotion(node, 'popoverIn'); }, []); return h('span', { ref: ref, hidden: true }); }
  /* ── Popover (Popover.cs): hover on a mouse, tap toggles on touch, focus opens; kept inside the viewport ── */
  var popoverStack=[];
  function usePopover(build, placement, alignEnd, pinned) {
    var anchor = R.useRef(null), pop = R.useRef(null), closeTimer = R.useRef(null), touchPinned = R.useRef(false), skipFocus=R.useRef(false);
    function cancelClose(){clearTimeout(closeTimer.current);}
    function later(){cancelClose();closeTimer.current=setTimeout(function(){var child=popoverStack.some(function(a){return a!==anchor&&pop.current&&pop.current.contains(a.current);});var hovered=anchor.current&&anchor.current.matches(':hover')||pop.current&&pop.current.matches(':hover');if(!pinned&&!touchPinned.current&&!child&&!hovered&&!(pop.current&&pop.current.contains(document.activeElement)))setOpen(false);},160);}
    var s = R.useState(false), open = s[0] || !!pinned, setOpen = s[1];
    var pos = R.useState(null), at = pos[0], setAt = pos[1], tick = R.useState(0)[1];
    R.useEffect(function(){if(!open)return;popoverStack.push(anchor);function outside(e){if(e.target.closest&&e.target.closest('.vb-popover'))return;if(anchor.current&&anchor.current.contains(e.target)||pop.current&&pop.current.contains(e.target))return;touchPinned.current=false;setOpen(false);}function key(e){if(e.key==='Escape'&&popoverStack[popoverStack.length-1]===anchor){e.stopImmediatePropagation();touchPinned.current=false;skipFocus.current=true;setOpen(false);if(anchor.current)anchor.current.focus();setTimeout(function(){skipFocus.current=false;},0);}}document.addEventListener('pointerdown',outside,true);document.addEventListener('keydown',key,true);document.addEventListener('vb-popover-closed',later);return function(){popoverStack=popoverStack.filter(function(a){return a!==anchor;});cancelClose();document.removeEventListener('pointerdown',outside,true);document.removeEventListener('keydown',key,true);document.removeEventListener('vb-popover-closed',later);document.dispatchEvent(new Event('vb-popover-closed'));};},[open]);
    // Popover.Place runs on every geometry change; re-place on resize, scroll and anchor resize.
    R.useEffect(function () {
      if (!open) return;
      function again() { tick(function (n) { return n + 1; }); }
      window.addEventListener('resize', again); window.addEventListener('scroll', again, true);
      var obs = window.ResizeObserver && anchor.current ? new ResizeObserver(again) : null; if (obs) obs.observe(anchor.current);
      return function () { window.removeEventListener('resize', again); window.removeEventListener('scroll', again, true); if (obs) obs.disconnect(); };
    }, [open]);
    // Popover.Fit: below or above the anchor (flipping when it would leave the panel), clamped inside the edges; the arrow points at the anchor.
    useIsoLayout(function () {
      if (!open || !anchor.current || !pop.current) return;
      var a = anchor.current.getBoundingClientRect(), wv = window.innerWidth, hv = window.innerHeight;
      var w = pop.current.offsetWidth, hh = pop.current.offsetHeight, gap = 9, edge = 8, inset = 14;
      var x = alignEnd ? a.right - w : a.left, y = placement === 'above' ? a.top - gap - hh : a.bottom + gap;
      if (placement !== 'above' && y + hh > hv - edge) y = a.top - gap - hh;
      if (placement === 'above' && y < edge) y = a.bottom + gap;
      x = Math.min(Math.max(x, edge), Math.max(edge, wv - w - edge)); y = Math.min(Math.max(y, edge), Math.max(edge, hv - hh - edge));
      var cx0 = a.left + a.width / 2, arrow = Math.min(Math.max(cx0 - x, Math.min(inset, w / 2)), Math.max(w - inset, w / 2)), below = y + hh / 2 > a.top + a.height / 2;
      if (!at || Math.abs(at[0] - x) > 0.5 || Math.abs(at[1] - y) > 0.5 || at[2] !== arrow || at[3] !== below) setAt([x, y, arrow, below]);
    });
    var handlers = {
      onPointerEnter: function (e) { if (e.pointerType === 'mouse') {cancelClose();setOpen(true);} },
      onPointerLeave: function (e) { if (e.pointerType === 'mouse') later(); },
      onPointerDown: function (e) { if (e.pointerType !== 'mouse') {e.stopPropagation();touchPinned.current=!open;setOpen(!open);} },
      onFocus: function () { if(skipFocus.current)return;cancelClose();setOpen(true); }, onBlur: later,
      onKeyDown: function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();setOpen(!open);}}
    };
    var content = open ? build() : null, a = content && anchor.current;
    // Popover.Open: the layer sits outside the board, so it copies the anchor's root flags and theme.
    var flags = a ? ROOT_FLAGS.filter(function (c) { return a.closest('.' + c); }).concat(fluidOf(a) || []) : [], themed = a && a.closest('[data-theme]');
    // The popover is one solid surface (Shape) with a painted arrow; its content scrolls past the panel's height (PopoverIn plays on open).
    var layer = content ? window.ReactDOM.createPortal(h(Shape, {
      ref: pop, role: 'region', 'aria-label': 'Details', onPointerEnter:cancelClose, onPointerLeave:later, onFocus:cancelClose, onBlur:later, className: cx('vb-root vb-popover', flags.join(' ')), 'data-theme': themed ? themed.getAttribute('data-theme') : undefined,
      style: { position: 'fixed', left: at ? at[0] : -9999, top: at ? at[1] : -9999, maxWidth: Math.min(340, Math.max(80, window.innerWidth - 16)), zIndex: 50, pointerEvents: 'auto' }
    }, h(PopoverEntrance, null), h('div', { className: 'vb-popover__scroll', style: { maxHeight: Math.max(80, window.innerHeight - 16), overflowY: 'auto' } }, h('div', { className: 'vb-popover__content' }, content)),
      h('svg', { className: cx('vb-popover__arrow', at && at[3] ? 'vb-popover__arrow--up' : 'vb-popover__arrow--down'), style: { left: (at ? at[2] : 0) - 8 }, width: 16, height: 8, viewBox: '0 0 16 8', 'aria-hidden': true },
        h('path', { d: at && at[3] ? 'M0 8L8 0L16 8Z' : 'M0 0L8 8L16 0Z', className: 'vb-popover__arrow-fill' }), h('path', { d: at && at[3] ? 'M0 8L8 0L16 8' : 'M0 0L8 8L16 0', className: 'vb-popover__arrow-edge', fill: 'none' }))), document.body) : null;
    return { ref: anchor, open: !!content, handlers: handlers, layer: layer };
  }

  /* ── Controls ─────────────────────────────────────────────────────────── */
  function VbIcon(p) {
    var name = kebab(p.icon || ''), size = p.size == null ? 16 : p.size;
    var style = Object.assign({ width: size, height: size }, p.style || {}, name ? null : { display: 'none' });
    return h('div', { className: cx('vb-icon', name && 'vb-icon--' + name, p.className), style: style, title: p.title },
      ICONS[name] ? h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'square', strokeLinejoin: 'miter', width: '100%', height: '100%', 'aria-hidden': true, dangerouslySetInnerHTML: { __html: ICONS[name] } }) : null);
  }
  VbIcon.names = Object.keys(ICONS);

  function VbMark(p) {
    var w = p.width == null ? 260 : p.width;
    return h('div', { className: cx('vb-mark', p.className), role: 'img', 'aria-label': 'Veilbreak', style: Object.assign({ width: w, height: Math.round(w * 259 / 513) }, p.style), dangerouslySetInnerHTML: { __html: MARK.replace('<svg ', '<svg width="100%" height="100%" ') } });
  }

  function VbFrame(p) { return h(Shape, { className: cx(frameClass(p.kind), p.className), style: p.style }, p.children); }

  function VbButton(p) {
    var variant = p.variant || 'secondary', blocked = p.blocked || '', sub = blocked || p.sub || '', icon = p.icon || '', iconOnly = !!p.iconOnly, off = !!blocked || !!p.dimmed;
    var lead = p.lead != null ? !!p.lead : (icon === 'back' || icon === 'chevron-left');   // VbButton.Icon: back and chevron-left lead by themselves
    var glyph = icon && (!p.compact || iconOnly);
    function press(e) { edgeFx.play(e.currentTarget); if (p.onClick) p.onClick(e); }
    return h(Shape, {
      as: 'button', type: 'button', disabled: off, onClick: off ? null : press, style: p.style, title: iconOnly ? p.title : undefined, 'aria-label': iconOnly ? p.title : undefined,
      className: cx('vb-button', st('vb-button', variant), off && 'vb-button--blocked', lead && 'vb-button--lead', iconOnly && 'vb-button--icon', p.className)
    },
      h('div', { className: 'vb-button__text' }, L('vb-button__label', p.title || ''), L('vb-button__sub', sub, show(sub.length > 0))),
      h(VbIcon, { icon: icon, size: icon === 'chevron' || icon === 'play' ? 12 : 20, className: 'vb-button__icon', style: glyph ? null : { display: 'none' } }));
  }
  // StatReadout.Delta: a leading + reads up (teal), − down (pink); `up` overrides when lower is better.
  function StatReadout(p) {
    var bar = p.bar == null ? -1 : p.bar, d = p.delta || '', c = d.charAt(0);
    var rise = p.up != null ? !!p.up : c === '+', fall = p.up != null ? !p.up : c === '−' || c === '-';
    return h('div', { className: cx('vb-stat', p.tone && 'vb-stat--' + p.tone, p.className) },
      L('vb-stat__label', p.label),
      h('div', { className: 'vb-stat__row' }, L('vb-stat__value', p.value), L('vb-stat__unit', p.unit || '', show(!!p.unit)),
        L(cx('vb-stat__delta', d && rise && 'vb-stat__delta--up', d && fall && !rise && 'vb-stat__delta--down'), d, show(d.length > 0))),
      bar >= 0 ? h(ProgressBar, { value: bar, className: 'vb-stat__bar' }) : null);
  }

  var STATUS_ICON = { exposed: 'exposed', silenced: 'silence', rooted: 'root', slowed: 'slow', interrupted: 'warning', barrier: 'barrier' };
  function statusIcon(kind) { return STATUS_ICON[kebab(kind)] || 'barrier'; }
  function StatusChip(p) {
    var kind = kebab(p.kind || 'barrier');
    return h(Shape, { className: cx('vb-status', st('vb-status', kind), p.className) },
      h(VbIcon, { icon: statusIcon(kind), size: 14, className: 'vb-status__icon' }),
      L('vb-status__word', p.text || kind.charAt(0).toUpperCase() + kind.slice(1)),
      p.detail ? L('vb-status__detail', '· ' + p.detail) : null,
      p.time ? L('vb-status__time', p.time) : null);
  }

  function useValue(value, onChange) {
    var s = R.useState(value), v = s[0], set = s[1];
    R.useEffect(function () { set(value); }, [value]);
    return [v, function (n) { if (n === v) return; set(n); if (onChange) onChange(n); }];
  }

  function VbSwitch(p) {
    var s = useValue(!!p.value, p.onChange), on = s[0];
    return h('div', Object.assign({ className: cx('vb-switch', on && 'vb-switch--on', p.className), 'aria-checked': on, role: 'switch' }, clickable(function () { s[1](!on); }), { role: 'switch' }),
      h(Shape, { className: 'vb-switch__track' }, h('div', { className: 'vb-switch__knob' })),
      h('div', { className: 'vb-switch__text' }, L('vb-switch__label', p.text || ''), L('vb-switch__detail', p.detail || '', show(!!p.detail))));
  }

  function VbSlider(p) {
    var min = p.min == null ? 0 : p.min, max = p.max == null ? 1 : p.max;
    var s = useValue(p.value == null ? 0 : p.value, p.onChange), v = s[0], track = R.useRef(null);
    var t = max === min ? 0 : clamp01((v - min) / (max - min));
    function at(e) { var r = track.current.getBoundingClientRect(); s[1](min + clamp01((e.clientX - r.left - 6) / Math.max(1, r.width - 12)) * (max - min)); }
    return h('div', { className: cx('vb-slider', 'vb-u-base-field', p.className), tabIndex: 0, role: 'slider', 'aria-valuenow': Math.round(t * 100),
      onKeyDown: function (e) { var k = (max - min) / 20; if (e.key === 'ArrowRight') s[1](Math.min(max, v + k)); if (e.key === 'ArrowLeft') s[1](Math.max(min, v - k)); } },
      L('vb-u-base-field__label', p.label || ''),
      h('div', { className: 'vb-u-base-slider__input' },
        h('div', { className: 'vb-u-base-slider__drag-container', ref: track,
          onPointerDown: function (e) { e.currentTarget.setPointerCapture(e.pointerId); at(e); },
          onPointerMove: function (e) { if (e.buttons) at(e); } },
          h('div', { className: 'vb-u-base-slider__tracker' }, h('div', { className: 'vb-slider__fill', style: { width: pct(t) } })),
          h('div', { className: 'vb-u-base-slider__dragger', style: { left: 'calc((100% - 12px) * ' + t + ')' } }))),
      L('vb-slider__value', String(Math.round(t * 100))));
  }

  function VbSegmented(p) {
    var items = p.items || [], s = useValue(Math.max(0, Math.min(items.length - 1, p.selected || 0)), p.onChange);
    return h(Shape, { className: cx('vb-segmented', p.className), role: 'radiogroup' }, items.map(function (it, k) {
      return h('div', Object.assign({ key: k, className: cx('vb-segmented__option', k === s[0] && 'vb-segmented__option--on'), 'aria-checked': k === s[0] }, clickable(function () { s[1](k); }), { role: 'radio' }),
        L('vb-segmented__label', it.label), it.sub ? L('vb-segmented__sub', it.sub) : null);
    }));
  }

  /* ── Meters ───────────────────────────────────────────────────────────── */
  function VbMeter(p) {
    var v = clamp01(p.value), extra = Math.max(0, Math.min(Number(p.extra || 0), 1 - v));
    var from = p.previewFrom == null ? -1 : p.previewFrom, to = p.previewTo == null ? -1 : p.previewTo, on = from >= 0 && to > from;
    return h('div', { className: cx('vb-meter', p.className), style: p.style },
      p.before || null,
      h('div', { className: 'vb-meter__fill', style: { width: pct(v) } }),
      h('div', { className: 'vb-meter__extra', style: extra > 0 ? { left: pct(v), width: pct(extra) } : { display: 'none' } }),
      h('div', { className: 'vb-meter__preview', style: on ? { left: pct(from), width: pct(to - from) } : { display: 'none' } }),
      p.after || null,
      (p.marks || []).map(function (m, i) { return h('div', { key: i, className: 'vb-meter__mark', style: { left: pct(m) } }, L('vb-meter__mark-label', String(i + 1))); }));
  }

  // `ghost` is health before the last hit (same units as hp); `size` hud | world | large; `caption` "HP 820 / 1000".
  function HealthBar(p) {
    var max = Math.max(1, p.max || 1), stab = p.stability == null ? -1 : p.stability, hp = p.hp || 0, ghost = p.ghost == null ? -1 : p.ghost, cap = p.caption || '';
    return h('div', { className: cx('vb-health', p.exposed && 'vb-health--exposed', p.enemy && 'vb-health--enemy', p.size && st('vb-health', p.size), p.className), style: p.style },
      L('vb-health__label', cap, show(cap.length > 0)),
      h(VbMeter, { className: 'vb-health__hp', value: hp / max, extra: (p.barrier || 0) / max,
        before: h('div', { className: 'vb-health__ghost', style: ghost > hp ? { width: pct(ghost / max) } : { display: 'none' } }) }),
      h(VbMeter, { className: 'vb-health__stability', value: p.exposed ? 1 : stab, style: show(stab >= 0) }));
  }

  // `reserve`: the autopilot's soft reserve line; `queue`: up to four QueueChips (manual ones raise onCancel); `legend`: a key line.
  function PowerStrip(p) {
    var max = p.max || 100, m = Math.max(1, max), from = p.previewFrom == null ? -1 : p.previewFrom, res = p.reserve || 0, q = (p.queue || []).slice(0, 4), legend = p.legend || '';
    return h('div', { className: cx('vb-power', p.className), style: p.style },
      h('div', { className: 'vb-power__head' }, L('vb-power__label', 'POWER'), L('vb-power__value', String(p.value || 0)), L('vb-power__max', '/' + max),
        L('vb-power__regen', p.regen || ''), L('vb-power__hint', p.hint || '', show(!!p.hint))),
      h(VbMeter, { className: 'vb-power__meter', value: (p.value || 0) / m, previewFrom: from < 0 ? -1 : from / m, previewTo: (p.previewTo == null ? -1 : p.previewTo) / m, marks: p.marks,
        after: h('div', { className: 'vb-power__reserve', title: 'Autoplay keeps ' + res + ' Power in reserve', style: res > 0 ? { left: pct(res / m) } : { display: 'none' } }) }),
      h('div', { className: 'vb-power__queue', style: show(q.length > 0) }, q.map(function (e, i) { return h(QueueChip, { key: i, view: e, position: i + 1, onCancel: p.onCancel }); })),
      L('vb-power__legend', legend, show(legend.length > 0)));
  }

  /* QueueChip.cs: place, skill, operative, cost and time to fire; a full-height × on manual entries. */
  function QueueChip(p) {
    var v = Object.assign({ who: '', skill: '', eta: '', cost: 0, manual: false, next: false }, p.view), pos = p.position || 1, preview = !!p.preview, cancel = v.manual && !preview;
    return h(Shape, { className: cx('vb-queue-chip', (pos === 1 || v.next) && 'vb-queue-chip--next', preview && 'vb-queue-chip--preview', v.manual && 'vb-queue-chip--manual', p.className), style: p.style },
      L('vb-queue-chip__index', v.next ? '›' : String(pos)),
      h('div', { className: 'vb-queue-chip__text' }, L('vb-queue-chip__skill', upper(v.skill)), L('vb-queue-chip__who', v.who)),
      L('vb-queue-chip__cost', String(v.cost)), L('vb-queue-chip__eta', v.eta, show(!!v.eta)),
      h('div', Object.assign({ className: 'vb-queue-chip__cancel', title: 'Cancel queued cast', 'aria-label': 'Cancel queued cast', style: show(cancel) },
        clickable(function () { if (cancel && p.onCancel) p.onCancel(v); })), h(VbIcon, { icon: 'close', size: 14 })));
  }

  function FocusMeter(p) {
    var f = p.focus == null ? 100 : p.focus, regen = p.regenPerSecond == null ? 12.5 : p.regenPerSecond, drain = p.drainPerSecond == null ? 25 : p.drainPerSecond, scale = p.slowScale == null ? 0.2 : p.slowScale;
    var rate = p.slow ? '×' + scale.toFixed(1) + ' · −' + Math.round(drain) + '/s' : f < 100 ? '+' + trim1(regen) + '/s' : 'READY';
    return h('div', { className: cx('vb-focus', p.slow && 'vb-focus--slow', p.className), style: p.style },
      L('vb-focus__label', 'FOCUS'), h(VbMeter, { className: 'vb-focus__meter', value: f / 100 }), L('vb-focus__value', String(Math.round(f))), L('vb-focus__rate', rate));
  }

  /* ── SkillButton ──────────────────────────────────────────────────────── */
  var SKILL = { label: 'Skill', icon: 'projectile', slot: 'A', kind: 'Active', cost: 0, state: 'ready', charged: 1, seconds: 0, need: 0, queue: 0, progress: 0, reason: '' };
  var SKILL_STATES = ['ready', 'aiming', 'cooldown', 'short', 'silenced', 'fallen', 'casting', 'disabled', 'queued', 'buffered', 'windup', 'invalid', 'rejected', 'exposed'];
  // Entering Rejected flashes crimson once for 400 ms (SkillButton.Bind); `flash` holds it for previews.
  function useFlash(on) {
    var f = R.useState(false), was = R.useRef(false);
    R.useEffect(function () {
      var t = null; if (on && !was.current) { f[1](true); t = setTimeout(function () { f[1](false); }, 400); }
      was.current = on; return function () { if (t) clearTimeout(t); };
    }, [on]);
    return f[0];
  }
  function SkillButton(p) {
    var v = Object.assign({}, SKILL, p.view), s = kebab(v.state), flash = useFlash(s === 'rejected') || !!p.flash;
    // One layout in every state (SkillButton.Bind): the states are overlays, so nothing runs below the slot's foot.
    var count = '', corner = '', cost = s === 'fallen' ? '' : String(v.cost);
    switch (s) {
      case 'cooldown': case 'windup': case 'silenced': count = seconds(v.seconds); break;
      case 'short': corner = '−' + v.need; break;
      case 'queued': corner = '#' + v.queue; break;
      case 'buffered': corner = '›'; break;
      case 'invalid': cost = v.reason ? upper(v.reason) : cost; break;
    }
    var tip = v.label + ' · ' + v.cost + ' Power' + (s === 'cooldown' ? ' · ' + Math.round(v.charged * 100) + '% ready' : s === 'short' ? ' · ' + v.need + ' short' : s === 'queued' ? ' · queued' : s === 'invalid' && v.reason ? ' · ' + v.reason : s === 'rejected' ? ' · refused' : '');
    return h(Shape, Object.assign({ className: cx('vb-skill', st('vb-skill', s), flash && 'vb-skill--flash', p.dragging && 'vb-dragging', p.className), title: tip, tabIndex: 0, style: p.style }, p.onPointerDown ? { onPointerDown: p.onPointerDown } : null),
      h(ClipFill, { className: 'vb-skill__charge', style: s === 'cooldown' ? { height: pct(v.charged) } : { display: 'none' } }),
      h(ClipFill, { className: 'vb-skill__sweep', style: s === 'windup' ? { width: pct(v.progress) } : { display: 'none' } }),
      L('vb-skill__slot', v.slot),
      h(VbIcon, { icon: s === 'fallen' || s === 'disabled' ? 'lock' : s === 'invalid' ? 'no-target' : v.icon, size: 20, className: 'vb-skill__icon' }),
      L('vb-skill__seconds', count, show(count.length > 0)),
      h('div', { className: 'vb-skill__slash', style: show(s === 'silenced' || s === 'invalid') }),
      L('vb-skill__badge', corner, show(corner.length > 0)),
      L('vb-skill__value', cost, show(cost.length > 0)));
  }
  SkillButton.states = SKILL_STATES;

  /* ── Battle HUD ───────────────────────────────────────────────────────── */
  // With onCancel, manual rows are buttons that cancel their cast; autoplay estimates are not.
  function QueueList(p) {
    var q = p.queue || [];
    return h(Shape, { className: cx('vb-queue', p.className) },
      h('div', { className: 'vb-queue__head' }, L('vb-queue__title', (p.title || 'AUTOPLAY QUEUE') + ' · ' + q.length), L('vb-queue__hint', p.hint == null ? 'Fires as Power reaches each cost' : p.hint)),
      q.map(function(e,i){return h(QueueChip,{key:e.id||(e.actor+':'+e.slot+':'+e.who+':'+e.skill),view:e,position:i+1,onCancel:p.onCancel,className:cx('vb-queue__row',e.manual&&'vb-queue__row--manual')});}));
  }

  var HUD = { speed: 1, wave: 1, score: 0, boss: false, auto: true, slow: false, power: 0, maxPower: 100, regen: '+12/s', hint: null, focus: 100, previewFrom: -1, previewTo: -1, queue: [], queueTitle: 'AUTOPLAY QUEUE', queueHint: 'Fires as Power reaches each cost' };
  function HudTop(p) {
    var v = Object.assign({}, HUD, p.view), q = v.queue || [];
    var pop = usePopover(function () { return q.length ? h(QueueList, { queue: q, title: v.queueTitle, hint: v.queueHint, onCancel: p.onQueueCancel }) : null; }, 'below', false, p.queuePinned);
    return h('div', { className: cx('vb-hud', v.boss && 'vb-hud--boss', p.className), style: p.style },
      h('div', { className: 'vb-hud__row' },
        h(IconButtonComposite, { icon: 'pause', tooltip: 'Pause', quiet: true, className: 'vb-hud__pause', onClick: p.onPauseClick }),
        h(IconButtonComposite, { icon: 'automation', text: v.auto ? 'AUTO' : 'MANUAL', textClass: 'vb-hud__auto-label', tooltip: v.auto ? 'Autoplay on · tap to disable' : 'Autoplay off · tap to enable', quiet: true, active: !!v.auto, className: cx('vb-hud__auto', v.auto && 'vb-hud__auto--on'), onClick: p.onAutoClick }),
        h('div', { className: 'vb-hud__stats' },
          h('div', { className: 'vb-hud__stat' }, L('vb-hud__key', v.boss ? 'BOSS' : 'WAVE'), h(GlitchText, { key: v.wave, text: pad2(v.wave), className: 'vb-hud__wave', effect: 'slam' })),
          h('div', { className: 'vb-hud__stat' }, L('vb-hud__key', 'SCORE'), L('vb-hud__score', compact(v.score)))),
        h(IconButtonComposite, { text: v.speed + '×', tooltip: 'Toggle simulation speed', className: 'vb-hud__speed', textClass: 'vb-hud__auto-state', onClick: p.onSpeedClick })),
      h(Shape, Object.assign({ ref: pop.ref, className: cx('vb-hud__resources', pop.open && 'vb-popover-open'), tabIndex: 0 }, pop.handlers),
        h('div', { className: 'vb-hud__resource-row' }, h(PowerStrip, { value: v.power, max: v.maxPower, regen: v.regen, hint: p.showHint === false ? null : v.hint, previewFrom: v.previewFrom, previewTo: v.previewTo, marks: q.length ? [q[0].cost / Math.max(1, v.maxPower)] : null }), h(CreditsChip, { credits: v.credits || 0 })),
        h(FocusMeter, { focus: v.focus, slow: v.slow, style: show(p.showFocus !== false) })), pop.layer);
  }

  function BossBar(p) {
    var b = Object.assign({ name: '', health: 1, stability: 1, detail: '', shielded: false, interruptible: false, shieldDetail: '' }, p.view);
    var effects=(b.effects||[]).slice();if(b.shielded&&!effects.some(function(e){return e.definition.id==='boss-protection';}))effects.push({id:'boss:shield',definition:{id:'shielded',title:'Shielded',description:b.shieldDetail,icon:'barrier',polarity:'benefit'}});if(b.interruptible&&!effects.some(function(e){return e.definition.id==='interruptible';}))effects.push({id:'boss:interruptible',definition:{id:'interruptible',title:'Interruptible',description:'This action can be interrupted.',icon:'warning'}});
    return h(Shape, { className: cx('vb-boss', p.className) },
      h('div', { className: 'vb-boss__head' }, h(VbIcon, { icon: 'marker', size: 14, className: 'vb-boss__icon' }), L('vb-boss__name', upper(b.name)), L('vb-boss__detail', b.detail)),
      h(HealthBar, { className: 'vb-boss__health', hp: b.health, max: 1, barrier: 0, stability: b.stability, exposed: b.stability <= 0, enemy: true }),
      h(EffectStrip, {className:'vb-boss__chips',effects:effects}));
  }

  /* ── Screens ──────────────────────────────────────────────────────────── */
  function ScreenHeader(p) {
    return h('div', { className: cx('vb-header', p.showBack === false && 'vb-header--no-back', p.className) },
      h(IconButtonComposite, { icon: 'back', tooltip: p.backLabel || 'Back', className: 'vb-header__back', onClick: p.onBack, style: show(p.showBack !== false) }),
      L(cx('vb-header__title', p.revealTitles && 'vb-reveal-title'), upper(p.title)),
      L(cx('vb-header__meta', p.accent && 'vb-header__meta--accent', p.revealTitles && 'vb-reveal-title'), p.meta || ''));
  }

  function ScoreRow(p) {
    var v = Object.assign({ rank: 0, score: 0, wave: 0, bosses: 0, squad: [], current: false }, p.view);
    return h(ListRow, { className: cx('vb-score', v.current && 'vb-score--current', p.className), style: p.style, selected: v.current, lead: pad2(v.rank), leadClass: v.rank <= 3 && 'vb-score__rank--top',
      title: num(v.score), value: v.current ? 'THIS RUN' : '', caption: 'Wave ' + v.wave + ' · ' + v.bosses + ' ' + (v.bosses === 1 ? 'boss' : 'bosses') + (v.squad.length ? ' · ' + v.squad.join(' ') : '') });
  }


  /* ── Operatives ───────────────────────────────────────────────────────── */
  var OPERATIVE = { id: '', name: '', code: '', role: '', roleIcon: 'striker', passive: '', passiveText: '', passiveFullText: '', passiveIcon: '', basic: null, lore: '', canRevive: false, kit: '#ffffff', portrait: null, hp: 0, maxHp: 1, barrier: 0, armor: 0, stability: 100, maxStability: 100, effects: [], mode: 'auto', manualSeconds: 0, skills: [{}, { slot: 'S', kind: 'Signature' }] };
  function operative(v) { return Object.assign({}, OPERATIVE, v); }
  function fallenOf(v) { return kebab(v.mode) === 'fallen' || v.hp <= 0; }
  function img(url) { return url ? { backgroundImage: 'url("' + url + '")' } : null; }
  function Strike(on, text) { return on ? h('s', null, text) : text; }

  function effectModel(v){return Object.assign({id:'unknown',definition:{title:'Unknown effect',description:'No authored description is available.',icon:'info',scope:'actor'},stacks:1,activation:'active'},v);}
  /** Markup.Rich: each *word* (or **word**) becomes an emphasis run; unbalanced or spaced asterisks stay as written. */
  function markup(text) {
    text = text == null ? '' : String(text); if (text.indexOf('*') < 0) return text;
    var out = [], i = 0, buf = '', n = 0;
    while (i < text.length) {
      if (text[i] !== '*') { buf += text[i++]; continue; }
      var j = i; while (j < text.length && text[j] === '*') j++;
      var run = Math.min(j - i, 2), mark = run === 2 ? '**' : '*', close = j < text.length && !/\s/.test(text[j]) ? text.indexOf(mark, j) : -1;
      if (close > j && !/\s/.test(text[close - 1])) { if (buf) out.push(buf); buf = ''; out.push(h('span', { key: n++, className: 'vb-markup' }, text.slice(j, close))); i = close + run; continue; }
      buf += text.slice(i, j); i = j;
    }
    if (buf) out.push(buf);
    return out;
  }
  function EffectDetails(p){var e=effectModel(p.view),d=e.definition,value=(e.magnitude||'')+(e.stacks>1?' · ×'+e.stacks:''),time=e.remainingSeconds!=null?seconds(e.remainingSeconds)+' remaining'+(e.totalSeconds!=null?' / '+seconds(e.totalSeconds):''):'',state=e.activation==='active'?'':upper(e.activation);
    // Prints only what is known: nothing stands in for a missing value (EffectDetails.Bind).
    return h('article',{className:cx('vb-effect-detail',p.className)},L('vb-effect-detail__title',upper(d.title),{whiteSpace:'normal'}),d.description?h('div',{className:'vb-l vb-t-body'},markup(d.description)):null,e.source?L('vb-t-caption','Source · '+e.source):null,value?L('vb-t-label',value):null,time?L('vb-t-caption',time):null,state?L('vb-t-badge',state):null);}
  function EffectBadge(p){var e=effectModel(p.view),d=e.definition,pop=usePopover(function(){return h(EffectDetails,{view:e});},'above',false,p.pinned);R.useEffect(function(){if(p.onOpenChange)p.onOpenChange(pop.open);},[pop.open]);return h(R.Fragment,null,h(Shape,Object.assign({as:'button',type:'button',ref:pop.ref,className:cx('vb-badge',st('vb-badge',d.polarity==='harm'?'enemy':d.polarity==='benefit'?'ally':'neutral'),'vb-effect-badge',st('vb-effect',e.activation),p.className),'data-effect-state':e.activation,'aria-label':d.title,'aria-expanded':pop.open},pop.handlers),h(VbIcon,{icon:d.icon||'info',size:14}),e.stacks>1?h('span',null,'×'+e.stacks):null),pop.layer);}
  function EffectList(p){var cache=R.useRef(new Map()),held=R.useState(new Set()),open=held[0],setOpen=held[1];var effects=p.effects||[],current=new Set(effects.map(function(e){return e.id;}));effects.forEach(function(e){cache.current.set(e.id,e);});var shown=effects.slice();cache.current.forEach(function(e,id){if(!current.has(id)){if(open.has(id))shown.push(Object.assign({},e,{activation:'expired',remainingSeconds:0}));else cache.current.delete(id);}});return h('ul',{className:cx('vb-effect-list',p.className)},shown.map(function(e){return h('li',{className:'vb-effect-row',key:e.id},h(EffectBadge,{view:e,onOpenChange:function(on){setOpen(function(previous){var next=new Set(previous);if(on)next.add(e.id);else next.delete(e.id);return next;});}}),h('span',null,e.definition.title+' · '+(e.magnitude||e.activation||'active')));}));}
  function EffectStrip(p){var last=R.useRef([]),wasOpen=R.useRef(false),all=p.effects||[];if(all.length)last.current=all;var visible=all.length?all:wasOpen.current?last.current.map(function(e){return Object.assign({},e,{activation:'expired',remainingSeconds:0});}):[];var pop=usePopover(function(){return h(EffectList,{effects:visible});},'above',false,p.pinned);if(!all.length&&!pop.open)visible=[];wasOpen.current=pop.open;if(!visible.length)return null;return h('div',{className:cx('vb-effect-strip',p.className)},!p.compact?h(EffectBadge,{view:visible[0]}):null,visible.length>(p.compact?0:1)?h('button',Object.assign({type:'button',ref:pop.ref,className:'vb-effect-strip__more','aria-label':'All effects · '+all.length,'aria-expanded':pop.open},pop.handlers),p.compact?h(VbIcon,{icon:visible[0].definition.icon||'info',size:14}):null,(p.compact?'':'+')+(p.compact?all.length:Math.max(0,all.length-1))):null,pop.layer);}
  /** StatusRow: the timed statuses of a unit as tiny squares (about 20 x 20, glyph alone, stack count in the corner), at most six and a "+n" square;
      one target that opens a vertical EffectList in a popover (Popover.Above). Passives, perks and effects without a time never show. */
  var STATUS_ROW_MAX = 6;
  function StatusSquare(p) {
    var e = p.view, d = e && (e.definition || { icon: 'info' }), overflow = p.overflow != null;
    var tone = overflow ? 'neutral' : d.polarity === 'harm' ? 'enemy' : d.polarity === 'benefit' ? 'ally' : 'neutral';
    var value = overflow ? '+' + p.overflow : e && e.stacks > 1 ? String(e.stacks) : '';
    return h(Shape, { className: cx('vb-badge', st('vb-badge', tone), 'vb-status-square', p.className) },
      !overflow ? h(VbIcon, { icon: d.icon || 'info', size: 12, className: 'vb-badge__icon' }) : null, value ? L('vb-badge__value', value) : null);
  }
  function StatusRow(p) {
    var timed = (p.effects || []).filter(function (e) { return e && e.remainingSeconds != null; }), overflow = timed.length > STATUS_ROW_MAX ? timed.length - (STATUS_ROW_MAX - 1) : 0, shown = overflow ? STATUS_ROW_MAX - 1 : timed.length;
    var pop = usePopover(function () { return timed.length ? h(EffectList, { effects: timed }) : null; }, 'above', false, p.pinned);
    if (!timed.length) return null;
    return h(R.Fragment, null, h('div', Object.assign({ ref: pop.ref, className: cx('vb-status-row', pop.open && 'vb-popover-open', p.className), style: p.style, tabIndex: 0, role: 'button', title: 'Statuses · ' + timed.length, 'aria-expanded': pop.open }, pop.handlers),
      timed.slice(0, shown).map(function (e, i) { return h(StatusSquare, { key: e.id || i, view: e }); }), overflow ? h(StatusSquare, { key: 'more', overflow: overflow }) : null), pop.layer);
  }
  /** PopoverCard: popover content with a caps title, an optional hint and flat rows (KeyValueRow) one tone above the surface. */
  function PopoverCard(p) {
    var rows = p.rows || [];
    return h('div', { className: cx('vb-popover-card', p.className), style: p.style },
      p.title ? L('vb-popover-card__title vb-t-label', upper(p.title)) : null, p.hint ? L('vb-t-caption vb-popover-card__hint', p.hint, { whiteSpace: 'normal' }) : null,
      h('div', { className: 'vb-popover-card__rows' }, rows.map(function (r, i) { return h(KeyValueRow, { key: i, label: r.key, value: r.value, good: r.good, className: 'vb-popover-card__row' }); }), p.children));
  }
  /** UnitCard (Units.cs): the portrait battle card. Band (cut-following backdrop and portrait, mode chip), kit bar, body, skills or the fallen note, and the timed statuses as a StatusRow above it.
      A drop in the bound hit points plays the damage edge by itself (`autoDamage`, on by default; a host that raises its own hits sets it false). */
  function UnitCard(p) {
    var v = operative(p.view), fallen = fallenOf(v), mode = fallen ? 'fallen' : kebab(v.mode), ref = R.useRef(null), last = R.useRef(-1);
    var chip = mode === 'manual' ? (v.manualSeconds > 0 ? 'MANUAL ' + seconds(v.manualSeconds) : 'MANUAL') : mode === 'aiming' ? 'AIMING' : '';
    var effects = v.effects || [], exposed = effects.some(function (e) { return e.definition && e.definition.id === 'exposed' && e.activation !== 'expired'; });
    var hp = fallen ? 0 : v.hp;
    R.useEffect(function () {
      if (p.autoDamage !== false && last.current > 0 && hp < last.current && ref.current) edgeFx.damage(ref.current, clamp01((last.current - hp) / Math.max(1, v.maxHp) * 6 + 0.25));
      last.current = hp;
    }, [hp]);
    return h(Shape, { ref: ref, className: cx('vb-operative', st('vb-operative', mode), p.className), style: p.style },
      h('div', { className: 'vb-operative__band' }, h(ClipFill, { className: 'vb-operative__band-fill' }), h(ClipImage, { className: 'vb-operative__portrait', url: v.portrait }), h('div', { className: 'vb-operative__shade' }),
        L('vb-operative__chip', chip, show(chip.length > 0))),
      h('div', { className: 'vb-operative__kit', style: { backgroundColor: v.kit } }),
      h('div', { className: 'vb-operative__body' },
        L('vb-operative__name', Strike(fallen, upper(v.name))),
        h(HealthBar, { hp: hp, max: v.maxHp, barrier: v.barrier, stability: fallen ? 0 : v.stability / Math.max(1, v.maxStability), exposed: exposed }),
        h('div', { className: 'vb-operative__numbers' },
          h('div', { className: 'vb-l vb-operative__hp', style: { fontSize: (String(v.hp) + v.maxHp).length > 7 ? 10 : 11 } }, String(hp), h('span', { style: { color: 'var(--text-3)' } }, '/' + v.maxHp)),
          L('vb-operative__barrier', v.barrier > 0 ? '+' + v.barrier : '', show(v.barrier > 0)))),
      h('div', { className: 'vb-operative__skills', style: show(!fallen) }, [0, 1].map(function (i) {
        return h(SkillButton, { key: i, className: i === 1 ? 'vb-operative__skill-end' : undefined, view: v.skills[i] || OPERATIVE.skills[i], dragging: p.dragging === i, onPointerDown: p.onSkillPointerDown ? function (e) { p.onSkillPointerDown(i, e); } : null });
      })),
      h('div', { className: 'vb-operative__fallen', style: show(fallen) }, L('vb-operative__fallen-title', 'FALLEN'), L('vb-operative__fallen-hint', 'Revive via perk', show(!!v.canRevive))),
      h(StatusRow, { className: 'vb-operative__statuses', effects: fallen ? [] : effects }));
  }

  /** TileComponent (Tile.cs): picture or glyph, name, caption with its glyph, order; `state` combines in | focused, or is locked | empty. */
  function TileComponent(p) {
    var b = p.block || 'vb-tile', state = [].concat(p.state || []).map(kebab), has = function (k) { return state.indexOf(k) >= 0; };
    var locked = has('locked'), empty = has('empty'), order = p.order || 0, glyph = p.glyph && !p.picture;
    return h(Shape, Object.assign({ className: cx(b, has('in') && !locked && b + '--in', has('focused') && b + '--focused', locked && b + '--locked', empty && b + '--empty', p.tier && st(b, p.tier), p.className), style: p.style, title: p.tooltip }, clickable(p.onPick)),
      h('div', { className: b + '__band', style: show(!empty) }, h(ClipFill, { className: b + '__band-fill' }), h(ClipImage, { className: b + '__portrait', url: p.picture }), h('div', { className: b + '__shade' }),
        glyph ? h(VbIcon, { icon: p.glyph, size: 32, className: b + '__glyph' }) : null, L(b + '__order', String(order), show(order > 0 && !locked))),
      h('div', { className: b + '__kit', style: Object.assign({ backgroundColor: p.kit }, show(!empty)) }),
      h('div', { className: b + '__body', style: show(!empty) }, L(b + '__name', upper(p.title)),
        h('div', { className: b + '__role' }, h(VbIcon, { icon: p.captionIcon || '', size: 12 }), L(b + '__role-text', upper(p.caption)))),
      empty ? h('div', { className: b + '__empty' }, h(VbIcon, { icon: 'add', size: 20 }), L(b + '__empty-label', upper(p.emptyLabel))) : null);
  }
  // `tier` none | blue | violet | gold frames the tile; `locked` ("Pull in rifts") says how to get a locked operative.
  function UnitTile(p) {
    var v = operative(p.view), slot = p.slot || 0, locked = p.locked || '', isLocked = locked.length > 0;
    return h(TileComponent, { className: p.className, style: p.style, onPick: p.onPick, tier: p.tier || 'none', picture: v.portrait, kit: v.kit, title: v.name, caption: isLocked ? locked : v.role, captionIcon: isLocked ? 'lock' : v.roleIcon, order: slot,
      state: [slot > 0 && !isLocked && 'in', p.focused && 'focused', isLocked && 'locked'].filter(Boolean),
      tooltip: v.name + ', ' + v.role + (isLocked ? ', locked: ' + locked : slot > 0 ? ', squad slot ' + slot : ', not in squad') });
  }

  // One of the four squad slots: the unit's name alone (the code is not repeated), or the dashed empty slot.
  function UnitSlot(p) {
    var has = !!p.view, v = operative(p.view), slot = p.slot || 0;
    return h(TileComponent, { block: 'vb-slot', className: p.className, style: p.style, onPick: p.onPick, picture: has ? v.portrait : null, kit: v.kit, title: v.name, caption: null, order: has ? slot : 0, state: has ? 'in' : 'empty', emptyLabel: 'SLOT ' + slot });
  }

  /** Markup.Rich as one inline run: a label that is a flex box would lay the text and each emphasis span out as separate items. */
  function rich(text) { var m = markup(text); return typeof m === 'string' ? m : h('span', null, m); }
  /** Markup.Plain: the text with its emphasis marks removed (tooltips). */
  function plain(text) { var m = markup(text); return typeof m === 'string' ? m : m.map(function (x) { return typeof x === 'string' ? x : x.props.children; }).join(''); }
  /** SkillSummary (DataRows.cs): one skill, passive or basic attack: glyph, name, slot and kind, description, and the cost and cooldown where it has them. */
  function SkillSummary(p) {
    var s = Object.assign({}, SKILL, { description: '', fullDescription: '', cooldownSeconds: 0 }, p.view);
    return h('div', { className: 'vb-details__skill', title: plain(s.fullDescription) },
      h(Shape, { className: 'vb-details__skill-icon' }, h(VbIcon, { icon: s.icon, size: 14 })),
      h('div', { className: 'vb-details__skill-text' },
        h('div', { className: 'vb-details__skill-line' }, L('vb-details__skill-name', s.label), L('vb-details__skill-slot', s.slot + ' · ' + upper(s.kind))),
        L('vb-details__skill-desc', rich(s.description))),
      h('div', { className: 'vb-details__skill-cost' }, L('vb-details__skill-power', s.cost > 0 ? String(s.cost) : '', show(s.cost > 0)), L('vb-details__skill-cd', s.cooldownSeconds > 0 ? seconds(s.cooldownSeconds) + ' CD' : '', show(s.cooldownSeconds > 0))));
  }
  /** UnitDetail.Rows: the passive, the basic attack, then the unit's skills; a passive or basic attack the unit does not have is left out. */
  function unitRows(v) {
    var rows = [];
    if (v.passive) rows.push({ label: v.passive, icon: v.passiveIcon || 'info', slot: 'P', kind: 'Passive', description: v.passiveText, fullDescription: v.passiveFullText });
    if (v.basic && v.basic.label) rows.push(v.basic);
    return rows.concat(v.skills || []);
  }

  /** UnitDetail: stats, then the passive, the basic attack and both skills, the lore prompt after them, and add/remove. `showStability` false hides the stability read-out (SquadView does until units differ in it). */
  function UnitDetail(p) {
    var v = operative(p.view), slot = p.slot || 0, inSquad = slot > 0;
    var maxHp = p.maxHp || 1580, maxArmor = p.maxArmor || 26, maxStab = p.maxStability || 140;
    return h(Shape, { className: cx('vb-details', p.className), style: p.style },
      h('div', { className: 'vb-details__head' },
        h('div', { className: 'vb-details__kit', style: { backgroundColor: v.kit } }), L('vb-details__name', upper(v.name)),
        h('div', { className: 'vb-details__role' }, h(VbIcon, { icon: v.roleIcon, size: 14 }), L('vb-details__role-text', upper(v.role))),
        L(cx('vb-details__slot', inSquad && 'vb-details__slot--in'), inSquad ? 'SLOT ' + slot : 'NOT IN SQUAD'),
        h(IconButtonComposite, { icon: 'close', tooltip: 'Close details', size: 16, quiet: true, className: 'vb-details__close', onClick: p.onClose })),
      h('div', { className: 'vb-details__stats' },
        h(StatReadout, { label: 'HEALTH', value: num(v.maxHp), bar: v.maxHp / maxHp }),
        h(StatReadout, { label: 'ARMOR', value: String(v.armor), bar: v.armor / maxArmor, className: 'vb-stat--neutral' }),
        p.showStability === false ? null : h(StatReadout, { label: 'STABILITY', value: String(v.maxStability), bar: v.maxStability / maxStab, className: 'vb-stat--neutral' })),
      h('div', { className: 'vb-details__skills' }, unitRows(v).map(function (s) { return h(SkillSummary, { key: s.slot + '/' + s.kind, view: s }); })),
      v.lore ? h('div', { className: 'vb-details__lore-box' }, h(LabelComponent, { text: 'Lore' }), L('vb-t-body vb-details__lore', v.lore, { whiteSpace: 'normal' })) : null,
      h(ActionRow, { className: 'vb-details__actions' },
        h(VbButton, { className: 'vb-details__toggle', title: inSquad ? 'REMOVE FROM SQUAD' : 'ADD TO SQUAD', icon: inSquad ? 'remove' : 'add', variant: inSquad ? 'danger' : 'light', blocked: !inSquad && p.squadFull ? 'Squad full · remove one first' : '', onClick: p.onToggle })));
  }

  /** UnitStats: a unit's post-run contribution (popover content). FELL WAVE n shows only for a unit that fell. */
  function UnitStats(p) {
    var c = Object.assign({ fellWave: 0, damage: 0, kills: 0, casts: 0, power: 0, share: 0, extraLabel: 'Basics', extraValue: '0' }, p.view), v = operative(c.operative);
    var cells = [['DAMAGE', num(c.damage)], ['KILLS', num(c.kills)], ['SKILLS CAST', num(c.casts)], ['POWER SPENT', num(c.power)], [upper(c.extraLabel), c.extraValue], ['WAVES SURVIVED', c.fellWave > 0 ? String(c.fellWave - 1) : 'ALL']];
    return h(Shape, { className: cx('vb-contribution', p.className) },
      h('div', { className: 'vb-contribution__head' },
        h(Shape, { className: 'vb-contribution__portrait' }, h('div', { className: 'vb-crop', style: img(v.portrait) })),
        h('div', { className: 'vb-contribution__head-text' }, L('vb-contribution__name', upper(v.name)), L('vb-contribution__fell', c.fellWave > 0 ? 'FELL WAVE ' + c.fellWave : '', show(c.fellWave > 0)))),
      h('div', { className: 'vb-contribution__share' },
        h('div', { className: 'vb-contribution__share-line' }, L('vb-contribution__share-label', 'Share of squad damage'), L('vb-contribution__share-value', Math.round(c.share * 100) + '%')),
        h(ProgressBar, { value: c.share, tint: v.kit, className: 'vb-contribution__share-bar' })),
      h('div', { className: 'vb-contribution__grid' }, cells.map(function (kv, i) { return h('div', { key: i, className: 'vb-contribution__cell' }, L('vb-t-badge vb-contribution__key', kv[0]), L('vb-contribution__value', kv[1])); })));
  }

  /** ResultSummary: the unit's name and, when it fell, FELL Wn (a unit still standing says nothing); hover, focus or tap shows UnitStats. */
  function ResultSummary(p) {
    var c = Object.assign({ fellWave: 0 }, p.view), v = operative(c.operative), fell = c.fellWave > 0;
    var pop = usePopover(function () { return h(UnitStats, { view: c }); }, 'above', false, p.pinned);
    return h(Shape, Object.assign({ ref: pop.ref, className: cx('vb-result', fell && 'vb-result--fallen', pop.open && 'vb-popover-open', p.className), tabIndex: 0 }, pop.handlers),
      L('vb-result__name', Strike(fell, upper(v.name))), L('vb-result__fell', fell ? 'FELL W' + c.fellWave : '', show(fell)),
      h('div', { className: 'vb-result__kit', style: { backgroundColor: v.kit } }), pop.layer);
  }

  /* ── Perks ────────────────────────────────────────────────────────────── */
  var PERK = { id: '', name: '', category: '', tag: 'General', icon: 'add', effect: '', now: '', next: '', tier: 'general', art: null, stack: 0, max: 0, waves: [] };
  function perk(p) { return Object.assign({}, PERK, p); }
  function stacks(p, draft) {
    return p.max > 0 ? (draft ? 'STACK ' + (p.stack + 1) + ' / ' + p.max : '×' + p.stack + ' OF ' + p.max) : kebab(p.tier) === 'rare' ? 'RARE DRAW' : p.stack > 1 ? '×' + p.stack : 'REPEATABLE';
  }
  function tier(p) { return st('vb-perk', p.tier); }
  function Crop(url) { return h('div', { className: 'vb-crop', style: Object.assign({}, img(url), show(!!url)) }); }

  /** ProgressBar (Progress.cs): continuous (`value` 0–1) or `segments` levels filled to `value`; `next` outlines the level a pick adds. */
  function ProgressBar(p) {
    var n = p.segments || 0, v = p.value || 0, filled = Math.round(v);
    return h('div', { className: cx('vb-progress', st('vb-progress', p.tone || 'ally'), n > 0 && 'vb-progress--segmented', p.className), style: p.style, role: 'progressbar', 'aria-valuenow': n ? filled : Math.round(clamp01(v) * 100), 'aria-valuemax': n || 100 },
      n > 0 ? Array.apply(null, Array(n)).map(function (_, i) { return h('div', { key: i, className: cx('vb-progress__cell', i < filled && 'vb-progress__cell--on', p.next && i === filled && 'vb-progress__cell--next'), style: p.tint && i < filled ? { backgroundColor: p.tint } : null }); })
        : h('div', { className: 'vb-progress__fill', style: { width: pct(v), backgroundColor: p.tint } }));
  }
  /** KeyValueRow (Progress.cs): a caption key on the left, a value on the right; `good` reads in ally colour. */
  function KeyValueRow(p) { return h('div', { className: cx('vb-kv', p.className), style: p.style }, L('vb-t-caption vb-kv__key', p.label), L(cx('vb-kv__value', p.good && 'vb-kv__value--good'), p.value)); }
  /** ListRow (Progress.cs): glyph, caps title, caption, optional `bar` (ProgressBar props), trailing `value` and `action`. */
  function ListRow(p) {
    return h(Shape, Object.assign({ 'data-motion-item': p.motionId, className: cx('vb-list-row', p.selected && 'vb-list-row--selected', p.className), style: p.style }, p.onPick ? clickable(p.onPick) : null),
      p.lead ? L(cx('vb-list-row__lead', p.leadClass), p.lead) : null, p.icon ? h(VbIcon, { icon: p.icon, size: 20, className: 'vb-list-row__icon' }) : null,
      h('div', { className: 'vb-list-row__text' }, p.children, L('vb-list-row__title', upper(p.title)), p.caption ? L('vb-t-caption vb-list-row__caption', p.caption) : null,
        p.bar ? h(ProgressBar, Object.assign({ className: 'vb-list-row__bar' }, p.bar)) : null),
      p.value ? L(cx('vb-list-row__value', p.valueClass), p.value) : null, p.action ? h(ActionRow, { fixed: true, className: 'vb-list-row__trail' }, p.action) : null);
  }
  /** ChoiceCard (ChoiceCard.cs): one option the player takes by tapping it (a road, an extract choice, a perk); the whole card is the button. A short tag, a centred glyph, a title, a few facts (emphasis marks
      render), rank cells (a road's threat, a perk's levels), the value after the pick and the action word at the foot. `side` single | left | right (a pair cuts its outer corners), `tone` ally | enemy | power
      (the tint and edge). Bind with `road` (a RoadView; `action` defaults to TAKE THIS ROAD) or `perk` (a PerkView; `selected` frames it with brackets), or set the fields directly. `compact` is the card as a cell of a two-column
      grid (no tag, a small glyph, as tall as its content): `owned` binds a perk the run owns (its active value and levels), `offer` a merchant's offer (BUY with the price, SOLD, or the game's reason; with `credits` and `index`) and `sale` a stack the
      merchant buys (SELL with the payout). `dimmed` greys a card that cannot be taken (and `disabled` takes it out of play); `command` names what picking it does (buy-0, sell-perk-id). */
  function choiceTone(kind) { return kind === 'elite' || kind === 'boss' ? 'enemy' : kind === 'merchant' ? 'power' : 'ally'; }
  function ChoiceCard(p) {
    var c = { tag: p.tag, icon: p.icon, title: p.title, text: p.text, next: p.next, action: p.action, rank: p.rank || 0, ranks: p.ranks || 0, rankNext: !!p.rankNext, rankTone: p.rankTone || 'ally', tooltip: p.tooltip, kind: '', tier: '', tone: p.tone ? kebab(p.tone) : '', id: p.motionId };
    if (p.road) {
      var r = p.road; c.kind = kebab(r.kind || 'combat'); c.tone = choiceTone(c.kind); c.icon = r.icon || 'battle'; c.title = r.title; c.text = r.hint;
      c.rank = r.rank || 0; c.ranks = c.rank > 0 ? (r.ranks == null ? 5 : r.ranks) : 0; c.rankTone = 'enemy'; c.action = p.action == null ? 'TAKE THIS ROAD' : p.action; c.tooltip = r.title + ' · ' + r.hint;
    } else if (p.perk) {
      var k = perk(p.perk); c.tier = tier(k); c.icon = k.icon; c.tag = k.tag; c.title = k.name; c.text = k.effect; c.next = k.next === k.effect ? '' : k.next;
      c.rank = k.stack; c.ranks = k.max > 1 ? k.max : 0; c.rankNext = k.stack < k.max; c.action = null; c.tooltip = k.name + ' · ' + stacks(k, true); c.id = k.id;
    }
    var compact = !!p.compact, dimmed = !!p.dimmed, command = p.command;
    if (p.owned) {
      var o = perk(p.owned); compact = true; c.tier = tier(o); c.icon = o.icon; c.tag = ''; c.title = o.name; c.text = o.stack > 1 && !(o.max > 0) ? o.now + ' ×' + o.stack : o.now; c.next = ''; c.rank = o.stack; c.ranks = o.max > 0 ? o.max : 0; c.rankNext = false;
      c.action = null; c.tooltip = o.name + ' · ' + stacks(o, false); c.id = o.id;
    } else if (p.offer) {
      var f = p.offer, q = perk(f.perk), why = !f.taken && !!f.blocked; compact = true; c.tier = tier(q); c.icon = q.icon; c.tag = ''; c.title = q.name; c.text = q.effect; c.next = ''; c.rank = q.stack; c.ranks = q.max > 1 ? q.max : 0; c.rankNext = q.stack < q.max;
      c.action = f.taken ? 'SOLD' : why ? f.blocked : 'BUY ' + f.price; dimmed = !!f.taken || why || (p.credits || 0) < f.price; command = 'buy-' + (p.index || 0); c.tooltip = q.name + ' · ' + q.effect; c.id = f.id || q.id + ':' + (p.index || 0);
    } else if (p.sale) {
      var w = p.sale, z = perk(w.perk); compact = true; c.tier = tier(z); c.icon = z.icon; c.tag = ''; c.title = z.name; c.text = z.now; c.next = ''; c.rank = z.stack; c.ranks = z.max > 1 ? z.max : 0; c.rankNext = false;
      c.action = 'SELL +' + w.payout; command = 'sell-perk-' + z.id; c.tooltip = 'Sell ' + z.name + ' for ' + w.payout + ' credits'; c.id = z.id;
    }
    var side = kebab(p.side || 'single');
    return h(Shape, Object.assign({ 'data-motion-item': c.id, 'data-command': command, className: cx('vb-choice', compact && 'vb-choice--compact', dimmed && 'vb-choice--dimmed', side === 'left' && 'vb-choice--left', side === 'right' && 'vb-choice--right', c.tone && c.tone !== 'default' && 'vb-choice--' + c.tone, c.kind && 'vb-choice--' + c.kind, c.tier, p.selected && 'vb-choice--selected', p.className),
      style: p.style, title: c.tooltip, onFocus: p.onFocus, 'aria-disabled': p.disabled || (p.offer && dimmed) ? true : undefined }, p.disabled || (p.offer && dimmed) ? null : clickable(p.onPick)),
      L('vb-t-badge vb-choice__tag', upper(c.tag || ''), show(!!c.tag)), h(VbIcon, { icon: c.icon || '', size: 28, className: 'vb-choice__glyph' }),
      L('vb-choice__title', upper(c.title || ''), { whiteSpace: 'normal' }), L('vb-t-caption vb-choice__text', rich(c.text), Object.assign({ whiteSpace: 'normal' }, show(!!c.text))),
      c.ranks > 0 ? h(ProgressBar, { className: 'vb-choice__rank', segments: c.ranks, value: c.rank, next: c.rankNext, tone: c.rankTone }) : null, h('div', { className: 'vb-grow' }),
      L('vb-choice__next', c.next || '', Object.assign({ whiteSpace: 'normal' }, show(!!c.next))), L('vb-choice__action', upper(c.action || ''), Object.assign({ whiteSpace: 'normal' }, show(!!c.action))));
  }

  /** StatRow (StatRow.cs): one fact on one row, a KeyValueRow whose key keeps its width and whose value wraps beside it. `icon` before them, `action` (a button) in a trailing slot of one fixed width,
      `bar` (ProgressBar props) under the value, `stacked` puts the value under the key, `dimmed` greys a row that cannot be acted on, `plated` gives it a tone above its parent. `tier` is a perk tier class. */
  function StatRow(p) {
    var hasAction = p.action != null && p.action !== false;
    return h(Shape, { 'data-motion-item': p.motionId, className: cx('vb-kv', 'vb-stat-row', p.tier, p.stacked && 'vb-stat-row--stacked', p.dimmed && 'vb-stat-row--dimmed', p.plated && 'vb-stat-row--plated', p.className), style: p.style },
      h(VbIcon, { icon: p.icon || '', size: 20, className: 'vb-stat-row__icon' }),
      h('div', { className: 'vb-stat-row__text' }, L('vb-t-caption vb-kv__key', p.label), L(cx('vb-kv__value', p.good && 'vb-kv__value--good'), p.value), p.bar ? h(ProgressBar, Object.assign({ className: 'vb-stat-row__bar' }, p.bar)) : null),
      hasAction ? h(ActionRow, { fixed: true, className: 'vb-stat-row__trail' }, p.action) : null);
  }

  function GlitchText(p) {
    var ref = R.useRef(null);   // `reveal` (true or milliseconds): Glitch.Reveal on mount, in place of the in/out/slam projection
    useIsoLayout(function () { if (p.reveal && ref.current) revealPlay(ref.current, p.reveal === true ? 0 : p.reveal); }, []);
    return h('div', { ref: ref, className: cx('vb-glitch', p.reveal ? null : 'vb-web-glitch--' + (p.effect || 'in'), p.className), style: p.style },
      L('vb-glitch__main', p.text),
      h('div', { className: 'vb-glitch__copy vb-glitch__red', 'aria-hidden': true }, p.text),
      h('div', { className: 'vb-glitch__copy vb-glitch__cyan', 'aria-hidden': true }, p.text), Array.apply(null, Array(8)).map(function (_, i) { return h('div', { key: i, className: 'vb-glitch__clip', 'aria-hidden': true, style: { top: (i * 12.5) + '%', height: '12.5%', width: '100%', animationDelay: (i % 3 * -16) + 'ms' } }, h('div', { className: 'vb-glitch__copy vb-glitch__slice', style: { top: (-i * 100) + '%', height: '800%', width: '100%' } }, p.text)); }));
  }
  /** ChipRow (ChipRow.cs): a glyph, a word and a value on one plate with no edge. `view` binds a perk (tinted by its tier; hover, focus or tap shows PerkDetail, `alignEnd`, `pinned`); `static` is a read-only
      chip (the HUD's credits). A chip that is a target has a 44-unit hit area: the plate is 30 and the element's padding makes up the rest. */
  function ChipRow(p) {
    var v = p.view ? perk(p.view) : null, isStatic = !!p.static, text = v ? v.name : p.text, icon = v ? v.icon : p.icon, value = v ? (v.stack > 1 ? '×' + v.stack : '') : p.value == null ? '' : String(p.value);
    var pop = usePopover(function () { return v ? h(PerkDetail, { view: v, draft: false, className: 'vb-chip-row__popover' }) : null; }, 'below', !!p.alignEnd, p.pinned);
    return h('div', Object.assign({ ref: pop.ref, className: cx('vb-chip-row', isStatic && 'vb-chip-row--static', v && tier(v), pop.open && 'vb-popover-open', p.className), style: p.style, tabIndex: isStatic ? undefined : 0, title: p.tooltip || (v ? v.name + ' · ' + v.now : undefined) }, v && !isStatic ? pop.handlers : null),
      h(Shape, { className: 'vb-chip-row__plate' }, h(VbIcon, { icon: icon || '', size: 14 }), text ? L('vb-chip-row__name', upper(text)) : null, value ? L('vb-chip-row__count', value) : null), pop.layer);
  }
  /** ChipRow.Credits(): the run's currency, read only. */
  function CreditsChip(p) { return h(ChipRow, { static: true, icon: 'currency', value: num(p.credits), className: cx('vb-credits', p.className), tooltip: 'Credits · spend at a merchant' }); }

  /** PerkDetail: draft (the value now, if there is one, then after the pick) or owned (active value, stacks, waves picked); each fact is one StatRow. Emphasis marks in the effect render. */
  function perkKnown(value) { return !!value && value !== 'None' && value !== '—'; }
  function PerkDetail(p) {
    var v = perk(p.view), draft = !!p.draft, art = !!v.art;
    var rows = draft ? [['Now', v.now, ''], ['After pick', v.next, '--good']].filter(function (r) { return r[0] !== 'Now' || perkKnown(r[1]); })
      : [['Active', v.now, '--good'], ['Stacks', v.max > 0 ? v.stack + ' / ' + v.max : stacks(v, false), ''], ['Picked', v.waves.length ? v.waves.map(function (w) { return 'wave ' + w; }).join(', ') : '—', '']];
    return h(Shape, { className: cx('vb-perk-detail', tier(v), p.className), style: p.style },
      h('div', { className: 'vb-perk-detail__head' },
        h(Shape, { className: cx('vb-perk-detail__thumb', 'vb-perk-art', art && 'vb-perk-art--portrait') }, Crop(v.art), h(VbIcon, { icon: v.icon, size: 24 })),
        h('div', { className: 'vb-perk-detail__head-text' }, L('vb-perk-detail__name', upper(v.name)), L('vb-perk-detail__tag', upper(v.category + ' · ' + v.tag)))),
      L('vb-perk-detail__effect', rich(v.effect)),
      h('div', { className: 'vb-perk-detail__rows' }, rows.map(function (r) { return h(StatRow, { key: r[0], label: r[0], value: r[1], good: r[2] === '--good', className: 'vb-perk-detail__row' }); })));
  }

  /* ── Carousel (Carousel.cs): the active card takes 64% of the width, its neighbours sit tucked beneath it and tilted; endless both ways ── */
  var CAROUSEL = { active: 0.64, tuck: 0.6, ms: 320, slop: 8, flick: 0.4 };
  /** Carousel.Offset: where card i sits from the position among count cards, wrapped to (-count/2, count/2]. */
  function carouselOffset(i, position, count) { if (count <= 1) return 0; var d = i - position; return d - count * Math.round(d / count); }
  /** Carousel.Pose: the shift, drop, tilt, scale and opacity of a card at offset d in a carousel `width` wide with `depth` cards on a side. */
  function carouselPose(d, width, depth) {
    var a = Math.abs(d), s = d < 0 ? -1 : 1, cw = width * CAROUSEL.active, step = cw * (0.5 + CAROUSEL.tuck * 0.5);
    return { x: s * (step * Math.min(a, 1) + step * 0.55 * Math.max(0, Math.min(a, 2) - 1)), y: Math.min(a, 2) * 7, rotation: Math.max(-14, Math.min(14, d * 7)), scale: 1 - 0.1 * Math.min(a, 2), opacity: (1 - 0.14 * Math.min(a, 2)) * clamp01(depth + 1 - a) };
  }
  /** Carousel.Shortest: the signed step round to target (a tie goes forward). */
  function carouselShortest(current, target, count) { if (count <= 1) return 0; var d = ((target - current) % count + count) % count; return d > count / 2 ? d - count : d; }
  /** Carousel: children are the cards (any element that takes className, style and onFocus, a ChoiceCard for perks). `selected` is the active index; `onChange(i)` reports a swipe (the row follows the finger, settles on
      the nearest card, a flick goes one further), a tap on a card beneath, the arrow keys or focus. It glides in 320 ms on real time and is instant under reduced motion. */
  function Carousel(p) {
    var cards = R.Children.toArray(p.children).filter(Boolean), n = cards.length, rootRef = R.useRef(null), geom = R.useState({ w: 0, h: 0 }), g = geom[0], setGeom = geom[1], tick = R.useState(0)[1];
    var box = R.useRef(null);
    if (!box.current) { var start = Math.max(0, Math.min(Math.max(0, n - 1), p.selected || 0)); box.current = { index: start, position: start, from: 0, to: 0, began: 0, raf: 0, pressed: false, dragging: false, pointer: -1, pressX: 0, pressPosition: 0, lastX: 0, lastTime: 0, velocity: 0, target: -1, suppress: false, bound: false }; }
    var S = box.current; S.n = n; S.onChange = p.onChange;
    function layout() { tick(function (k) { return k + 1; }); }
    function stop() { if (S.raf) { cancelAnimationFrame(S.raf); S.raf = 0; } }
    function frame() {
      var t = Math.min(1, (performance.now() - S.began) / CAROUSEL.ms);
      S.position = S.from + (S.to - S.from) * (1 - Math.pow(1 - t, 3));
      if (t >= 1) { S.raf = 0; S.position = S.index; } else S.raf = requestAnimationFrame(frame);
      layout();
    }
    function moveTo(target, animate) {
      stop(); var count = S.n; if (!count) return; var current = ((S.position % count) + count) % count, step = carouselShortest(Math.round(current) % count, target, count); S.index = target;
      if (!animate) { S.position = target; layout(); return; }
      S.from = S.position; S.to = Math.round(S.position) + step;
      if (S.from === S.to) { S.position = S.index; layout(); return; }
      S.began = performance.now(); S.raf = requestAnimationFrame(frame);
    }
    function calm() { return reducedMotion(rootRef.current); }
    function go(i) { var count = S.n; if (!count) return; i = ((i % count) + count) % count; var other = i !== S.index; moveTo(i, !calm()); if (other && S.onChange) S.onChange(i); }
    function measure() {
      var el = rootRef.current; if (!el) return; var w = el.offsetWidth, hh = 0;
      Array.prototype.forEach.call(el.firstChild.children, function (c) { hh = Math.max(hh, c.offsetHeight); });
      setGeom(function (old) { return Math.abs(old.w - w) > 0.5 || Math.abs(old.h - hh) > 0.5 ? { w: w, h: hh } : old; });
    }
    useIsoLayout(measure);
    useIsoLayout(function () { var el = rootRef.current, obs = window.ResizeObserver ? new ResizeObserver(measure) : null; if (obs && el) obs.observe(el); return function () { if (obs) obs.disconnect(); stop(); }; }, []);
    useIsoLayout(function () {
      if (!n) return; var i = (((p.selected || 0) % n) + n) % n, first = !S.bound; S.bound = true;
      if (i === S.index && (S.raf || S.pressed)) return;
      if (i === S.index && !first && Math.abs(S.position - S.index) < 1e-6) return;
      moveTo(i, !first && !calm());
    }, [p.selected, n]);
    function cardAt(target) { var el = target && target.closest ? target.closest('.vb-carousel__card') : null; return el ? Array.prototype.indexOf.call(rootRef.current.firstChild.children, el) : -1; }
    function release() { var el = rootRef.current; if (S.dragging && el && el.hasPointerCapture && el.hasPointerCapture(S.pointer)) { try { el.releasePointerCapture(S.pointer); } catch (e) { } } S.pressed = false; S.dragging = false; S.pointer = -1; }
    var w = g.w, depth = Math.min(2, Math.floor(n / 2)), cw = Math.round(w * CAROUSEL.active);
    var handlers = {
      onPointerDownCapture: function (e) {
        if (n < 2 || (e.button !== 0 && e.pointerType === 'mouse')) return;
        S.pressed = true; S.dragging = false; S.pointer = e.pointerId; S.pressX = S.lastX = e.clientX; S.pressPosition = S.position; S.velocity = 0; S.lastTime = performance.now(); S.target = cardAt(e.target);
      },
      onPointerMove: function (e) {
        if (!S.pressed || e.pointerId !== S.pointer) return; var dx = e.clientX - S.pressX;
        if (!S.dragging && Math.abs(dx) > CAROUSEL.slop) { S.dragging = true; stop(); S.pressPosition = S.position; try { rootRef.current.setPointerCapture(e.pointerId); } catch (x) { } }
        if (!S.dragging) return;
        var step = Math.max(1, rootRef.current.offsetWidth * CAROUSEL.active * (0.5 + CAROUSEL.tuck * 0.5)), now = performance.now(), dt = Math.max(1 / 60, (now - S.lastTime) / 1000);
        S.velocity += ((S.lastX - e.clientX) / step / dt - S.velocity) * 0.5; S.lastX = e.clientX; S.lastTime = now; S.position = S.pressPosition - dx / step; layout();
      },
      onPointerUp: function (e) {
        if (!S.pressed || e.pointerId !== S.pointer) return; var moved = S.dragging, target = S.target; release();
        if (moved) { S.suppress = true; var settle = S.position + Math.max(-CAROUSEL.flick, Math.min(CAROUSEL.flick, S.velocity * 0.1)); go(((Math.round(settle) % n) + n) % n); }
        else if (target >= 0 && target !== S.index) { S.suppress = true; go(target); }
        if (S.suppress) setTimeout(function () { S.suppress = false; }, 0);
      },
      onPointerCancel: function () { release(); if (n) moveTo(S.index, false); },
      // The carousel takes a swipe or a tap on a card beneath, so the card's own action never fires from it.
      onClickCapture: function (e) { if (S.suppress) { S.suppress = false; e.stopPropagation(); e.preventDefault(); } },
      onKeyDown: function (e) { if (n < 2) return; if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); go(S.index + 1); } else if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); go(S.index - 1); } }
    };
    return h('div', Object.assign({ ref: rootRef, className: cx('vb-carousel', p.className), 'data-motion-item': p.motionId, role: 'group', 'aria-roledescription': 'carousel', tabIndex: 0, style: Object.assign({ touchAction: 'pan-y' }, p.style) }, handlers),
      h('div', { className: 'vb-carousel__stage', style: g.h > 0 ? { height: g.h + 16 } : null }, cards.map(function (card, i) {
        var d = carouselOffset(i, S.position, n), pose = carouselPose(d, w, depth), active = i === S.index;
        return R.cloneElement(card, {
          className: cx(card.props.className, 'vb-carousel__card', active && 'vb-carousel__card--active'),
          onFocus: function () { if (i !== S.index && !S.dragging && !S.pressed) go(i); },
          style: Object.assign({}, card.props.style, w > 0 ? { position: 'absolute', top: 8, width: cw, left: (w - cw) / 2, translate: pose.x + 'px ' + pose.y + 'px', rotate: pose.rotation + 'deg', scale: pose.scale, opacity: pose.opacity, zIndex: 100 - Math.round(Math.abs(d) * 10), pointerEvents: pose.opacity > 0.05 ? undefined : 'none' } : { opacity: 0 })
        });
      })));
  }
  Carousel.pose = carouselPose; Carousel.offset = carouselOffset; Carousel.shortest = carouselShortest;

  function PerkRow(p) {
    var v = perk(p.view);
    return h(ListRow, { className: cx('vb-perk-row', tier(v), p.className), style: p.style, selected: p.selected, onPick: p.onPick || function () { }, icon: v.icon, title: v.name, caption: v.tag + ' · ' + v.effect, value: v.now,
      bar: v.max > 0 ? { segments: v.max, value: v.stack } : null });
  }


  /* ── Pages (Dialogs.cs) ───────────────────────────────────────────────── */
  /** Dialog.Sheet: a solid panel with a title and a line of body text; children are the actions. */
  function Dialog(p) {
    return h(Shape, { className: cx('vb-panel', 'vb-dialog', 'vb-panel--solid', p.className), style: p.style },
      p.title ? L('vb-t-title vb-dialog__title', p.title) : null,
      p.body ? L(cx(p.bodyClass || 'vb-t-caption', 'vb-dialog__body'), p.body) : null, p.children);
  }
  function Backdrop(p) {
    return h('div', { className: cx('vb-backdrop', p.className), style: Object.assign({}, img(p.image), p.style) }, h(Shape, { className: 'vb-backdrop__shade' }), p.children);
  }

  /* ── Holographic menu surfaces (Holo.cs) ──────────────────────────────── */
  function ScanLines(p) { return h('div', { className: cx('vb-scanlines', p && p.className), 'aria-hidden': true }); }
  function calm(el, flashes) { return !!(el && el.closest && el.closest(flashes ? '.vb-reduced-motion, .vb-reduced-flashes' : '.vb-reduced-motion')); }
  /** HoloFrame.FlickerIn: opacity .7 → .25 → .9 → 1 in 60 ms steps; a plain fade under reduced motion or flashes. */
  function HoloFrame(p) {
    var ref = R.useRef(null), t = upper(p.title || '');
    useIsoLayout(function () {
      var el = ref.current; if (!el || p.still) return undefined;
      var steps = calm(el, true) ? [0.25, 0.5, 0.75, 1] : [0.7, 0.25, 0.9, 1]; el.style.opacity = 0;
      var timers = steps.map(function (o, i) { return setTimeout(function () { el.style.opacity = o; }, 60 * (i + 1)); });
      return function () { timers.forEach(clearTimeout); el.style.opacity = ''; };
    }, []);
    return h(Shape, { ref: ref, className: cx('vb-holo', p.className), style: p.style },
      h(ScanLines),
      h('div', { className: 'vb-holo__head', style: show(t.length > 0) },
        L('vb-holo__title vb-holo__title--cyan', t), L('vb-holo__title vb-holo__title--pink', t), L('vb-holo__title', t)),
      h('div', { className: 'vb-holo__body' }, p.children));
  }
  /** The 2D stand-in for a lineup plinth: occupied, selected (brackets) or open (dashed OPEN SLOT). */
  function HoloPlatform(p) {
    var state = kebab(p.state || 'occupied'), open = state === 'open', label = open ? '+ OPEN SLOT' : upper(p.name), sub = open ? 'weight shared' : (p.detail || '');
    return h('div', Object.assign({ className: cx('vb-platform', st('vb-platform', state), st('vb-platform', p.team || 'ally'), p.className), style: p.style, title: open ? 'Open slot' : p.name }, clickable(p.onPick)),
      h(VbIcon, { icon: 'diamond', size: 18, className: 'vb-platform__marker', style: show(p.showMarker !== false && !open) }),
      h('div', { className: 'vb-platform__tag' }, L('vb-platform__label', label), L('vb-platform__sub', sub, show(sub.length > 0))),
      h(Shape, { className: 'vb-platform__plate' }, h(ScanLines)));
  }
  function tierWord(tier, item) {
    tier = kebab(tier);
    return item ? (tier === 'gold' ? 'UNIQUE ITEM' : tier === 'violet' ? 'RARE ITEM' : 'MAGIC ITEM') : (tier === 'gold' ? 'LEGENDARY' : tier === 'violet' ? 'EPIC' : 'RARE');
  }
  /** RevealCard.Flip: an edge-on squash (violet waits 90 ms, gold 180 ms), or at once under reduced motion. */
  function RevealCard(p) {
    var tier = kebab(p.tier || 'blue'), f = R.useState(!!p.flipped), up = f[0], ref = R.useRef(null);
    R.useEffect(function () { f[1](!!p.flipped); }, [p.flipped]);
    function flip() {
      if (up) return; if (p.onFlip) p.onFlip(); var el = ref.current;
      if (!el || calm(el, false)) { f[1](true); return; }
      var wait = tier === 'gold' ? 180 : tier === 'violet' ? 90 : 0;
      setTimeout(function () { el.style.scale = '0.05 1'; }, wait);
      setTimeout(function () { f[1](true); }, wait + 110);
      setTimeout(function () { el.style.scale = ''; }, wait + 130);
    }
    var badge = p.dupe ? upper(p.dupe) : p.isNew !== false ? 'NEW' : '';
    return h('div', Object.assign({ ref: ref, className: cx('vb-reveal', st('vb-reveal', tier), up && 'vb-reveal--flipped', p.className), style: p.style }, clickable(flip)),
      h(Shape, { className: 'vb-reveal__back', style: show(!up) }, h(ScanLines), h(VbMark, { width: 56 })),
      h(Shape, { className: 'vb-reveal__front', style: show(up) },
        L('vb-reveal__tier', p.tierLabel || tierWord(tier, p.item)), L('vb-reveal__name', upper(p.title)), L('vb-reveal__line', p.detail || ''),
        L(cx('vb-reveal__badge', p.dupe && 'vb-reveal__badge--dupe'), badge, show(badge.length > 0))));
  }
  RevealCard.tierWord = tierWord;
  /** One IF … THEN automation rule (RuleView); the toggle raises onToggle(enabled). */
  function RuleRow(p) {
    var init = Object.assign({ index: 1, conditions: [], any: false, action: '', actionRest: '', cost: 0, enabled: true, warning: false, draft: false, note: '' }, p.view);
    var e = R.useState(init.enabled), on = e[0], set = e[1]; R.useEffect(function () { set(init.enabled); }, [init.enabled]);
    function toggle() { set(!on); if (p.onToggle) p.onToggle(!on); }
    var cond = [h('div', { key: 'k', className: 'vb-l vb-rule__keyword' }, 'IF')];
    init.conditions.forEach(function (c, i) {
      if (i) cond.push(h('div', { key: 'j' + i, className: 'vb-l vb-rule__join' }, init.any ? 'OR' : 'AND'));
      cond.push(h('div', { key: 't' + i, className: 'vb-l vb-rule__text' }, c.text)); if (c.value) cond.push(h('div', { key: 'v' + i, className: 'vb-l vb-rule__value' }, c.value)); if (c.after) cond.push(h('div', { key: 'a' + i, className: 'vb-l vb-rule__text' }, c.after));
    });
    return h(ListRow, { className: cx('vb-rule', !on && 'vb-rule--off', init.warning && 'vb-rule--warning', init.draft && 'vb-rule--draft', p.className), style: p.style, lead: String(init.index),
      title: 'THEN ' + init.action + (init.actionRest ? ' ' + init.actionRest : ''), caption: init.note, value: init.cost > 0 ? '−' + init.cost : '', valueClass: 'vb-rule__cost',
      action: h('div', { title: on ? 'Turn rule off' : 'Turn rule on' }, h(VbSwitch, { value: on, onChange: function (x) { if (x !== on) toggle(); }, className: 'vb-rule__toggle vb-switch--compact' })) },
      h('div', { className: 'vb-rule__if' }, cond));
  }


  /* ── World layer (WorldElements.cs); WorldLayer itself places them over a 3D view ── */
  function WorldHealthBar(p) {
    var hp = clamp01(p.health == null ? 1 : p.health), ghost = Math.max(hp, clamp01(p.ghost == null ? hp : p.ghost)), b = Math.min(clamp01(p.barrier), 1 - hp);
    return h('div', { className: cx('vb-world-health', st('vb-world-health', p.team || 'enemy'), st('vb-world-health', p.rank || 'normal'), p.className), style: p.style },
      h('div', { className: 'vb-world-health__ghost', style: { width: pct(ghost) } }),
      h('div', { className: 'vb-world-health__fill', style: Object.assign({ width: pct(hp) }, p.tint ? { backgroundColor: p.tint } : null) }),
      h('div', { className: 'vb-world-health__barrier', style: b > 0 ? { left: pct(hp), width: pct(b) } : { display: 'none' } }));
  }
  function combatText(kind, amount) {
    var n = num(amount);
    switch (kebab(kind)) {
      case 'taken': return '−' + n; case 'crit': return n + '!'; case 'exposed': return 'EXPOSED ' + n; case 'heal': return '+' + n;
      case 'barrier': return 'BLOCKED ' + n; case 'power': return '+' + n + ' POWER'; case 'miss': return 'MISS'; case 'execute': return 'EXECUTE ' + n; case 'break': return 'BREAK';
      default: return n;
    }
  }
  function CombatText(p) { var k = kebab(p.kind || 'damage'); return L(cx('vb-combat-text', st('vb-combat-text', k), p.className), combatText(k, p.amount), p.style); }
  CombatText.format = combatText;
  function WorldLabel(p) {
    // WorldLabel.Bind: an elite is one line (a diamond mark, then the trait); labels merged by group key read "TITLE ×n" and drop the detail.
    var k = kebab(p.kind || 'name'), elite = k === 'elite', n = p.count > 1 ? p.count : 0;
    var d = elite || n ? '' : p.detail || '', title = elite && p.detail ? p.detail : p.title || '';
    return h('div', { className: cx('vb-world-label', st('vb-world-label', k), st('vb-world-label', p.team || 'ally'), p.className), style: p.style },
      h(VbIcon, { icon: 'diamond', size: 8, className: 'vb-world-label__mark', style: show(elite) }),
      L('vb-world-label__title', (k === 'blocked' ? '× ' : '') + title + (n ? ' ×' + n : '')), L('vb-world-label__detail', d, show(d.length > 0 && p.showDetail !== false)));
  }
  function WorldMarker(p) {
    var k = kebab(p.kind || 'ally');
    return h('div', { className: cx('vb-world-marker', st('vb-world-marker', k), p.className), style: Object.assign({}, p.size > 0 ? { width: p.size, height: p.size } : null, p.style) },
      h(VbIcon, { icon: k === 'enemy' ? 'diamond' : 'circle', className: 'vb-world-marker__glyph', style: { width: '100%', height: '100%' } }));
  }
  /** `angle`: degrees clockwise from screen-right toward the fighter (WorldLayer.Pin). */
  function OffscreenIndicator(p) {
    var m = p.metres == null ? -1 : p.metres;
    return h('div', { className: cx('vb-offscreen', st('vb-offscreen', p.team || 'enemy'), p.threat && 'vb-offscreen--threat', p.className), style: p.style },
      h(VbIcon, { icon: 'chevron', size: 12, className: 'vb-offscreen__arrow', style: { rotate: (p.angle || 0) + 'deg' } }),
      L('vb-offscreen__name', p.name || ''), L('vb-offscreen__distance', m >= 0 ? Math.round(m) + 'm' : '', show(m >= 0)));
  }

  /** The breach band: chevrons over the bottom (or `top`) edge; `urgency` 0 hides it, above 2/3 it runs hot. Static here (the Unity element ripples). */
  function EdgeWarning(p) {
    var u = p.urgency == null ? 1 : p.urgency;
    return h('div', { className: cx('vb-edge-warning', p.top && 'vb-edge-warning--top', u > 0.66 && 'vb-edge-warning--hot', p.className), style: Object.assign({ display: u > 0 ? 'flex' : 'none' }, p.style) },
      h('div', { className: 'vb-edge-warning__row' }, [0, 1, 2, 3, 4].map(function (i) {
        return h(VbIcon, { key: i, icon: 'chevron', size: 14, className: 'vb-edge-warning__chevron', style: { opacity: 0.35 + 0.65 * (1 - Math.abs(i - 2) / 2) } });
      })),
      L('vb-edge-warning__caption', p.caption || ''));
  }

  /** RouteChoice: two roads as a mirrored pair of ChoiceCards (the left one cut and aligned to the left, the right one to the right); the whole card is the target and only one choice is accepted. */
  function RouteChoice(p) {
    var v = p.view || {}, locked = R.useRef(false); R.useEffect(function () { locked.current = false; }, [v.wave]);
    return h('div', { className: cx('vb-route', p.className), style: p.style }, L('vb-t-label vb-route__eyebrow', 'CROSSROADS · WAVE ' + pad2(v.wave)), h(GlitchText, { text: 'CHOOSE YOUR ROAD', className: 'vb-t-display vb-route__title' }),
      h('div', { className: 'vb-route__roads' }, [v.left || {}, v.right || {}].map(function (road, side) {
        return h(ChoiceCard, { key: side, motionId: side, side: side ? 'right' : 'left', road: road, onPick: function () { if (!locked.current && p.onChoose) { locked.current = true; p.onChoose(side); } } });
      })));
  }
  /** MerchantScreen: the rare finds and the stacks to sell, each a compact ChoiceCard in a two-column grid (the whole card is the button: BUY with the price or SELL with the payout), the health trades, each a plated stacked
      StatRow with a 44-unit danger action, and LEAVE MARKET. An offer that cannot be bought is dimmed and out of play, with no second price; a section with nothing in it does not show; a sale pays in credits. */
  function MerchantScreen(p) {
    var v = Object.assign({ credits: 0, offers: [], stacks: [], health: [] }, p.view);
    function section(t) { return h(LabelComponent, { key: 's' + t, text: t, className: 'vb-merchant__section' }); }
    return h('div', { className: cx('vb-merchant', p.className), style: p.style },
      h('div', { className: 'vb-merchant__head' }, L('vb-t-title', 'NIGHT MARKET'), h(CreditsChip, { credits: v.credits })),
      h(ListLayout, { className: 'vb-merchant__scroll' },
        section('Rare finds'), h('div', { key: 'o', className: 'vb-grid vb-grid--2 vb-grid--wrap vb-merchant__offers' }, v.offers.map(function (o, i) {
          return h(ChoiceCard, { key: o.id || o.perk.id + ':' + i, offer: o, index: i, credits: v.credits, className: 'vb-merchant__offer', onPick: function () { call(p.onBuy)(i); } });
        })),
        v.stacks.length ? section('Sell stacks') : null, v.stacks.length ? h('div', { key: 'k', className: 'vb-grid vb-grid--2 vb-grid--wrap vb-merchant__stacks' }, v.stacks.map(function (k) {
          return h(ChoiceCard, { key: k.perk.id, sale: k, className: 'vb-merchant__stack', onPick: function () { call(p.onSellPerk)(k.perk.id); } });
        })) : null,
        section('Trade health · 25% max HP'), v.health.map(function (x) {
          return h(StatRow, { key: 'h' + x.actor, className: 'vb-merchant__trade', plated: true, stacked: true, icon: 'health', label: upper(x.name), value: x.hp + ' / ' + x.maxHp + ' HP → ' + Math.max(0, x.hp - x.cost) + ' HP', bar: { value: x.hp / Math.max(1, x.maxHp) },
            action: h(VbButton, { title: '+' + x.payout, icon: 'currency', variant: 'danger', blocked: x.blocked || '', onClick: function () { call(p.onSellHealth)(x.actor); } }) });
        })),
      h(VbButton, { title: 'LEAVE MARKET', variant: 'primary', icon: 'chevron', className: 'vb-merchant__leave', onClick: p.onLeave }));
  }


  /* ── Text, label, badge, icon button, card (Text.cs, Badge.cs, IconButton.cs, Card.cs) ── */
  /** TextComponent: one type style (display | title | label | badge | body | caption | num) and a tone (ally | enemy | power | muted). */
  function TextComponent(p) {
    var tone = p.tone && kebab(p.tone) !== 'default' ? 'vb-t-' + kebab(p.tone) : null;
    return h('div', { className: cx('vb-l', 'vb-text', 'vb-t-' + kebab(p.typeStyle || 'body'), tone, p.className), style: p.style }, p.text != null ? p.text : p.children);
  }
  /** LabelComponent: the caps eyebrow (size label | badge | large); uppercases what it is given and keeps 4 under it. */
  function LabelComponent(p) {
    var size = kebab(p.size); return h(TextComponent, { typeStyle: size === 'badge' ? 'badge' : size === 'large' ? 'label-lg' : 'label', tone: p.tone, className: cx('vb-label', p.className), style: p.style, text: upper(p.text) });
  }
  /** BadgeComponent: a slim chip with a word, an optional glyph and value; tones neutral | ally | enemy | power | warn | inverted. */
  function BadgeComponent(p) {
    var value = p.value == null ? '' : String(p.value);
    return h(Shape, { className: cx('vb-badge', st('vb-badge', p.tone || 'neutral'), p.className), style: p.style, title: p.tooltip },
      p.icon ? h(VbIcon, { icon: p.icon, size: 12, className: 'vb-badge__icon' }) : null,
      p.text ? L('vb-badge__text', upper(p.text)) : null, value ? L('vb-badge__value', value) : null, p.children);
  }
  /** IconButtonComposite: a 44 × 44 chipped square with one glyph (or a short state) and a tooltip; `active` and `quiet` looks. */
  function IconButtonComposite(p) {
    return h(Shape, Object.assign({ className: cx('vb-icon-button', p.active && 'vb-icon-button--active', p.quiet && 'vb-icon-button--quiet', p.className), style: p.style,
      title: p.tooltip, 'aria-label': p.tooltip, 'aria-pressed': p.active == null ? undefined : !!p.active }, clickable(p.onClick), p.dom, p.anchorRef ? { ref: p.anchorRef } : null),
      p.icon ? h(VbIcon, { icon: p.icon, size: p.size || 20, className: 'vb-icon-button__icon' }) : null,
      p.text ? L(cx('vb-icon-button__text', p.textClass), p.text) : null);
  }
  /** VbFrame with a kind: slim (containers) or chipped (what you act on). */
  function frameClass(kind) { kind = kebab(kind || ''); return kind === 'slim' ? 'vb-frame--slim' : kind === 'chipped' ? 'vb-frame--chipped' : null; }
  /** CardComponent: slim frame, optional media band, head (title + meta), body (children), foot (actions, right-aligned). */
  function CardComponent(p) {
    var foot = [].concat(p.actions || []).filter(Boolean);
    return h(Shape, { className: cx('vb-card', p.selected && 'vb-card--selected', p.className), style: p.style },
      p.media ? h('div', { className: 'vb-card__media' }, p.media) : null,
      p.title || p.meta ? h('div', { className: 'vb-card__head' }, h(LabelComponent, { text: p.title || '', className: 'vb-card__title' }), p.meta ? L('vb-t-badge vb-card__meta', p.meta) : null) : null,
      h('div', { className: 'vb-card__body' }, p.children),
      foot.length ? h('div', { className: 'vb-card__foot' }, foot) : null);
  }

  /* ── Field, form (Forms.cs) ── */
  /** FieldComposite: a caps label, the input (children) and one help line. */
  function FieldComposite(p) {
    return h('div', { className: cx('vb-field', p.className), style: p.style },
      p.label ? h(LabelComponent, { text: p.label, size: 'badge', className: 'vb-field__label' }) : null,
      h('div', { className: 'vb-field__input' }, p.children),
      p.help ? L('vb-t-caption vb-field__help', p.help) : null);
  }
  /** Ui.Section: a titled fieldset (vb-section) for FormComposite. */
  function Fieldset(p) {
    return h(Shape, { className: cx('vb-panel', 'vb-section', p.className), style: p.style }, h(LabelComponent, { text: p.title, className: 'vb-section__title' }), p.children);
  }
  /** FormComposite: fieldsets (children) in a scroll, an optional `note` { icon, text }, a `footer` of actions and a `saved` line. */
  function FormComposite(p) {
    var footer = [].concat(p.footer || []).filter(Boolean);
    return h('div', { className: cx('vb-form', p.className), style: p.style },
      p.saved && !p.headed ? L('vb-t-badge vb-form__status', p.saved) : null,
      h('div', { className: 'vb-form__scroll vb-page__scroll', style: { overflowY: 'auto' } },
        h('div', { className: 'vb-u-scroll-view__content-container' }, p.children,
          p.note ? h(Shape, { className: 'vb-panel vb-panel--raised vb-form__note' }, h(VbIcon, { icon: p.note.icon || 'info', size: 16 }), L('vb-t-caption', p.note.text)) : null)),
      footer.length ? h('div', { className: 'vb-form__footer' }, footer) : null);
  }

  /* ── Layouts (Layouts.cs) ── */
  /** ActionRow: buttons that fill the row, an equal share each with 8 between; stacks below minItemWidth (112) per child.
      `fixed` keeps one width (trailing BUY and SELL), `single` keeps one line at any width (buttons lose their glyph, labels may wrap). */
  var ACTION_GAP = 8;
  function ActionRow(p) {
    var ref = R.useRef(null), stack = R.useState(false), stacked = stack[0], setStacked = stack[1];
    var kids = [].concat(p.children == null ? [] : p.children).filter(function (c) { return c != null && c !== false; });
    var min = p.minItemWidth == null ? 112 : p.minItemWidth, single = !!p.single, fixed = !!p.fixed;
    useIsoLayout(function () {
      var el = ref.current; if (!el) return;
      function arrange() {
        var n = Array.prototype.filter.call(el.children, function (c) { return getComputedStyle(c).display !== 'none'; }).length, w = el.offsetWidth;
        Array.prototype.forEach.call(el.children, function (c, i) { c.classList.toggle('vb-action-row__first', c === Array.prototype.find.call(el.children, function (x) { return getComputedStyle(x).display !== 'none'; })); });
        setStacked(!fixed && !single && w > 0 && n > 1 && w < n * min + (n - 1) * ACTION_GAP - 0.5);
      }
      arrange(); var obs = window.ResizeObserver ? new ResizeObserver(arrange) : null; if (obs) obs.observe(el);
      return function () { if (obs) obs.disconnect(); };
    }, [fixed, single, min, kids.length]);
    return h('div', { ref: ref, className: cx('vb-action-row', stacked && 'vb-action-row--stacked', fixed && 'vb-action-row--fixed', single && 'vb-action-row--single', p.className), style: p.style },
      single ? kids.map(function (c, i) { return c && c.type === VbButton ? R.cloneElement(c, { key: i, compact: true }) : c; }) : kids);
  }
  function StackLayout(p) { var g = p.gap <= 4 ? 4 : p.gap <= 8 || p.gap == null ? 8 : p.gap <= 12 ? 12 : 16; return h('div', { className: cx('vb-stack', 'vb-stack--' + g, p.className), style: p.style }, p.children); }
  function ListLayout(p) {
    var kids = R.Children.toArray(p.children);
    return h('div', { className: cx('vb-list-scroll vb-page__scroll', p.className), style: Object.assign({ overflowY: 'auto' }, p.style) },
      p.empty && !kids.length ? L('vb-t-caption vb-list__empty', p.empty) : null, h('div', { className: 'vb-list' }, kids));
  }
  function VbGrid(p) { var n = p.columns <= 2 ? 2 : p.columns >= 4 || p.columns == null ? 4 : 3; return h('div', { className: cx('vb-grid', 'vb-grid--' + n, p.wrap && 'vb-grid--wrap', p.className), style: p.style }, p.children); }
  var BoardLayout=R.forwardRef(function BoardLayout(p,ref) {
    return h('div', { ref:ref, className: cx('vb-board', p.className), style: p.style },
      h('div', { className: 'vb-board__top' }, p.top), h('div', { className: 'vb-board__world' }, p.world), h('div', { className: 'vb-board__bottom' }, p.bottom));
  });

  /* ── Bottom drawer (Drawer.cs) ── */
  /** DrawerOverlay: a slim sheet that slides up over a backdrop to the height of its content (at most 90% of the screen, snap `fit`). Drag the grip or head: up snaps to the full
      screen, down back to the content height or, below a quarter, closes it; a tap on the grip toggles full and back. `snap: 'half'` (half the screen) is opt-in. The backdrop and × dismiss it too.
      `open` (default true) slides it in and out; `snap` 'fit' | 'half' | 'full' is where it opens; `backdrop: false` docks it in a view. The foot is an ActionRow. */
  var DRAWER_FIT_SLOP = 24;
  /** DrawerOverlay.SnapFor: where a released sheet of height h settles in a drawer `full` tall: below a quarter closes (null); a half drawer settles on half or full;
      a fit drawer settles on full when pulled more than 24 above its content height `fit` (or, dragged from full, stays above three quarters), otherwise back on fit. */
  function drawerSnapFor(hgt, full, from, rest, fit) {
    if (hgt < full * 0.25) return rest;
    if (rest === 'half') return hgt < full * 0.75 ? 'half' : 'full';
    return from === 'full' ? (hgt < full * 0.75 ? 'fit' : 'full') : (hgt > fit + DRAWER_FIT_SLOP ? 'full' : 'fit');
  }
  function DrawerOverlay(p) {
    var want = p.open !== false, dismissible = p.dismissible !== false, hasBackdrop = p.backdrop !== false, closeButton = p.closeButton !== false && dismissible;
    var sh = R.useState(false), shown = sh[0], setShown = sh[1], sn = R.useState(p.snap || 'fit'), snap = sn[0], setSnapState = sn[1];
    var dh = R.useState(null), dragH = dh[0], setDragH = dh[1], live = R.useState(want), mounted = live[0], setMounted = live[1];
    var root = R.useRef(null), sheet = R.useRef(null), d = R.useRef(null);
    var rest = p.snap === 'half' ? 'half' : 'fit';
    function setSnap(v) { setSnapState(v); if (p.onSnap) p.onSnap(v); }
    var closing=R.useRef(false),release=R.useRef(null),focusBefore=R.useRef(null),serial=R.useRef(0);
    function exit(){if(closing.current)return;closing.current=true;var id=++serial.current;playMotion(sheet.current,'drawerOut',0,true).then(function(){if(id!==serial.current)return;setShown(false);setMounted(false);setDragH(null);closing.current=false;if(release.current){release.current();release.current=null;}if(focusBefore.current&&focusBefore.current.isConnected)focusBefore.current.focus();});}
    useIsoLayout(function(){if(!mounted||!root.current)return;if(!release.current&&hasBackdrop){release.current=coverSiblings(root.current);focusBefore.current=document.activeElement;}var id=++serial.current;closing.current=false;setShown(true);playMotion(sheet.current,'drawerIn');if(hasBackdrop&&sheet.current)sheet.current.focus();return function(){if(id===serial.current)serial.current++;};},[mounted]);
    R.useEffect(function(){if(want){serial.current++;closing.current=false;setMounted(true);setSnapState(p.snap||'fit');if(mounted){setShown(true);playMotion(sheet.current,'drawerIn');}}else if(mounted)exit();},[want]);
    R.useEffect(function(){return function(){serial.current++;if(release.current)release.current();var a=sheet.current&&runningMotion.get(sheet.current);if(a)a.cancel();};},[]);
    function dismiss(){if(!dismissible||closing.current)return false;exit();if(p.onDismiss)p.onDismiss();return true;}
    function drag(isGrip) {
      return {
        onPointerDown: function (e) { if (!shown) return; d.current = { y: e.clientY, h: sheet.current.offsetHeight, moved: false, grip: isGrip, from: snap, fit: snap === 'full' ? 0 : sheet.current.offsetHeight }; e.currentTarget.setPointerCapture(e.pointerId); },
        onPointerMove: function (e) {
          var g = d.current; if (!g) return; var dy = e.clientY - g.y; if (Math.abs(dy) > 4) g.moved = true; if (!g.moved) return;
          var full = root.current.offsetHeight; setDragH(Math.max(dismissible ? 0 : Math.min(g.h, full / 2), Math.min(full, g.h - dy)));
        },
        onPointerUp: function () {
          var g = d.current; d.current = null; if (!g) return;
          if (!g.moved) { if (g.grip) setSnap(snap === 'full' ? rest : 'full'); setDragH(null); return; }
          var full = root.current.offsetHeight, hgt = dragH == null ? g.h : dragH;
          if (hgt < full * 0.25 && dismiss()) return;   // keep the let-go height while it slides away
          setSnap(drawerSnapFor(hgt, full, g.from, rest, g.fit)); setDragH(null);
        },
        onPointerCancel: function () { d.current = null; setDragH(null); }
      };
    }
    if (!mounted && !want) return null;
    var dragging = dragH != null && !!d.current, head = p.title || p.meta || closeButton, foot = [].concat(p.actions || []).filter(Boolean);
    return h('div', { ref: root, 'data-overlay-root': '', className: cx('vb-drawer', shown && 'vb-drawer--open', snap === 'full' && 'vb-drawer--full', snap === 'half' && 'vb-drawer--half', dragging && 'vb-drawer--dragging', !hasBackdrop && 'vb-drawer--inline', p.className), style: Object.assign({ pointerEvents: hasBackdrop && mounted ? 'auto' : 'none' }, p.style) },
      hasBackdrop ? h('div', { className: 'vb-drawer__backdrop', onPointerDown: dismiss }) : null,
      h(Shape, { ref: sheet, className: 'vb-drawer__sheet', role: 'dialog', tabIndex: -1, onKeyDown:function(e){if(e.key==='Escape'){e.stopPropagation();dismiss();}if(e.key==='Tab'&&hasBackdrop){var nodes=Array.from(sheet.current.querySelectorAll('button:not(:disabled),input,select,textarea,[tabindex="0"]'));if(!nodes.length){e.preventDefault();return;}var first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&(document.activeElement===first||document.activeElement===sheet.current)){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===sheet.current)){e.preventDefault();first.focus();}}}, 'aria-modal': hasBackdrop || undefined, 'aria-label': p.title || p.label, style: Object.assign({ pointerEvents: 'auto' }, dragH != null ? { height: dragH } : null) },
        h('div', Object.assign({ className: 'vb-drawer__grip', role: 'button', tabIndex: 0, 'aria-label': snap === 'full' ? 'Fit to content' : 'Full screen', title: 'Drag up for full screen, down to close', style: { touchAction: 'none', cursor: 'grab' },
          onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSnap(snap === 'full' ? rest : 'full'); } } }, drag(true)), h('div', { className: 'vb-drawer__handle' })),
        head ? h('div', Object.assign({ className: 'vb-drawer__head', style: { touchAction: 'none' } }, drag(false)),
          p.title ? L('vb-t-title vb-drawer__title', upper(p.title)) : h('div', { className: 'vb-drawer__title' }), p.meta ? L('vb-t-badge vb-drawer__meta', p.meta) : null,
          closeButton ? h('div', { onPointerDown: function (e) { e.stopPropagation(); } }, h(IconButtonComposite, { icon: 'close', tooltip: 'Close', className: 'vb-drawer__close', onClick: dismiss })) : null) : null,
        h('div', { className: 'vb-drawer__body vb-page__scroll', style: { overflowY: 'auto' } }, p.children),
        foot.length ? h(ActionRow, { className: 'vb-drawer__foot' }, foot) : null));
  }

  /* ── Views (Runtime/Views) ── */
  function View(block, p, kids, headed, overlay) { return h(MotionSurface, { overlay: overlay, className: cx('vb-view', block, headed && 'vb-view--headed', p.className), style: p.style }, kids); }
  function call(fn) { return function () { if (fn) fn.apply(null, arguments); }; }
  /** MenuActionsSectionView: checkpoint card (when there is one), PLAY, then one single row: HIGH SCORES filling it and SETTINGS an icon-only cog. */
  function MenuActionsSectionView(p) {
    var c = p.checkpoint;
    return h('div', { className: cx('vb-menu-actions', p.className), style: p.style },
      c ? h(CardComponent, { title: 'CHECKPOINT', meta: 'WAVE ' + pad2(c.wave), className: 'vb-menu__checkpoint', actions: h(VbButton, { title: 'RESUME', icon: 'play', onClick: call(p.onResume) }) },
        L('vb-menu__checkpoint-line', 'Wave ' + pad2(c.wave) + ' next · ' + num(c.score)),
        L('vb-t-caption', (c.standing == null ? 4 : c.standing) + ' of ' + (c.squadSize || 4) + ' standing · ' + (c.perks || 0) + (c.perks === 1 ? ' perk' : ' perks') + (c.seed ? ' · seed ' + c.seed : ''))) : null,
      h(VbButton, { title: 'PLAY', variant: 'primary', sub: p.squadLine || '', icon: 'chevron', className: 'vb-menu__play', onClick: call(p.onPlay) }),
      h(ActionRow, { single: true, className: 'vb-menu__row' }, h(VbButton, { title: 'HIGH SCORES', icon: 'ranked', onClick: call(p.onScores) }), h(VbButton, { title: 'Settings', icon: 'cog', iconOnly: true, onClick: call(p.onSettings) })),
      p.notice ? L('vb-t-caption vb-menu__notice', p.notice) : null);
  }
  /** MainMenuView: the offline badge, best and the EXIT icon button, the mark and the menu actions. `view`: MainMenuViewModel. */
  function MainMenuView(p) {
    var v = Object.assign({ status: 'OFFLINE · LOCAL SCORES', subtitle: 'ARCADE', notice: '', best: 0, bestWave: 0, checkpoint: null, squad: [], canExit: true }, p.view);
    return View('vb-menu', p, [
      h('div', { key: 't', className: 'vb-menu__top' }, L('vb-t-badge', v.status), h('div', { className: 'vb-menu__right' }, v.best > 0 ? h(BadgeComponent, { text: 'BEST', value: num(v.best), className: 'vb-menu__best' }, v.bestWave ? L('vb-t-badge vb-t-ally vb-menu__best-wave', 'WAVE ' + v.bestWave) : null) : null,
        v.canExit ? h(IconButtonComposite, { icon: 'close', tooltip: 'Exit game', quiet: true, className: 'vb-menu__exit', onClick: call(p.onExit) }) : null)),
      h('div', { key: 'b', className: 'vb-menu__brand' }, h(VbMark, { width: 240 }), v.subtitle ? L('vb-menu__arcade', upper(v.subtitle)) : null),
      h('div', { key: 'g', className: 'vb-grow' }),
      h(MenuActionsSectionView, { key: 'a', checkpoint: v.checkpoint, squadLine: v.squad.length ? 'Squad · ' + v.squad.join(' · ') : 'Choose a squad', notice: v.notice, onPlay: p.onPlay, onResume: p.onResume, onScores: p.onScores, onSettings: p.onSettings })]);
  }
  /** ReorderManipulator (Input/ReorderManipulator.cs): reorder a container's children by dragging past a slop or holding one still for 0.35 s (a selection-ringed ghost over the page dims the child; the child under it
      is the drop slot; the ghost glides into the slot, or goes at once under reduced motion), or with Alt+arrow on a focused child (focus follows it). It never moves a child: `onReorder(from, to)` reports and the host binds again. */
  function useReorder(ref, canLift, onReorder) {
    var latest = R.useRef({}); latest.current = { canLift: canLift, onReorder: onReorder };
    useIsoLayout(function () {
      var el = ref.current; if (!el) return;
      var S = { pointer: -1, from: -1, over: -1, lifted: false, px: 0, py: 0, x: 0, y: 0, ghost: null, hold: 0, swallow: false };
      function kids() { return Array.prototype.slice.call(el.children); }
      function indexAt(x, y) {
        var best = -1, bd = Infinity, list = kids();
        for (var i = 0; i < list.length; i++) {
          var r = list[i].getBoundingClientRect(); if (!(r.width > 0 && r.height > 0)) continue;
          if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return i;
          var d = Math.pow(r.left + r.width / 2 - x, 2) + Math.pow(r.top + r.height / 2 - y, 2); if (d < bd) { bd = d; best = i; }
        }
        return best;
      }
      function mark(i) { var list = kids(); if (S.over >= 0 && list[S.over]) list[S.over].classList.remove('vb-reorder-over'); S.over = i; if (i !== S.from && list[i]) list[i].classList.add('vb-reorder-over'); }
      function place() { var b = kids()[S.from].getBoundingClientRect(); S.ghost.style.left = (b.left + S.x - S.px) + 'px'; S.ghost.style.top = (b.top + S.y - S.py) + 'px'; }
      function lift() {
        clearTimeout(S.hold); var list = kids(), child = list[S.from]; if (!child) return; S.lifted = true; S.over = S.from; try { el.setPointerCapture(S.pointer); } catch (e) { }
        child.classList.add('vb-reorder-source'); var b = child.getBoundingClientRect(); S.ghost = document.createElement('div'); S.ghost.className = 'vb-reorder-ghost'; S.ghost.style.width = b.width + 'px'; S.ghost.style.height = b.height + 'px'; document.body.appendChild(S.ghost);
        S.ghost.style.left = b.left + 'px'; S.ghost.style.top = b.top + 'px'; mark(S.from);
      }
      function unlift() { var list = kids(); if (list[S.from]) list[S.from].classList.remove('vb-reorder-source'); if (list[S.over]) list[S.over].classList.remove('vb-reorder-over'); if (S.ghost && S.ghost.parentNode) S.ghost.parentNode.removeChild(S.ghost); S.ghost = null; S.lifted = false; S.over = -1; }
      function forget() { clearTimeout(S.hold); S.pointer = -1; S.from = -1; S.lifted = false; }
      function settle(to) {
        var plate = S.ghost, list = kids(), id = S.pointer; S.ghost = null; unlift(); forget(); try { if (el.hasPointerCapture(id)) el.releasePointerCapture(id); } catch (e) { }
        if (!plate) return; if (to < 0 || !list[to] || reducedMotion(el) || !plate.animate) { if (plate.parentNode) plate.parentNode.removeChild(plate); return; }
        document.body.appendChild(plate); var end = list[to].getBoundingClientRect(), from = plate.getBoundingClientRect();
        plate.animate([{ left: from.left + 'px', top: from.top + 'px', opacity: 1 }, { left: end.left + 'px', top: end.top + 'px', opacity: 0 }], { duration: 200, easing: 'ease-out', fill: 'forwards' }).finished.then(function () { if (plate.parentNode) plate.parentNode.removeChild(plate); }, function () { if (plate.parentNode) plate.parentNode.removeChild(plate); });
      }
      function down(e) {
        if ((e.button !== 0 && e.pointerType === 'mouse') || S.pointer >= 0) return; var i = indexAt(e.clientX, e.clientY);
        if (i < 0 || (latest.current.canLift && !latest.current.canLift(i))) return;
        S.pointer = e.pointerId; S.from = i; S.px = S.x = e.clientX; S.py = S.y = e.clientY; S.lifted = false; clearTimeout(S.hold); S.hold = setTimeout(function () { if (S.pointer >= 0 && !S.lifted) lift(); }, 350);
      }
      function move(e) {
        if (e.pointerId !== S.pointer) return; S.x = e.clientX; S.y = e.clientY;
        if (!S.lifted) { if (Math.pow(S.x - S.px, 2) + Math.pow(S.y - S.py, 2) < 64) return; lift(); }
        place(); var i = indexAt(S.x, S.y); if (i >= 0) mark(i); e.preventDefault();
      }
      function up(e) {
        if (e.pointerId !== S.pointer) return; S.x = e.clientX; S.y = e.clientY; if (!S.lifted) { forget(); return; }
        var to = indexAt(S.x, S.y); if (to < 0) to = S.over >= 0 ? S.over : S.from; var source = S.from; settle(to); S.swallow = true; setTimeout(function () { S.swallow = false; }, 0);
        if (to !== source && latest.current.onReorder) latest.current.onReorder(source, to);
      }
      function cancel(e) { if (e.pointerId !== S.pointer) return; unlift(); forget(); }
      function click(e) { if (S.swallow) { S.swallow = false; e.stopPropagation(); e.preventDefault(); } }
      function key(e) {
        if (!e.altKey) return; var step = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : 0; if (!step) return;
        var list = kids(), index = -1; list.forEach(function (c, i) { if (c.contains(document.activeElement)) index = i; });
        var to = index + step; if (index < 0 || to < 0 || to >= list.length || (latest.current.canLift && !latest.current.canLift(index)) || !latest.current.onReorder) return;
        e.preventDefault(); latest.current.onReorder(index, to); setTimeout(function () { var moved = kids()[to]; if (moved && moved.focus) moved.focus(); }, 0);
      }
      el.addEventListener('pointerdown', down, true); el.addEventListener('pointermove', move, true); el.addEventListener('pointerup', up, true); el.addEventListener('pointercancel', cancel, true); el.addEventListener('click', click, true); el.addEventListener('keydown', key);
      return function () { el.removeEventListener('pointerdown', down, true); el.removeEventListener('pointermove', move, true); el.removeEventListener('pointerup', up, true); el.removeEventListener('pointercancel', cancel, true); el.removeEventListener('click', click, true); el.removeEventListener('keydown', key); clearTimeout(S.hold); if (S.ghost) unlift(); };
    }, []);
  }
  /** SquadView.StabilityVaries: stability is worth a read-out only once operatives differ in it. */
  function stabilityVaries(roster) { for (var i = 1; i < roster.length; i++) if (roster[i].maxStability !== roster[0].maxStability) return true; return false; }
  /** SquadView: four slots (drag, long-press or Alt+arrow a filled slot to reorder: `onSlotMove(from, to)`), the roster, the open details and START RUN (blocked until four). `view`: SquadViewModel. */
  function SquadView(p) {
    var v = Object.assign({ roster: [], selected: [-1, -1, -1, -1], focus: -1, locked: [], tiers: [], seed: 'new seed' }, p.view);
    var picked = v.selected.filter(function (i) { return i >= 0 && i < v.roster.length; }), n = picked.length;
    var unlocked = v.roster.filter(function (_, i) { return !v.locked[i]; }).length, open = v.focus >= 0 && v.focus < v.roster.length;
    var filled = [0, 1, 2, 3].map(function (i) { var r = v.selected[i]; return r >= 0 && r < v.roster.length; }), filledRef = R.useRef(filled); filledRef.current = filled;
    var slotsRef = R.useRef(null), latest = R.useRef(p); latest.current = p;
    useReorder(slotsRef, function (i) { return i >= 0 && i < 4 && filledRef.current[i]; }, function (a, b) {
      var last = -1; for (var i = 0; i < 4; i++) if (filledRef.current[i]) last = i; b = Math.min(b, last);
      if (b !== a && b >= 0 && latest.current.onSlotMove) latest.current.onSlotMove(a, b);
    });
    var shownFocus = R.useRef(-1); if (open) shownFocus.current = v.focus; var fi = shownFocus.current;  // keep the details while the drawer slides away
    return View('vb-squad-view', p, [
      h(ScreenHeader, { key: 'h', title: 'SQUAD', meta: n + ' / 4', accent: n === 4, onBack: p.onBack }),
      h('div', { key: 's', ref: slotsRef, className: 'vb-grid4 vb-squad-view__slots', style: { touchAction: 'none' } }, [0, 1, 2, 3].map(function (i) { var r = v.selected[i]; return h(UnitSlot, { key: i, slot: i + 1, view: r >= 0 ? v.roster[r] : null, onPick: function () { call(p.onSlotPick)(i); } }); })),
      unlocked < v.roster.length ? h(LabelComponent, { key: 'l2', text: 'Roster · ' + unlocked + ' of ' + v.roster.length + ' unlocked', className: 'vb-page__label' }) : null,
      h('div', { key: 'r', className: 'vb-grid4 vb-grid4--wrap vb-squad-view__roster' }, v.roster.map(function (o, i) { return h(UnitTile, { key: o.id, view: o, slot: v.selected.indexOf(i) + 1, focused: i === v.focus, tier: v.tiers[i], locked: v.locked[i], onPick: function () { call(p.onPick)(i); } }); })),
      h(VbButton, { key: 'go', title: 'START RUN', variant: 'primary', icon: 'chevron', className: 'vb-squad-view__start', sub: n ? picked.map(function (i) { return v.roster[i].name; }).join(' · ') + (v.seed ? ' · ' + v.seed : '') : '', blocked: n < 4 ? 'Pick ' + (4 - n) + ' more' : '', onClick: call(p.onStart) }),
      h(DrawerOverlay, { key: 'd', open: open, closeButton: false, className: 'vb-squad-view__drawer', label: 'Operative details', onDismiss: p.onClose },
        fi >= 0 && v.roster[fi] ? h(UnitDetail, { view: v.roster[fi], slot: v.selected.indexOf(fi) + 1, squadFull: n >= 4, maxHp: v.maxHp, maxArmor: v.maxArmor, maxStability: v.maxStability, showStability: stabilityVaries(v.roster), onClose: p.onClose, onToggle: function () { call(p.onToggle)(v.focus); } }) : null)], true);
  }
  /** SettingsView: AUDIO, FEEL, CAMERA, QUALITY, ACCESSIBILITY (reduced motion and a row to the display options) and DATA in a FormComposite; applies as it changes (`onChange(model)`). */
  function SettingsView(p) {
    var init = Object.assign({ master: 0.8, music: 0.55, effects: 0.8, sensitivity: 0.5, haptics: true, reducedMotion: false, camera: 0, quality: 1, saved: 'SAVED', note: 'Autoplay lives in the battle HUD and starts on for every new run.' }, p.view);
    var s = R.useState(init), v = s[0];
    function set(k) { return function (x) { var n = Object.assign({}, v); n[k] = x; s[1](n); if (p.onChange) p.onChange(n); }; }
    return View('vb-settings', p, [
      h(ScreenHeader, { key: 'h', title: 'SETTINGS', meta: v.saved, onBack: p.onBack }),
      h(FormComposite, { key: 'f', headed: true, note: v.note ? { icon: 'automation', text: v.note } : null },
        h(Fieldset, { key: 1, title: 'AUDIO' }, h(VbSlider, { label: 'Master', value: v.master, onChange: set('master') }), h(VbSlider, { label: 'Music', value: v.music, onChange: set('music') }), h(VbSlider, { label: 'Effects', value: v.effects, onChange: set('effects') })),
        h(Fieldset, { key: 2, title: 'FEEL' }, h(VbSwitch, { text: 'HAPTICS', detail: 'Light pulse when an order is accepted', value: v.haptics, onChange: set('haptics') })),
        h(Fieldset, { key: 3, title: 'CAMERA' }, h(VbSegmented, { items: [{ label: 'FULL', sub: 'Parallax' }, { label: 'REDUCED', sub: 'No drift' }, { label: 'OFF', sub: 'Fixed' }], selected: v.camera, onChange: set('camera') }), h(VbSlider, { label: 'Sensitivity', value: v.sensitivity, onChange: set('sensitivity') }), L('vb-t-caption', 'Pinch to zoom, twist to turn, drag empty ground to pan, double-tap to reset.')),
        h(Fieldset, { key: 4, title: 'QUALITY' }, h(VbSegmented, { items: [{ label: 'LOW', sub: 'Stable 30 FPS' }, { label: 'STANDARD', sub: '60 FPS target' }], selected: v.quality, onChange: set('quality') }), L('vb-t-caption', 'Applies on the next wave. Telegraphs stay fully visible on both tiers.')),
        h(Fieldset, { key: 5, title: 'ACCESSIBILITY' }, h(VbSwitch, { text: 'REDUCED MOTION', detail: 'No camera shake · fades replace flicker · flat panels', value: v.reducedMotion, onChange: set('reducedMotion') }),
          h(ActionRow, null, h(VbButton, { title: 'DISPLAY OPTIONS', sub: 'Flashes, text size, contrast', icon: 'chevron', onClick: call(p.onAccessibility) }))),
        h(Fieldset, { key: 6, title: 'DATA' }, h(ActionRow, null, h(VbButton, { title: 'CLEAR LOCAL SCORES', variant: 'danger', icon: 'remove', onClick: call(p.onClearScores) }))))], true);
  }
  /** PauseOverlayView: a ScreenHeader without a back arrow (RESUME is the one way back), then one overlay panel centred on the screen: wave, score and who stands
      (with an info button that opens the seed and rules line), the active perks, RESUME, then one single ActionRow: EXIT TO MENU, ABANDON and the settings cog. `view`: PauseViewModel. */
  function PauseInfo(p) {
    var pop = usePopover(function () { return h(PopoverCard, { title: 'RUN', hint: p.line }); }, 'below', true);
    return h(R.Fragment, null, h(IconButtonComposite, { icon: 'info', tooltip: 'Run details', quiet: true, className: 'vb-pause__info', dom: pop.handlers, anchorRef: pop.ref }), pop.layer);
  }
  function PauseOverlayView(p) {
    var v = Object.assign({ wave: 1, score: 0, standing: 4, squadSize: 4, perks: [], seed: '', detail: '' }, p.view);
    var line = [v.seed ? 'Seed ' + v.seed : '', v.detail].filter(Boolean).join(' · ');
    return View('vb-pause', p, [
      h(ScreenHeader, { key: 'h', title: 'PAUSED', meta: 'WAVE ' + pad2(v.wave), backLabel: 'Resume', showBack: false, revealTitles: true, onBack: p.onResume }),
      h('div', { key: 'c', className: 'vb-pause__center' },
        h(Dialog, { className: 'vb-pause__panel' },
          h('div', { className: 'vb-row vb-pause__stats' }, h(StatReadout, { label: 'WAVE', value: pad2(v.wave) }), h(StatReadout, { label: 'SCORE', value: num(v.score) }), h(StatReadout, { label: 'STANDING', value: String(v.standing), unit: '/' + v.squadSize }),
            line ? h(PauseInfo, { line: line }) : null),
          v.perks.length ? h(Shape, Object.assign({ className: 'vb-panel vb-frame--slim vb-frame--raised vb-pause__perks', title: 'Active perks' }, clickable(p.onPerks)),
            h('div', { className: 'vb-row vb-row--between' }, h(LabelComponent, { text: 'Active perks · ' + v.perks.length }), h('div', { className: 'vb-row' }, L('vb-t-badge vb-t-ally', 'DETAILS'), h(VbIcon, { icon: 'chevron', size: 16, className: 'vb-pause__more' }))),
            h('div', { className: 'vb-row vb-row--wrap vb-pause__chips' }, v.perks.map(function (k, i) { return h(BadgeComponent, { key: i, icon: k.icon, text: k.name + (k.stack > 1 ? ' ×' + k.stack : ''), className: 'vb-pause__chip' }); }))) : null,
          h(VbButton, { title: 'RESUME', variant: 'primary', icon: 'chevron', onClick: call(p.onResume) }),
          h(ActionRow, { single: true, className: 'vb-pause__row' },
            h(VbButton, { title: 'EXIT TO MENU', icon: 'back', className: 'vb-pause__button vb-pause__exit', onClick: call(p.onExit) }),
            h(VbButton, { title: 'ABANDON', variant: 'danger', icon: 'remove', className: 'vb-pause__button vb-pause__abandon', onClick: call(p.onAbandon) }),
            h(VbButton, { title: 'Settings', icon: 'cog', iconOnly: true, className: 'vb-pause__button', onClick: call(p.onSettings) }))))], true, true);
  }
  /** ConfirmDialogView: the question, its consequence, the destructive action and the way back. */
  function ConfirmDialogView(p) {
    var c = p.confirm || {}, k = p.cancel || {};
    return h('div', { className: cx('vb-confirm', p.className), style: p.style }, h(Dialog, { title: p.title, body: p.body },
      h(ActionRow, { className: 'vb-confirm__actions' }, h(VbButton, { title: c.label || 'CONFIRM', variant: c.variant || 'danger', sub: c.sub, icon: c.icon, onClick: call(p.onConfirm) }),
        h(VbButton, { title: k.label || 'CANCEL', icon: k.icon, onClick: call(p.onCancel) }))));
  }
  var GUIDE_STEPS = ['Drag an operative to move.', 'Drag A or S onto the battlefield to aim; release over the cards to cancel.', 'Auto controls tactics. Tap AUTO to take over.', '2× speeds combat; aiming stays slow while focus lasts.', 'Stop enemies before they pass the rear line.'];
  /** GuideDialogView: numbered first-run steps and READY. */
  function GuideDialogView(p) {
    return h('div', { className: cx('vb-guide', p.className), style: p.style }, h(Dialog, { title: p.title || 'RUN THE BOULEVARD' },
      h(StackLayout, { gap: 8, className: 'vb-guide__steps' }, (p.steps || GUIDE_STEPS).map(function (t, i) { return h('div', { key: i, className: 'vb-row vb-guide__step' }, h(BadgeComponent, { text: String(i + 1), tone: 'ally', className: 'vb-guide__index' }), L('vb-t-body vb-guide__text', t)); })),
      h(ActionRow, { className: 'vb-guide__actions' }, h(VbButton, { title: 'READY', variant: 'primary', icon: 'check', onClick: call(p.onReady) }))));
  }
  /** PerkDraftView: the perk choices as an endless Carousel of ChoiceCards (the active card is the explanation), the squad that carries forward and TAKE PERK. `view`: PerkDraftViewModel. */
  function PerkDraftView(p) {
    var v = Object.assign({ wave: 1, bonus: 0, score: 0, choices: [], pick: 0, squad: [] }, p.view), pick = v.choices[v.pick];
    return View('vb-draft', p, [
      h('div', { key: 's', className: 'vb-page__scroll vb-draft__scroll', style: { overflowY: 'auto' } },
        h(LabelComponent, { text: 'Wave ' + pad2(v.wave) + ' cleared', tone: 'ally', className: 'vb-reveal-title' }), L('vb-t-display vb-reveal-title', 'CHOOSE A PERK'),
        L('vb-t-caption vb-page__caption', '+' + num(v.bonus) + ' wave bonus · score ' + num(v.score) + ' · perks last the whole run'),
        h(Carousel, { className: 'vb-draft__carousel', motionId: 'choices', selected: v.pick, onChange: function (i) { call(p.onPick)(i); } },
          v.choices.map(function (c, i) { return h(ChoiceCard, { key: c.id, className: 'vb-draft__card', perk: c, selected: i === v.pick }); })),
        h(Shape, Object.assign({ className: 'vb-panel vb-frame--slim vb-draft__squad', title: 'View active perks' }, clickable(p.onPerks)), h(LabelComponent, { text: 'Carries forward · no healing between waves', size: 'badge' }),
          h('div', { className: 'vb-grid4' }, v.squad.map(function (a, i) {
            return h('div', { key: i, className: 'vb-draft__cell' }, h('div', { className: 'vb-row vb-row--between' }, L('vb-draft__code', a.code), L('vb-t-badge', a.hp > 0 ? Math.round(100 * a.hp / Math.max(1, a.maxHp)) + '%' : 'OUT')),
              h(HealthBar, { hp: a.hp, max: a.maxHp, stability: a.stability == null ? 1 : a.stability }));
          })))),
      h(VbButton, { key: 'b', title: 'TAKE PERK', variant: 'primary', icon: 'check', sub: pick ? pick.name + ' → ' + pick.next + ' · then wave ' + pad2(v.wave + 1) : '', blocked: pick ? '' : 'Pick a perk', onClick: call(p.onTake) })]);
  }
  /** ResultsView: the score and its ledger, stats, the squad's contribution, the perks, MENU, SQUAD and RUN AGAIN. `view`: ResultsViewModel. */
  function ResultsView(p) {
    var v = Object.assign({ title: 'RUN OVER', cause: 'SQUAD DOWN', score: 0, wave: 0, bosses: 0, rank: 0, of: 20, ledger: [], distance: '', simTime: '', squad: [], perks: [] }, p.view), d = (v.distance || '').split(' ');
    return View('vb-results', p, [
      h('div', { key: 's', className: 'vb-page__scroll vb-results__scroll', style: { overflowY: 'auto' } },
        h(LabelComponent, { text: v.cause + ' · wave ' + v.wave, tone: 'enemy', className: 'vb-reveal-title' }), L('vb-t-display vb-reveal-title', upper(v.title || 'RUN OVER')),
        h(Shape, { className: 'vb-panel vb-frame--slim vb-frame--solid vb-results__score' },
          h('div', { className: 'vb-row vb-row--between' }, h('div', null, h(LabelComponent, { text: 'Score' }), L('vb-results__value', num(v.score))), v.rank > 0 && v.score > 0 ? L('vb-results__rank', '#' + v.rank + ' OF ' + v.of) : null),
          h('div', { className: 'vb-results__ledger' }, v.ledger.map(function (l, i) { return h(KeyValueRow, { key: i, label: l.label, value: l.value }); })),
          h('div', { className: 'vb-row vb-results__stats' }, h(StatReadout, { label: 'WAVES', value: String(v.wave) }), h(StatReadout, { label: 'BOSSES', value: String(v.bosses) }),
            v.distance ? h(StatReadout, { label: 'DISTANCE', value: d[0], unit: d[1] }) : null, v.simTime ? h(StatReadout, { label: 'SIM TIME', value: v.simTime }) : null)),
        h(LabelComponent, { text: 'Squad', className: 'vb-page__label' }),
        h('div', { className: 'vb-grid4' }, v.squad.map(function (c) { return h(ResultSummary, { key: c.operative.id, view: c }); })),
        v.perks.length ? h(LabelComponent, { text: 'Perks · ' + v.perks.length, className: 'vb-page__label' }) : null,
        h('div', { className: 'vb-row vb-row--wrap vb-results__perks' }, v.perks.map(function (k) { return h(ChipRow, { key: k.id, view: k }); }))),
      h(ActionRow, { key: 'r', minItemWidth: 104, className: 'vb-results__row' }, h(VbButton, { title: 'MENU', className: 'vb-results__menu', onClick: call(p.onMenu) }), h(VbButton, { title: 'SQUAD', className: 'vb-results__menu', onClick: call(p.onSquad) }),
        h(VbButton, { title: 'RUN AGAIN', variant: 'primary', icon: 'chevron', className: 'vb-results__again', onClick: call(p.onAgain) }))]);
  }
  /** HighScoresView: up to 20 ranked runs (current framed) and older-rules runs after a label, in a ListLayout. */
  function HighScoresView(p) {
    var ranked = (p.ranked || []).slice(0, 20), old = p.historical || [];
    return View('vb-scores', p, [
      h(ScreenHeader, { key: 'h', title: 'HIGH SCORES', meta: 'TOP ' + ranked.length, onBack: p.onBack }),
      h('div', { key: 'c', className: 'vb-l vb-t-caption vb-page__caption' }, p.caption || 'On this device. Ties break by wave, then shortest sim time.'),
      h(ListLayout, { key: 'l', empty: 'No runs yet. Your first run lands here.' }, ranked.map(function (s, i) { return h(ScoreRow, { key: 'r:'+(s.id||s.rank), view: s }); }),
        old.length ? h(LabelComponent, { key: 'o', text: 'Older rules', className: 'vb-scores__older' }) : null,
        old.map(function (s, i) { return h(ScoreRow, { key: 'h:'+(s.id||s.rank), view: s, className: 'vb-scores__historical' }); }))], true);
  }
  function RouteChoiceView(p) { return View('vb-route-view', p, h(RouteChoice, { view: p.view, onChoose: p.onChoose })); }
  function MerchantScreenView(p) { return View('vb-merchant-view', p, h(MerchantScreen, { view: p.view, onBuy: p.onBuy, onSellPerk: p.onSellPerk, onSellHealth: p.onSellHealth, onLeave: p.onLeave })); }
  /** BattleHudView: BoardLayout with the HUD band, boss bar and announcer on top, `world` in the middle and four cards at the bottom. */
  function BattleHudView(p) {
    var ops = p.operatives || [],boardRef=R.useRef(null),generation=R.useRef(0);
    useIsoLayout(function(){var board=boardRef.current;if(!board)return;var nodes=[board.querySelector('.vb-board__top')].concat(Array.from(board.querySelectorAll('.vb-battle__card'))),id=++generation.current;
      nodes.forEach(function(node,i){if(!node)return;var recipeName=i?'hudCard':'hudTop';node.style.visibility='';if(p.reveal!=null){var v=clamp01(p.reveal),recipe=MOTION.recipes[recipeName],away=1-v;node.style.opacity=v;node.style.translate=reducedMotion(node)?'0 0':(recipe.x||0)*away+'px '+(recipe.y||0)*away+'px';node.style.rotate=reducedMotion(node)?'0deg':(recipe.rotation||0)*away+'deg';node.inert=v<=0;return;}node.style.opacity='';node.style.translate='';node.style.rotate='';node.inert=p.shown===false;playMotion(node,recipeName,i?i-1:0,p.shown===false).then(function(done){if(done&&id===generation.current&&p.shown===false)node.style.visibility='hidden';});});
      return function(){generation.current++;nodes.forEach(function(node){var animation=node&&runningMotion.get(node);if(animation)animation.cancel();});};
    },[p.shown,p.reveal]);
    return h(BoardLayout, { ref:boardRef, className: cx('vb-battle', p.className), style: p.style,
      top: [h(HudTop, { key: 'h', view: p.hud, onPauseClick: p.onPause, onAutoClick: p.onAuto, onSpeedClick: p.onSpeed, onQueueCancel: p.onQueueCancel, queuePinned: p.queuePinned }),
        p.boss ? h(BossBar, { key: 'b', view: p.boss, className: 'vb-battle__boss' }) : null,
        h('div', { key: 'a', className: 'vb-battle__announcer vb-announcement' }, p.announcement ? h(GlitchText, { key: p.announcement, text: p.announcement }) : null)],
      world: p.world,
      bottom: h('div', { className: 'vb-battle__cards' }, ops.slice(0, 4).map(function (o, i) { return o ? h(UnitCard, { key: o.id||i, view: o, className: 'vb-battle__card' }) : null; })) });
  }

  /** ActivePerksView.Zero: a total that says nothing ("+0%", "0"), none of its digits above zero; such totals are not listed. */
  function zeroTotal(value) { return !value || !/[1-9]/.test(String(value)); }
  function ActivePerksView(p) {
    var v = Object.assign({ wave: 1, perks: [], totals: [], pick: 0 }, p.view), stackCount = v.perks.reduce(function (n, k) { return n + (k.stack || 0); }, 0), totals = v.totals.filter(function (t) { return !zeroTotal(t.value); });
    return View('vb-build', p, [h(ScreenHeader, { key: 'h', title: 'ACTIVE PERKS', meta: stackCount + ' · WAVE ' + pad2(v.wave), onBack: p.onBack }),
      totals.length && v.perks.length ? h(VbFrame, { key: 't', kind: 'slim', className: 'vb-panel vb-build__summary' }, totals.map(function (t) { return h('div', { key: t.label, className: 'vb-build__bonus' }, L('vb-t-badge', t.label), L('vb-build__bonus-value', t.value)); })) : null,
      h(ListLayout, { key: 'l', className: 'vb-build__list', empty: 'No perks yet. Clear a wave to draft one.' }, v.perks.length ? h('div', { className: 'vb-grid vb-grid--2 vb-grid--wrap vb-build__grid' }, v.perks.map(function (e, i) { return h(ChoiceCard, { key: e.id, owned: e, selected: i === v.pick, className: 'vb-build__card', onPick: function () { call(p.onPick)(i); } }); })) : null),
      v.perks[v.pick] ? h(PerkDetail, { key: 'd', className: 'vb-build__detail', view: v.perks[v.pick] }) : null], true);
  }
  function RevivePickView(p) { var fallen = p.fallen || []; return View('vb-revive', p, [h(ScreenHeader, { key: 'h', title: 'RESTORE', meta: 'CHOOSE ONE', onBack: p.onBack }), h('p', { key: 'c', className: 'vb-page__caption' }, (p.perk || 'Restore') + ' revives one fallen operative at 35% health.'), h('div', { key: 'g', className: 'vb-grid4 vb-grid4--wrap' }, fallen.map(function (e, i) { return h(UnitTile, { key: e.id, view: e, onPick: function () { call(p.onPick)(i); } }); }))], true); }
  function AccessibilityView(p){var v=Object.assign({reducedFlashes:false,largerText:false,highContrast:false},p.view);return View('vb-accessibility',p,[h(ScreenHeader,{key:'h',title:'ACCESSIBILITY',meta:'',onBack:p.onBack}),h(FormComposite,{key:'f'},['reducedFlashes','largerText','highContrast'].map(function(key){return h(VbSwitch,{key:key,text:{reducedFlashes:'Reduced flashes',largerText:'Larger text',highContrast:'High contrast'}[key],value:v[key],onChange:function(value){call(p.onChange)(key,value);}});}))],true);}

  var api = {
    EffectDetails: EffectDetails, EffectBadge: EffectBadge, EffectList: EffectList, EffectStrip: EffectStrip,
    ActivePerksView: ActivePerksView, RevivePickView: RevivePickView, AccessibilityView: AccessibilityView,
    GlitchText: GlitchText, RouteChoice: RouteChoice, MerchantScreen: MerchantScreen,
    VbFrame: VbFrame, VbIcon: VbIcon, VbMark: VbMark, VbButton: VbButton, StatReadout: StatReadout, StatusChip: StatusChip,
    VbSwitch: VbSwitch, VbSlider: VbSlider, VbSegmented: VbSegmented, VbMeter: VbMeter, HealthBar: HealthBar, PowerStrip: PowerStrip,
    FocusMeter: FocusMeter, SkillButton: SkillButton, QueueChip: QueueChip, HudTop: HudTop, QueueList: QueueList, BossBar: BossBar, ScreenHeader: ScreenHeader,
    ScoreRow: ScoreRow, UnitCard: UnitCard, UnitTile: UnitTile, UnitSlot: UnitSlot, UnitDetail: UnitDetail, ChoiceCard: ChoiceCard, StatRow: StatRow, ChipRow: ChipRow, Carousel: Carousel,
    UnitStats: UnitStats, ResultSummary: ResultSummary, PerkDetail: PerkDetail, PerkRow: PerkRow,
    Dialog: Dialog, Backdrop: Backdrop, ScanLines: ScanLines, HoloFrame: HoloFrame, HoloPlatform: HoloPlatform, RevealCard: RevealCard, RuleRow: RuleRow,
    WorldHealthBar: WorldHealthBar, CombatText: CombatText, WorldLabel: WorldLabel, WorldMarker: WorldMarker, OffscreenIndicator: OffscreenIndicator, EdgeWarning: EdgeWarning,
    ProgressBar: ProgressBar, ListRow: ListRow, KeyValueRow: KeyValueRow, TextComponent: TextComponent, LabelComponent: LabelComponent, BadgeComponent: BadgeComponent, IconButtonComposite: IconButtonComposite, TileComponent: TileComponent, CardComponent: CardComponent,
    DrawerOverlay: DrawerOverlay, FieldComposite: FieldComposite, Fieldset: Fieldset, FormComposite: FormComposite, StackLayout: StackLayout, VbGrid: VbGrid, ListLayout: ListLayout, BoardLayout: BoardLayout,
    MainMenuView: MainMenuView, MenuActionsSectionView: MenuActionsSectionView, SquadView: SquadView, SettingsView: SettingsView, PauseOverlayView: PauseOverlayView, ConfirmDialogView: ConfirmDialogView,
    GuideDialogView: GuideDialogView, PerkDraftView: PerkDraftView, ResultsView: ResultsView, HighScoresView: HighScoresView, RouteChoiceView: RouteChoiceView, MerchantScreenView: MerchantScreenView, BattleHudView: BattleHudView,
    VbShape: Shape, ActionRow: ActionRow, StatusRow: StatusRow, PopoverCard: PopoverCard, VbClipFill: ClipFill, VbClipImage: ClipImage, VbEdgeFx: edgeFx, Glitch: Glitch, fluid: { step: fluidStep, apply: fluidApply, classFor: function (w) { return 'vb-fluid-' + fluidStep(w); } }, format: { compact: compact, number: num, seconds: seconds, kebab: kebab }
  };
  // The names 0.8.0 replaced stay one release on window.Veilbreak (the Unity side keeps them as [Obsolete] forwarding types, Composites/Obsolete.cs); the ES module and the typings do not carry them.
  ['OperativeCard:UnitCard', 'OperativeTile:UnitTile', 'SquadSlot:UnitSlot', 'OperativeDetails:UnitDetail', 'OperativeStats:UnitStats', 'SquadResult:ResultSummary', 'PerkCard:ChoiceCard', 'PerkChip:ChipRow'].forEach(function (pair) { var m = pair.split(':'); api[m[0]] = api[m[1]]; });
  api.CreditsChip = CreditsChip;
  window.Veilbreak = Object.assign(window.Veilbreak || {}, api);
})();
