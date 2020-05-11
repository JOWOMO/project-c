export default {
    process: {
      seo: {
        title: 'JOWOMO: Unsere Mission ist es gemeinsam Arbeit zu schützen – durch Personalpartnerschaften',

        description: 'Wir haben uns eine intelligente Verteilung von Arbeitskräften zum Ziel gesetzt, um auch in der Krise Entlassungen und Kurzarbeit auf ein Minimum zu begrenzen.',
      },
    },

    welcome: {
      title: 'Willkommen {name}!',
      supply: 'Dein Team ist jetzt in der Suche auffindbar. Entdecke passende Personalpartner, die Deine Mitarbeiter temporär beschäftigen könnten. Deine Angaben zum Team kannst du jederzeit anpassen.',
      demand: 'Dein Gesuch nach Mitarbeiter:innen ist jetzt in der Suche auffindbar. Entdecke passende Personalpartner, die Dir ihr Mitarbeiterteam temporär zur Verfügung stellen können. Deine Angaben zum von Dir gesuchten Team kannst du jederzeit anpassen.',
      button: 'Personalpartner anzeigen',
    },

    register: {
      user: 'Persönliche Daten',
      company: 'Dein Unternehmen',

      notfinished: {
        title: 'Du musst Deine Registrierung noch abschließen',
        subtitle: "Bitte entscheide Dich auf der Startseite für 'Ich suche Mitarbeiter' oder 'Ich biete Mitarbeiter'. Danach kannst Du mit der Suche nach passenden Personalpartnern anfangen.",
      },

      team: {
        add: 'Weiteres Team hinzufügen',
        ok: 'Abschließen',
        back: 'Zurück',

        remove: {
          title: "Möchtest Du das Team '{name}' wirklich löschen?",
          subtitle: 'Diese Aktion kann nicht rückgängig gemacht werden.',
        },

        close: {
          title: "Noch nicht fertig?",
        },

        discard: {
          title: "Möchtest Du die Änderungen wirklich verwerfen?",
          subtitle: "Du hast die Bearbeitung {term} '{names}' nicht abgeschlossen. Bitte schließe die Bearbeitungsmaske mit 'Abbrechen' oder 'OK' ab, bevor Du fortfährst.",
          term: '- | des Teams | der Teams',
        },

        zero: {
          title: "Du musst mindestens ein Team anlegen um Personalpartner zu finden.",
        },
      },

      demand: {
        label: 'Ich suche',

        person: {
          title: 'Persönliche Daten',
          subtitle: 'Bitte registriere Dich hier als Kontaktperson für Dein Unternehmen.',
        },

        company: {
          title: 'Dein Unternehmen',
          subtitle: 'Bitte gib die Adresse des Standortes an, an dem Du Mitarbeiter:innen suchst. Das ist wichtig um einen passenden Personalpartner in Deiner Region zu finden.',
        },

        team: {
          title: 'Ich suche',
          subtitle: 'Gib hier an, welche Mitarbeiter:innen Du aktuell suchst. Fasse bitte alle Mitarbeiter:innen mit der gleichen Tätigkeit in ein Team zusammen. Solltest Du Mitarbeiter:innen aus unterschiedlichen Bereichen suchen, lege bitte mehrere Teams an (z.B. Team 01 Service, Team 02 Küche).',
        }
      },

      supply: {
        label: 'Ich biete',

        person: {
          title: 'Persönliche Daten',
          subtitle: 'Bitte registriere Dich hier als Kontaktperson für Dein Unternehmen.',
        },

        company: {
          title: 'Dein Unternehmen',
          subtitle: 'Bitte gib die Adresse des Standortes an, an dem Du Mitarbeiter:innen stellen kannst. Das ist wichtig um einen passenden Personalpartner in Deiner Region zu finden.',
        },

        team: {
          title: 'Ich biete',
          subtitle: 'Gib hier an, welche Mitarbeiter:innen Du aktuell zur Verfügung stellen kannst. Fasse bitte alle Mitarbeiter:innen mit der gleichen Tätigkeit in ein Team zusammen. Solltest Du Mitarbeiter:innen aus unterschiedlichen Bereichen zur Verfügung haben, lege bitte mehrere Teams an (z.B. Team 01 Service, Team 02 Küche).',
        }
      },
    },

    connect: {
      title: '{first} {last} wurde kontaktiert',

      message: 'Wir haben {first} {last} per E-Mail benachrichtigt, dass Du Interesse daran hast, Dich zu einer möglichen Partnerschaft auszutauschen. {first} {last} kann nun Deine Kontaktdaten einsehen und auf Dich zukommen um persönlich alle weiteren Details zu besprechen.',

      button: 'Suchergebnisse anzeigen',

      errors: {
        'title': 'Das hat leider nicht geklappt.',

        recipient_supply: "Du hast {first} {last} schon einmal wegen dieses Angebots kontaktiert. Wir haben Deine Anfrage nicht noch einmal weitergleitet. Bitte hab etwas Geduld.",

        recipient_demand: "Du hast {first} {last} schon einmal wegen dieser Suche kontaktiert. Wir haben Deine Anfrage nicht noch einmal weitergleitet. Bitte hab etwas Geduld.",

        stop: 'Du hast heute schon zu viele Anfragen gestellt. Bitte versuch es Morgen noch einmal.',

        unkown: 'Es ist ein unbekannter Fehler aufgetreten ({error})'
      }
    },

    response: {
      title: '{first} {last} hat reagiert!',

      text: '{first} {last} möchte sich mit Dir vernetzen, um eine mögliche Personalpartnerschaft zu besprechen.',

      answer: 'Super! Per E-Mail antworten',
      no_match: 'Passt überhaupt nicht',

      faq: 'Details zur Abwicklung',
      mail: 'Ihre Nachricht über JOWOMO!',

      judge: "Kannst Du uns eine Einschätzung des Matches geben?",

      errors: {
        notfound: 'Der Datensatz konnte nicht gefunden werden.',
        unknown: 'Es ist ein unbekannter Fehler aufgetreten ({error})'
      },

      thanks: {
        title: 'Vielen Dank für die Rückmeldung!',
        text: 'Wir haben {first} {last} Deine Entscheidung mitgeteilt.',
      }
    },

    feedback: {
      title: 'Was können wir besser machen?',
      text: 'Erzählen uns von Deiner Idee für eine neue Funktion oder Verbesserung. Hat etwas nicht geklappt?',

      message: 'Dein Feedback {context}',

      tag: {
        title: 'Benötigen wir noch weitere Fähigkeiten?',
        text: 'Gib uns gerne Feedback, welche Fähigkeiten fehlen oder was zu viel ist. Bitte gib uns auch einen Kontext zu Deiner Branche.',

        context: 'Fähigkeiten und Rahmenbedingungen',
      },

      errorreport: {
        title: 'Vielen Dank für Deine Hilfe!',
        text: 'Gib bitte möglichst detailiert an, was nicht geklappt hat.',
      },

      success: {
        title: 'Wir haben Dein Feedback erhalten!',
        text: 'Vielen Dank für Deine Mühe, wir melden uns natürlich schnellstmöglich bei Dir zurück.',
      },

      error: {
        title: 'Das hat nicht geklappt',
      }
    },

    errorpage: {
      home: 'Zur Startseite',

      notfound: 'Das hat nicht geklappt. Leider existiert diese Seite nicht bei uns.',
      trace: "Das hat leider nicht geklappt. Wir haben den Fehler unter der Nummer '{code}' protokolliert.",
      noservice: "Das hat leider nicht geklappt, unser Dienst ist aktuell nicht erreichbar.",
    },

    ie: {
      title: 'Dein Browser wird momentan leider nicht von unserer Plattform unterstützt.',
      text: 'Über eine der folgenden Alternativen kannst Du schnell Deinen Personalpartner auf JOWOMO finden:',
      mobile: 'Oder ruf jowomo.de einfach direkt auf Deinem Smartphone auf!'
    },

    validations: {
      passwordComplexity: 'Bitte mindestens 6 Zeichen sowie Groß- und Kleinschreibung für Dein Passwort verwenden.'
    }

};
