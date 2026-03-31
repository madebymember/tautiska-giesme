# Tautiška giesmė

Statinė informacinė svetainė apie Lietuvos Respublikos himną **„Tautiška giesmė“**.

Projektas pateikia himno tekstą, garso grotuvą, informacijos šaltinius ir kontaktinę informaciją. Svetainė sukurta naudojant HTML, CSS ir JavaScript, todėl yra lengvai prižiūrima ir tinkama talpinti kaip statinė svetainė.

## Savybės

- himno tekstas ir garso grotuvas;
- atskiri puslapiai šaltiniams ir kontaktams;
- prisitaikantis dizainas;
- tamsaus režimo palaikymas;
- SEO metaduomenys, `robots.txt` ir `sitemap.xml`;
- paruošta talpinimui per GitHub Pages.

## Struktūra

```text
.
├── assets/
├── index.html
├── saltiniai.html
├── kontaktai.html
├── robots.txt
├── sitemap.xml
├── CNAME
└── LICENSE
```

## Paleidimas lokaliai

Projektą galima atidaryti tiesiog naršyklėje, tačiau patogesniam testavimui rekomenduojama naudoti vietinį serverį:

```bash
python3 -m http.server 8000
```

Tada atidarykite:

```text
http://localhost:8000
```

## Publikavimas

Projektas tinkamas talpinti per:

- GitHub Pages
- Netlify
- Vercel

Repozitorijoje taip pat yra `CNAME` failas, skirtas nuosavam domenui:

`tautiškagiesmė.lt`

## Licencija

Projektas licencijuojamas pagal **CC0 1.0 Universal** licenciją. Daugiau informacijos pateikta `LICENSE` faile.

## Kontaktai

Dėl turinio ar techninių klausimų:

`mariusstauga@pm.me`
