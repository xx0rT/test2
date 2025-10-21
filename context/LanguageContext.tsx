import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'cs' | 'sk' | 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('cs');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('vilaLanguage') as Language;
    if (savedLanguage && ['cs', 'sk', 'de', 'en'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vilaLanguage', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Record<Language, any> = {
  cs: {
    nav: {
      about: 'O nás',
      gallery: 'Fotogalerie',
      equipment: 'Vybavení',
      prices: 'Ceník a dostupnost',
      activities: 'Aktivity v okolí'
    },
    hero: {
      title: 'Vila Adalbert',
      subtitle: 'Váš horský úkryt pro každé roční období',
      explore: 'Prozkoumat dům'
    },
    about: {
      title: 'O Vila Adalbert',
      p1: 'Zasazená do srdce hor nabízí Vila Adalbert jedinečný únik po celý rok. Ať už hledáte zimní dobrodružství nebo letní klid, náš dům se přizpůsobí vašim potřebám a měnícím se ročním obdobím.',
      p2: 'Postavená s důrazem na pohodlí a všestrannost poskytuje Vila Adalbert dokonalé prostředí pro rodiny, pracovníky na dálku, dobrodruhy a každého, kdo se chce znovu spojit s přírodou a přitom si užívat moderní vybavení.',
      p3: 'Zažijte kouzlo horského života v prostoru navrženém k inspiraci, relaxaci a vytváření nezapomenutelných vzpomínek.'
    },
    gallery: {
      title: 'Fotogalerie'
    },
    equipment: {
      title: 'Vybavení a služby',
      items: {
        living: { title: 'Prostorné bydlení', desc: '3 ložnice, 2 koupelny, až 8 hostů' },
        wifi: { title: 'Vysokorychlostní WiFi', desc: 'Ideální pro práci na dálku a streamování' },
        kitchen: { title: 'Plně vybavená kuchyně', desc: 'Moderní spotřebiče a nádobí' },
        entertainment: { title: 'Zábava', desc: 'Smart TV a společenské hry' },
        climate: { title: 'Klimatizace', desc: 'Topení a klimatizace' },
        parking: { title: 'Parkování', desc: 'Bezplatné parkování na místě pro 2 vozidla' },
        outdoor: { title: 'Venkovní prostor', desc: 'Soukromá zahrada a terasa' },
        views: { title: 'Horské výhledy', desc: 'Úchvatná panoramatická vyhlídka' }
      }
    },
    possibilities: {
      title: 'Dům plný možností',
      subtitle: 'Vila Adalbert se přizpůsobí vašim potřebám, ať už jsou jakékoli. Od klidných útočišť po produktivní pracovní pobyty, od rodinných setkání po základnu pro dobrodružství.',
      items: {
        family: { title: 'Rodinný ústup', desc: 'Prostorné ubytování ideální pro rodiny, které chtějí upevnit vztahy v přírodě, s aktivitami pro všechny věkové kategorie.' },
        remote: { title: 'Útočiště pro práci na dálku', desc: 'Rychlé WiFi a klidné prostředí ideální pro digitální nomády a pracovníky na dálku hledající inspiraci.' },
        adventure: { title: 'Základna pro dobrodružství', desc: 'Centrální poloha pro outdoorové nadšence k prozkoumání turistiky, lyžování a místních atrakcí.' },
        celebration: { title: 'Místo pro oslavy', desc: 'Pořádejte nezapomenutelná setkání, narozeniny nebo malé akce v krásném horském prostředí.' }
      }
    },
    activities: {
      title: 'Aktivity v okolí',
      winter: {
        skiing: { title: 'Lyžování a snowboarding', desc: 'Přístup k nedalekým lyžařským střediskům do 20 minut' },
        hiking: { title: 'Zimní turistika', desc: 'Malebné stezky ideální pro sněžnice' },
        cafes: { title: 'Útulné horské kavárny', desc: 'Zahřejte se v místních restauracích a kavárnách' },
        photo: { title: 'Zimní fotografie', desc: 'Zachyťte úžasné zasněžené krajiny' }
      },
      summer: {
        biking: { title: 'Horská cyklistika', desc: 'Rozsáhlá síť stezek pro všechny úrovně' },
        hiking: { title: 'Turistika a treking', desc: 'Úchvatné trasy s panoramatickými výhledy' },
        nature: { title: 'Procházky přírodou', desc: 'Prozkoumejte místní flóru a faunu' },
        photo: { title: 'Fotografické túry', desc: 'Objevte skryté klenoty a malebné vyhlídky' }
      }
    },
    prices: {
      title: 'Ceník a dostupnost',
      ready: 'Jste připraveni rezervovat svůj pobyt ve Vila Adalbert?',
      contact: 'Kontaktujte nás',
      period: 'Období',
      minStay: 'Minimální pobyt',
      notes: 'Poznámky'
    },
    footer: {
      subtitle: 'Horský ústup',
      contact: 'Kontakt:',
      email: 'Napište nám',
      call: 'Zavolejte nám',
      location: 'Poloha:',
      vilaName: 'Vila Adalbert',
      region: 'Horská oblast',
      country: 'Rumunsko',
      quickLinks: 'Rychlé odkazy:',
      about: 'O nás',
      gallery: 'Galerie',
      prices: 'Ceny',
      emailLabel: 'Email:',
      copyright: '© Vila Adalbert 2024.',
      privacy: 'Ochrana soukromí',
      credits: 'Vytvořeno s péčí'
    },
    season: {
      winter: '❄️ Zima',
      summer: '☀️ Léto'
    }
  },
  sk: {
    nav: {
      about: 'O nás',
      gallery: 'Fotogaléria',
      equipment: 'Vybavenie',
      prices: 'Cenník a dostupnosť',
      activities: 'Aktivity v okolí'
    },
    hero: {
      title: 'Vila Adalbert',
      subtitle: 'Váš horský úkryt pre každé ročné obdobie',
      explore: 'Preskúmať dom'
    },
    about: {
      title: 'O Vila Adalbert',
      p1: 'Zasadená do srdca hôr ponúka Vila Adalbert jedinečný únik počas celého roka. Či už hľadáte zimné dobrodružstvo alebo letný pokoj, náš dom sa prispôsobí vašim potrebám a meniacim sa ročným obdobiam.',
      p2: 'Postavená s dôrazom na pohodlie a všestrannosť poskytuje Vila Adalbert dokonalé prostredie pre rodiny, pracovníkov na diaľku, dobrodruhov a každého, kto sa chce znovu spojiť s prírodou a pritom si užívať moderné vybavenie.',
      p3: 'Zažite kúzlo horského života v priestore navrhnutom na inšpiráciu, relaxáciu a vytváranie nezabudnuteľných spomienok.'
    },
    gallery: {
      title: 'Fotogaléria'
    },
    equipment: {
      title: 'Vybavenie a služby',
      items: {
        living: { title: 'Priestorné bývanie', desc: '3 spálne, 2 kúpeľne, až 8 hostí' },
        wifi: { title: 'Vysokorýchlostné WiFi', desc: 'Ideálne pre prácu na diaľku a streamovanie' },
        kitchen: { title: 'Plne vybavená kuchyňa', desc: 'Moderné spotrebiče a nádobie' },
        entertainment: { title: 'Zábava', desc: 'Smart TV a spoločenské hry' },
        climate: { title: 'Klimatizácia', desc: 'Kúrenie a klimatizácia' },
        parking: { title: 'Parkovanie', desc: 'Bezplatné parkovanie na mieste pre 2 vozidlá' },
        outdoor: { title: 'Vonkajší priestor', desc: 'Súkromná záhrada a terasa' },
        views: { title: 'Horské výhľady', desc: 'Úchvatný panoramatický výhľad' }
      }
    },
    possibilities: {
      title: 'Dom plný možností',
      subtitle: 'Vila Adalbert sa prispôsobí vašim potrebám, nech sú akékoľvek. Od pokojných útočíšť po produktívne pracovné pobyty, od rodinných stretnutí po základňu pre dobrodružstvá.',
      items: {
        family: { title: 'Rodinný ústup', desc: 'Priestorné ubytovanie ideálne pre rodiny, ktoré chcú upevniť vzťahy v prírode, s aktivitami pre všetky vekové kategórie.' },
        remote: { title: 'Útočisko pre prácu na diaľku', desc: 'Rýchle WiFi a pokojné prostredie ideálne pre digitálnych nomádov a pracovníkov na diaľku hľadajúcich inšpiráciu.' },
        adventure: { title: 'Základňa pre dobrodružstvá', desc: 'Centrálna poloha pre outdoorových nadšencov na preskúmanie turistiky, lyžovania a miestnych atrakcií.' },
        celebration: { title: 'Miesto pre oslavy', desc: 'Poriadajte nezabudnuteľné stretnutia, narodeniny alebo malé podujatia v krásnom horskom prostredí.' }
      }
    },
    activities: {
      title: 'Aktivity v okolí',
      winter: {
        skiing: { title: 'Lyžovanie a snowboarding', desc: 'Prístup k neďalekým lyžiarskym strediskám do 20 minút' },
        hiking: { title: 'Zimná turistika', desc: 'Malebné chodníky ideálne pre snežnice' },
        cafes: { title: 'Útulné horské kaviarne', desc: 'Zahrievajte sa v miestnych reštauráciách a kaviarňach' },
        photo: { title: 'Zimná fotografia', desc: 'Zachyťte úžasné zasnežené krajiny' }
      },
      summer: {
        biking: { title: 'Horská cyklistika', desc: 'Rozsiahla sieť chodníkov pre všetky úrovne' },
        hiking: { title: 'Turistika a treking', desc: 'Úchvatné trasy s panoramatickými výhľadmi' },
        nature: { title: 'Prechádzky prírodou', desc: 'Preskúmajte miestnu flóru a faunu' },
        photo: { title: 'Fotografické túry', desc: 'Objavte skryté klenoty a malebné vyhliadky' }
      }
    },
    prices: {
      title: 'Cenník a dostupnosť',
      ready: 'Ste pripravení rezervovať svoj pobyt vo Vila Adalbert?',
      contact: 'Kontaktujte nás',
      period: 'Obdobie',
      minStay: 'Minimálny pobyt',
      notes: 'Poznámky'
    },
    footer: {
      subtitle: 'Horský ústup',
      contact: 'Kontakt:',
      email: 'Napíšte nám',
      call: 'Zavolajte nám',
      location: 'Poloha:',
      vilaName: 'Vila Adalbert',
      region: 'Horská oblasť',
      country: 'Rumunsko',
      quickLinks: 'Rýchle odkazy:',
      about: 'O nás',
      gallery: 'Galéria',
      prices: 'Ceny',
      emailLabel: 'Email:',
      copyright: '© Vila Adalbert 2024.',
      privacy: 'Ochrana súkromia',
      credits: 'Vytvorené s starostlivosťou'
    },
    season: {
      winter: '❄️ Zima',
      summer: '☀️ Leto'
    }
  },
  de: {
    nav: {
      about: 'Über uns',
      gallery: 'Fotogalerie',
      equipment: 'Ausstattung',
      prices: 'Preise und Verfügbarkeit',
      activities: 'Aktivitäten in der Umgebung'
    },
    hero: {
      title: 'Vila Adalbert',
      subtitle: 'Ihr Bergrückzug für jede Jahreszeit',
      explore: 'Haus erkunden'
    },
    about: {
      title: 'Über Vila Adalbert',
      p1: 'Im Herzen der Berge gelegen, bietet Vila Adalbert das ganze Jahr über einen einzigartigen Rückzugsort. Ob Sie Winterabenteuer oder sommerliche Ruhe suchen, unser Haus passt sich Ihren Bedürfnissen und den wechselnden Jahreszeiten an.',
      p2: 'Mit Fokus auf Komfort und Vielseitigkeit gebaut, bietet Vila Adalbert die perfekte Umgebung für Familien, Remote-Worker, Abenteurer und alle, die sich wieder mit der Natur verbinden und dabei moderne Annehmlichkeiten genießen möchten.',
      p3: 'Erleben Sie die Magie des Berglebens in einem Raum, der zum Inspirieren, Entspannen und Schaffen unvergesslicher Erinnerungen konzipiert wurde.'
    },
    gallery: {
      title: 'Fotogalerie'
    },
    equipment: {
      title: 'Ausstattung und Annehmlichkeiten',
      items: {
        living: { title: 'Geräumiges Wohnen', desc: '3 Schlafzimmer, 2 Badezimmer, bis zu 8 Gäste' },
        wifi: { title: 'Highspeed-WLAN', desc: 'Perfekt für Remote-Arbeit und Streaming' },
        kitchen: { title: 'Voll ausgestattete Küche', desc: 'Moderne Geräte und Kochgeschirr' },
        entertainment: { title: 'Unterhaltung', desc: 'Smart-TV und Brettspiele' },
        climate: { title: 'Klimaanlage', desc: 'Heizung und Klimaanlage' },
        parking: { title: 'Parken', desc: 'Kostenlose Parkplätze vor Ort für 2 Fahrzeuge' },
        outdoor: { title: 'Außenbereich', desc: 'Privater Garten und Terrasse' },
        views: { title: 'Bergblick', desc: 'Atemberaubende Panoramaaussicht' }
      }
    },
    possibilities: {
      title: 'Haus voller Möglichkeiten',
      subtitle: 'Vila Adalbert passt sich Ihren Bedürfnissen an, was auch immer sie sein mögen. Von friedlichen Rückzugsorten bis hin zu produktiven Workations, von Familientreffen bis zum Abenteuer-Basislager.',
      items: {
        family: { title: 'Familienrückzug', desc: 'Geräumige Unterkunft perfekt für Familien, die in der Natur zusammenkommen möchten, mit Aktivitäten für alle Altersgruppen.' },
        remote: { title: 'Remote-Work-Oase', desc: 'Schnelles WLAN und ruhige Umgebung ideal für digitale Nomaden und Remote-Worker auf der Suche nach Inspiration.' },
        adventure: { title: 'Abenteuer-Basis', desc: 'Zentrale Lage für Outdoor-Enthusiasten zum Erkunden von Wandern, Skifahren und lokalen Attraktionen.' },
        celebration: { title: 'Feierort', desc: 'Veranstalten Sie unvergessliche Zusammenkünfte, Geburtstage oder kleine Veranstaltungen in wunderschöner Bergkulisse.' }
      }
    },
    activities: {
      title: 'Aktivitäten in der Umgebung',
      winter: {
        skiing: { title: 'Skifahren und Snowboarden', desc: 'Zugang zu nahe gelegenen Skigebieten innerhalb von 20 Minuten' },
        hiking: { title: 'Winterwandern', desc: 'Malerische Wanderwege perfekt zum Schneeschuhwandern' },
        cafes: { title: 'Gemütliche Bergcafés', desc: 'Wärmen Sie sich in lokalen Restaurants und Cafés auf' },
        photo: { title: 'Winterfotografie', desc: 'Halten Sie atemberaubende verschneite Landschaften fest' }
      },
      summer: {
        biking: { title: 'Mountainbiken', desc: 'Umfangreiches Wegenetz für alle Schwierigkeitsgrade' },
        hiking: { title: 'Wandern und Trekking', desc: 'Atemberaubende Routen mit Panoramablick' },
        nature: { title: 'Naturspaziergänge', desc: 'Erkunden Sie lokale Flora und Fauna' },
        photo: { title: 'Foto-Touren', desc: 'Entdecken Sie versteckte Juwelen und malerische Aussichtspunkte' }
      }
    },
    prices: {
      title: 'Preise und Verfügbarkeit',
      ready: 'Bereit, Ihren Aufenthalt in Vila Adalbert zu buchen?',
      contact: 'Kontaktieren Sie uns',
      period: 'Zeitraum',
      minStay: 'Mindestaufenthalt',
      notes: 'Hinweise'
    },
    footer: {
      subtitle: 'Bergrückzug',
      contact: 'Kontakt:',
      email: 'E-Mail an uns',
      call: 'Rufen Sie uns an',
      location: 'Standort:',
      vilaName: 'Vila Adalbert',
      region: 'Bergregion',
      country: 'Rumänien',
      quickLinks: 'Schnellzugriff:',
      about: 'Über uns',
      gallery: 'Galerie',
      prices: 'Preise',
      emailLabel: 'E-Mail:',
      copyright: '© Vila Adalbert 2024.',
      privacy: 'Datenschutz',
      credits: 'Mit Sorgfalt erstellt'
    },
    season: {
      winter: '❄️ Winter',
      summer: '☀️ Sommer'
    }
  },
  en: {
    nav: {
      about: 'About us',
      gallery: 'Photo Gallery',
      equipment: 'Equipment',
      prices: 'Price List & Availability',
      activities: 'Activities in the area'
    },
    hero: {
      title: 'Vila Adalbert',
      subtitle: 'Your Mountain Retreat for Every Season',
      explore: 'Explore the House'
    },
    about: {
      title: 'About Vila Adalbert',
      p1: 'Nestled in the heart of the mountains, Vila Adalbert offers a unique escape throughout the year. Whether you\'re seeking winter adventures or summer tranquility, our house adapts to your needs and the changing seasons.',
      p2: 'Built with comfort and versatility in mind, Vila Adalbert provides the perfect setting for families, remote workers, adventure seekers, and anyone looking to reconnect with nature while enjoying modern amenities.',
      p3: 'Experience the magic of mountain living in a space designed to inspire, relax, and create lasting memories.'
    },
    gallery: {
      title: 'Photo Gallery'
    },
    equipment: {
      title: 'Equipment & Amenities',
      items: {
        living: { title: 'Spacious Living', desc: '3 bedrooms, 2 bathrooms, sleeps up to 8 guests' },
        wifi: { title: 'High-Speed WiFi', desc: 'Perfect for remote work and streaming' },
        kitchen: { title: 'Full Kitchen', desc: 'Modern appliances and cookware' },
        entertainment: { title: 'Entertainment', desc: 'Smart TV and board games' },
        climate: { title: 'Climate Control', desc: 'Heating and air conditioning' },
        parking: { title: 'Parking', desc: 'Free on-site parking for 2 vehicles' },
        outdoor: { title: 'Outdoor Space', desc: 'Private garden and terrace' },
        views: { title: 'Mountain Views', desc: 'Breathtaking panoramic vistas' }
      }
    },
    possibilities: {
      title: 'House Full of Possibilities',
      subtitle: 'Vila Adalbert adapts to your needs, whatever they may be. From peaceful retreats to productive workations, from family gatherings to adventure basecamp.',
      items: {
        family: { title: 'Family Retreat', desc: 'Spacious accommodation perfect for families looking to bond in nature, with activities for all ages.' },
        remote: { title: 'Remote Work Haven', desc: 'Fast WiFi and quiet environment ideal for digital nomads and remote workers seeking inspiration.' },
        adventure: { title: 'Adventure Base', desc: 'Central location for outdoor enthusiasts to explore hiking, skiing, and local attractions.' },
        celebration: { title: 'Celebration Venue', desc: 'Host memorable gatherings, birthdays, or small events in a beautiful mountain setting.' }
      }
    },
    activities: {
      title: 'Activities in the Area',
      winter: {
        skiing: { title: 'Skiing & Snowboarding', desc: 'Access to nearby ski resorts within 20 minutes' },
        hiking: { title: 'Winter Hiking', desc: 'Scenic trails perfect for snowshoeing' },
        cafes: { title: 'Cozy Mountain Cafes', desc: 'Warm up in local restaurants and cafes' },
        photo: { title: 'Winter Photography', desc: 'Capture stunning snowy landscapes' }
      },
      summer: {
        biking: { title: 'Mountain Biking', desc: 'Extensive trail network for all skill levels' },
        hiking: { title: 'Hiking & Trekking', desc: 'Breathtaking routes with panoramic views' },
        nature: { title: 'Nature Walks', desc: 'Explore local flora and fauna' },
        photo: { title: 'Photography Tours', desc: 'Discover hidden gems and scenic viewpoints' }
      }
    },
    prices: {
      title: 'Price List & Availability',
      ready: 'Ready to book your stay at Vila Adalbert?',
      contact: 'Contact Us',
      period: 'Period',
      minStay: 'Minimum stay',
      notes: 'Notes'
    },
    footer: {
      subtitle: 'Mountain Retreat',
      contact: 'Contact:',
      email: 'Email Us',
      call: 'Call Us',
      location: 'Location:',
      vilaName: 'Vila Adalbert',
      region: 'Mountain Region',
      country: 'Romania',
      quickLinks: 'Quick Links:',
      about: 'About Us',
      gallery: 'Gallery',
      prices: 'Prices',
      emailLabel: 'Email:',
      copyright: '© Vila Adalbert 2024.',
      privacy: 'Privacy Policy',
      credits: 'Made with care'
    },
    season: {
      winter: '❄️ Winter',
      summer: '☀️ Summer'
    }
  }
};
