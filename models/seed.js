const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;

const User = require('./user');
const Patient = require('./patient');
const Question = require('./question');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


async function seedIt() {

  const isGoingAlone = new Question({
    question: 'Пациент может передвигаться самостоятельно?',
    answerTrue: [''],
    answerFalse: ['Помните о риске появления пролежней, если человек находится в одной позе (лежа или сидя) более двух часов. Более подробно с профилактикой пролежней можно ознакомиться в инструкции', 'https://pro-palliativ.ru/wp-content/uploads/2018/12/Uhod-i-profilaktika-prolezhnej.pdf'],
  });

  await isGoingAlone.save();

  const isFallingDown = new Question({
    question: 'У пациента есть риск падения при ходьбе?',
    answerTrue: ['Помните о риске падений у больного и ослабленного человека. Более подробно с профилактикой падений можно ознакомиться в инструкции', 'https://pro-palliativ.ru/wp-content/uploads/2019/03/Profilaktika-padenij-2019.pdf'],
    answerFalse: [''],
  });

  await isFallingDown.save();

  const isEating = new Question({
    question: 'Пациент может есть самостоятельно?',
    answerTrue: [''],
    answerFalse: ['Помните о правильном подходе в кормлении больного и ослабленного человека. Более подробно о кормлении тяжелобольного человека можно ознакомиться в инструкции', 'https://pro-palliativ.ru/wp-content/uploads/2018/12/Kormlenie-tyazhelobolnogo-cheloveka.pdf'],
  });

  await isEating.save();

  const isPain = new Question({
    question: 'Пациент испытывает боль?',
    answerTrue: ['Помните о важности оценки уровня боли у больного и ослабленного человека. Более подробно с оценкрй уровня боли можно ознакомиться в инструкции', 'https://pro-palliativ.ru/wp-content/uploads/2019/05/Povedencheskaya-otsenka-boli-u-pozhilyh_-shkala-Doloplus2-2.pdf'],
    answerFalse: [''],
  });

  await isPain.save();

  const isCleaning = new Question({
    question: 'Пациент может самостоятельно соблюдать интимную гигиену?',
    answerTrue: [''],
    answerFalse: ['Если Вы ухаживаете за малоподвижным и тяжелобольным человеком, не пренебрегайте его интимной гигиеной. Более подробно с профилактикой пролежней можно ознакомиться в инструкции', 'https://pro-palliativ.ru/wp-content/uploads/2018/12/Intimnaya-gigiena.pdf'],
  });

  await isCleaning.save();

  const ippolit = new Patient({
    name: 'Ippolit',
    diagnosis: 'Insult',
    reccomends: [
      {
        text: 'Помните о риске появления пролежней, если человек находится в одной позе (лежа или сидя) более двух часов. Более подробно с профилактикой пролежней можно ознакомиться в инструкции',
        link: 'https://pro-palliativ.ru/wp-content/uploads/2018/12/Uhod-i-profilaktika-prolezhnej.pdf',
      },
      {
        text: 'Помните о риске падений у больного и ослабленного человека. Более подробно с профилактикой падений можно ознакомиться в инструкции',
        link: 'https://pro-palliativ.ru/wp-content/uploads/2019/03/Profilaktika-padenij-2019.pdf',
      },
      {
        text: 'Помните о правильном подходе в кормлении больного и ослабленного человека. Более подробно о кормлении тяжелобольного человека можно ознакомиться в инструкции',
        link: 'https://pro-palliativ.ru/wp-content/uploads/2018/12/Kormlenie-tyazhelobolnogo-cheloveka.pdf',
      },
      {
        text: 'Помните о важности оценки уровня боли у больного и ослабленного человека. Более подробно с оценкрй уровня боли можно ознакомиться в инструкции',
        link: 'https://pro-palliativ.ru/wp-content/uploads/2019/05/Povedencheskaya-otsenka-boli-u-pozhilyh_-shkala-Doloplus2-2.pdf',
      },
      {
        text: 'Если Вы ухаживаете за малоподвижным и тяжелобольным человеком, не пренебрегайте его интимной гигиеной. Более подробно с профилактикой пролежней можно ознакомиться в инструкции',
        link: 'https://pro-palliativ.ru/wp-content/uploads/2018/12/Intimnaya-gigiena.pdf',
      },
    ],
  });

  await ippolit.save();

  const fedor = new User({
    name: 'Fedor',
    email: 'fedor@mail.ru',
    password: '12345',
    patients: [],
  });

  fedor.patients.push(ippolit);

  await fedor.save();

}

// seedIt().then(() => {
//   mongoose.disconnect();
// });
