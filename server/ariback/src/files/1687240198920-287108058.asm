[
  {
    "        org 100h\r": "        section .text\r"
  },
  {
    "        org 100h\r": "        call    IniciarModoTexto\r"
  },
  {
    "        org 100h\r": "        call    MoverCursor\r"
  },
  {
    "        org 100h\r": "        call    EscribirCaracter\r"
  },
  {
    "        org 100h\r": "        call    EsperarTecla\r"
  },
  {
    "        org 100h\r": "        int 20h\r"
  },
  {
    "        org 100h\r": ";FUNCIONES\r"
  },
  {
    "        org 100h\r": "IniciarModoTexto:       ;int 10h / 00h\r"
  },
  {
    "        org 100h\r": ";Argumentos de entrada:\r"
  },
  {
    "        org 100h\r": ";AH:\t00h\r"
  },
  {
    "        org 100h\r": ";AL: \t00h → Modo texto. 40 columnas por 25 filas. 16 colores. 8 páginas.\r"
  },
  {
    "        org 100h\r": ";\t03h → Modo texto. 80 columnas por 25 filas. 16 colores. 8 páginas.\r"
  },
  {
    "        org 100h\r": ";       13h → Modo gráfico. 40 columnas por 25 filas. 256 colores. 320p x 200p.\r"
  },
  {
    "        org 100h\r": "        mov     AH"
  },
  {
    "        org 100h\r": "        mov     AL"
  },
  {
    "        org 100h\r": "        int     10h\r"
  },
  {
    "        org 100h\r": "        ret\r"
  },
  {
    "        org 100h\r": "MoverCursor:            ;int 10h / 02h\r"
  },
  {
    "        org 100h\r": ";Argumentos de entrada:\r"
  },
  {
    "        org 100h\r": ";AH: \t02h\r"
  },
  {
    "        org 100h\r": ";DH: \tfila\r"
  },
  {
    "        org 100h\r": ";DL: \tcolumna\r"
  },
  {
    "        org 100h\r": ";BH: \tnúmero de página (0 hasta 7).\r"
  },
  {
    "        org 100h\r": "        mov     AH"
  },
  {
    "        org 100h\r": "        mov     DH"
  },
  {
    "        org 100h\r": "        mov     DL"
  },
  {
    "        org 100h\r": "        mov     BH"
  },
  {
    "        org 100h\r": "        int     10h\r"
  },
  {
    "        org 100h\r": "        ret\r"
  },
  {
    "        org 100h\r": "EscribirCaracter:       ;int 10h / 09h\r"
  },
  {
    "        org 100h\r": ";Argumentos de entrada:\r"
  },
  {
    "        org 100h\r": ";AH: \t09h\r"
  },
  {
    "        org 100h\r": ";AL: \tcódigo ASCII del carácter.\r"
  },
  {
    "        org 100h\r": ";BH: \tnúmero de página (0 hasta 7).\r"
  },
  {
    "        org 100h\r": ";BL: \tatributo del carácter.\r"
  },
  {
    "        org 100h\r": ";CX: \tnúmero de veces que se mostrara el carácter.\r"
  },
  {
    "        org 100h\r": "        mov     AH"
  },
  {
    "        org 100h\r": "        mov     AL"
  },
  {
    "        org 100h\r": "        mov     BH"
  },
  {
    "        org 100h\r": "        mov     BL"
  },
  {
    "        org 100h\r": "        mov     CX"
  },
  {
    "        org 100h\r": "        int     10h\r"
  },
  {
    "        org 100h\r": "        ret\r"
  },
  {
    "        org 100h\r": "EsperarTecla:           ;int 16h / 00h\r"
  },
  {
    "        org 100h\r": ";Argumentos de entrada:\r"
  },
  {
    "        org 100h\r": ";AH: \t00h.\t\t\t\t\t\r"
  },
  {
    "        org 100h\r": "        mov     AH"
  },
  {
    "        org 100h\r": "        int     16h\r"
  },
  {
    "        org 100h\r": ";Argumentos de sálida:\r"
  },
  {
    "        org 100h\r": ";AH: \tBIOS scan code.\r"
  },
  {
    "        org 100h\r": ";AL: \tcarácter ASCII leído.\r"
  },
  {
    "        org 100h\r": "        ret"
  }
]