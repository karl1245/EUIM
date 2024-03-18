UPDATE validation
SET name_et = 'Vali 4 vastusevariandi seast',
    name_en = 'Choose from 4 options'
WHERE
        id = 1;
UPDATE validation
SET name_et = 'Vali 4 vastusevariandi seast',
    name_en = 'Choose from 4 options'
WHERE
        id = 2;
UPDATE validation
SET name_et = 'Vali 4 vastusevariandi seast',
    name_en = 'Choose from 4 options'
WHERE
        id = 3;
UPDATE validation
SET name_et = 'Vali 4 vastusevariandi seast',
    name_en = 'Choose from 4 options'
WHERE
        id = 4;

UPDATE validation
SET name_et = 'Kas',
    name_en = 'Do'
WHERE
        id = 6;

INSERT INTO validation(name_et, name_en, weight, type) VALUES('Kasutajad','Stakeholders', 63, 'TEXT');
INSERT INTO validation(name_et, name_en, weight, type) VALUES('TO-BE eeldustingimused','Features prerequisties', 66, 'TEXT');

UPDATE validation
SET name_et = 'Analoognäited varasemast tegevusest',
    name_en = 'Comparable example'
WHERE
        id = 7;

UPDATE validation
SET name_et = 'Kui vaja',
    name_en = 'If needed'
WHERE
        id = 8;

UPDATE validation
SET name_et = 'Kui vaja',
    name_en = 'If needed'
WHERE
        id = 8;

UPDATE validation
SET name_et = 'Kombinatsioon vastustest',
    name_en = 'Combination of answers'
WHERE
        id = 9;

INSERT INTO validation(name_et, name_en, weight, type) VALUES('Kasutajad','Stakeholders', 93, 'FILL');
INSERT INTO validation(name_et, name_en, weight, type) VALUES('TO-BE eeldustingimus','Features precondition', 96, 'FILL');

UPDATE validation
SET name_et = 'Järeldus tunnuste järgi',
    name_en = 'Summary by feature'
WHERE
        id = 9;
UPDATE validation
SET name_et = 'Tee järeldused ja loo tegevuskava',
    name_en = 'Make conclusions and create an action plan'
WHERE
        id = 10;
